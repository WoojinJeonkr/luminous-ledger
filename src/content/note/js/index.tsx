import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MarkdownRenderer from '../../../components/MarkdownRenderer';

// Helper function to safely get file content
const getFileContent = (content: any): string => {
  if (typeof content === 'string') {
    return content;
  }
  if (typeof content === 'object' && content !== null && 'default' in content) {
    return content.default || '';
  }
  return '';
};

// Helper function to parse metadata
const parseMetadata = (content: string): { [key: string]: string } => {
  // 더 유연한 메타데이터 매칭을 위한 정규식
  const metaMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
  if (!metaMatch) return {};

  const metaStr = metaMatch[1];
  return metaStr.split('\n').reduce((acc: { [key: string]: string }, line: string) => {
    // 콜론으로 키와 값을 분리
    const match = line.match(/^([^:]+):\s*(.+)$/);
    if (match) {
      const [, key, value] = match;
      // 따옴표 제거 및 공백 제거
      acc[key.trim()] = value.trim().replace(/^["']|["']$/g, '');
    }
    return acc;
  }, {});
};

interface MarkdownFile {
  title: string;
  slug: string;
  path: string;
  content: string;
  meta?: {
    제목: string;
    작성일: string;
    글자수: number;
  };
}

// Helper function to parse metadata and create file object
const createFileObject = (content: string, path: string, slug: string, title: string): MarkdownFile => {
  const meta = parseMetadata(content);
  return {
    title,
    slug,
    path,
    content,
    meta: {
      제목: meta.제목 || title,
      작성일: meta.작성일,
      글자수: meta.글자수 ? parseInt(meta.글자수) : 0
    }
  };
};

// Get all markdown files in the current directory
const getMarkdownFiles = (): MarkdownFile[] => {
  const files = import.meta.glob('../../note/js/*.md', { eager: true });

  return Object.entries(files).map(([path, content]) => {
    const filename = path.split('/').pop() || '';
    const slug = filename.replace('.md', '');
    const title = filename.replace('.md', '').replace(/-/g, ' ').replace(/\w+/g, (word) =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );

    const fileContent = getFileContent(content);
    return createFileObject(fileContent, path, slug, title);
  });
};

export default function JSNoteLayout() {
  const { file } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [content, setContent] = useState('');
  const [markdownFiles, setMarkdownFiles] = useState<MarkdownFile[]>([]);
  const [currentFile, setCurrentFile] = useState<MarkdownFile | null>(null);
  const [currentDate, setCurrentDate] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadFiles = async () => {
      const files = await getMarkdownFiles();
      setMarkdownFiles(files);
      if (files.length > 0 && !file) {
        navigate(`/note/js/${files[0].slug}`, { replace: true });
      }
    };
    loadFiles();
  }, [file, navigate]);

  // URL 변경 시 자동으로 내용을 로드
  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);  // 로딩 시작
      const params = new URLSearchParams(window.location.search);
      const slug = params.get('file');

      if (slug) {
        try {
          const response = await fetch(`/content/note/js/${slug}.md`);
          const content = await response.text();
          setContent(content);
          const meta = parseMetadata(content);
          setCurrentDate(meta.작성일);
        } catch (error) {
          console.error(`Error reading file ${slug}:`, error);
          setContent('');
          setCurrentDate('');
        }
      } else {
        setContent('');
        setCurrentDate('');
      }
      setIsLoading(false);  // 로딩 종료
    };

    loadContent();
  }, []);

  // Handle navigation
  useEffect(() => {
    if (file) {
      window.scrollTo(0, 0);
    }
  }, [file]);

  useEffect(() => {
    if (file && markdownFiles.length > 0) {
      const found = markdownFiles.find(f => f.slug === file);
      setCurrentFile(found || null);
    }
  }, [file, markdownFiles]);

  const filtered = markdownFiles.filter(f => {
    const searchLower = search.toLowerCase();
    // 코드블록을 포함한 전체 내용에서 검색
    const fullContent = f.content;
    return (
      f.title.toLowerCase().includes(searchLower) ||
      fullContent.toLowerCase().includes(searchLower) ||
      f.meta?.제목.toLowerCase().includes(searchLower)
    );
  });

  // 검색 결과 하이라이팅을 위한 함수
  const highlightSearchResult = (text: string, searchTerm: string) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.split(regex).map((part, i) => 
      regex.test(part) ? <mark key={i} style={{ backgroundColor: '#ffd700', padding: '0 2px' }}>{part}</mark> : part
    );
  };

  // 읽는 시간 자동 계산 함수
  const getReadingTime = () => {
    if (currentFile?.meta?.글자수 && currentFile.meta.글자수 > 0) {
      return Math.ceil(currentFile.meta.글자수 / 200);
    }
    if (content) {
      const text = content.replace(/```[\s\S]*?```/g, '').replace(/\s/g, '');
      return Math.max(1, Math.ceil(text.length / 200));
    }
    return 1;
  };

  return (
    <div className="gitbook-note-root" style={{ maxWidth: '100%', minHeight: '100vh', display: 'flex' }}>
      <aside style={{
        width: '250px',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        padding: '1rem'
      }}>
        <div style={{ marginBottom: '1rem', position: 'sticky', top: '1rem' }}>
          <input
            type="text"
            placeholder="파일명/내용/코드 검색"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="note-search"
            style={{ width: '100%' }}
          />
          <div style={{ 
            fontSize: '0.8rem', 
            color: '#64748b', 
            marginTop: '0.5rem',
            textAlign: 'right' 
          }}>
            {search && `${filtered.length}개 파일 검색됨`}
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <ul className="note-file-list">
            {filtered.map(f => (
              <li key={f.slug}>
                <Link
                  to={`/note/js/${f.slug}`}
                  style={{
                    fontWeight: file === f.slug ? 'bold' : undefined,
                    color: file === f.slug ? '#2563eb' : undefined,
                    display: 'block',
                    padding: '0.1rem 1rem',
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    border: 'none'
                  }}
                  onClick={() => {
                    fetch(`/src/content/note/js/${f.slug}.md`)
                      .then(response => response.text())
                      .then(content => {
                        setContent(content);
                        const updatedFile = createFileObject(content, f.path, f.slug, f.title);
                        setCurrentFile(updatedFile);
                      })
                      .catch(error => {
                        console.error(`Error reading file ${f.slug}:`, error);
                        setContent('');
                        setCurrentFile(null);
                      });
                  }}
                >
                  {search ? highlightSearchResult(f.title, search) : f.title}
                </Link>
                {search && f.content.toLowerCase().includes(search.toLowerCase()) && (
                  <div style={{ 
                    fontSize: '0.8rem', 
                    color: '#64748b', 
                    padding: '0.5rem 1rem',
                    backgroundColor: '#f8fafc',
                    marginTop: '0.25rem',
                    borderRadius: '4px'
                  }}>
                    {highlightSearchResult(
                      f.content
                        .split('\n')
                        .find(line => line.toLowerCase().includes(search.toLowerCase())) || '',
                      search
                    )}
                  </div>
                )}
              </li>
            ))}
            {filtered.length === 0 && (
              <li style={{ padding: '0.5rem 0' }}>검색 결과가 없습니다.</li>
            )}
          </ul>
        </div>
      </aside>
      <main style={{ flex: 1, padding: '1rem' }}>
        {isLoading ? (
          <div style={{ color: '#666', textAlign: 'center' }}>Loading...</div>
        ) : content ? (
          <>
            <div style={{ marginBottom: '2rem' }}>
              <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{currentFile?.meta?.제목}</h1>
              <div style={{
                color: '#64748b',
                fontSize: '0.9rem',
                marginBottom: '1.5rem',
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
                {currentDate && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8m.5-13H11v6l5.25 3.15l.75-1.23l-4.5-2.67z"/>
                    </svg>
                    {currentDate}
                  </span>
                )}
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m0 4a1 1 0 0 0-1 1v5a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V7a1 1 0 0 0-1-1"/>
                  </svg>
                  읽는 시간: {getReadingTime()}분
                </span>
              </div>
            </div>
            <MarkdownRenderer content={content} />
          </>
        ) : (
          <div style={{ color: '#666' }}>Select a note to view</div>
        )}
      </main>
    </div>
  );
}