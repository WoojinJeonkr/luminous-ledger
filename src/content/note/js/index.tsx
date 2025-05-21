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
  const metaMatch = content.match(/---\n(.*?)\n---\n/g);
  if (!metaMatch) return {};

  const metaStr = metaMatch[0].split('\n').slice(1, -2).join('\n');
  return metaStr.split('\n').reduce((acc: { [key: string]: string }, line: string) => {
    const [key, value] = line.split(':').map(s => s.trim());
    if (key && value) {
      acc[key] = value;
    }
    return acc;
  }, {});
};

interface MarkdownFile {
  title: string;
  slug: string;
  path: string;
  meta?: {
    제목: string;
    작성일: string;
    글자수: number;
    코드수: number;
  };
}

interface MarkdownFile {
  title: string;
  slug: string;
  path: string;
  meta?: {
    제목: string;
    작성일: string;
    글자수: number;
    코드수: number;
  };
}

// Get all markdown files in the current directory
const getMarkdownFiles = (): MarkdownFile[] => {
  // Vite의 glob 패턴을 사용하여 파일 목록을 가져옵니다
  const files = import.meta.glob('../../note/js/*.md', { eager: true });

  return Object.entries(files).map(([path, content]) => {
    // 경로에서 제목과 slug를 추출
    const filename = path.split('/').pop() || '';
    const slug = filename.replace('.md', '');
    const title = filename.replace('.md', '').replace(/-/g, ' ').replace(/\w+/g, (word) =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );

    // 파일 내용을 문자열로 변환
    const fileContent = getFileContent(content);

    // 메타데이터 파싱
    const meta = parseMetadata(fileContent);

    return {
      title,
      slug,
      path,
      meta: {
        제목: meta.제목 || title,
        작성일: meta.작성일 || new Date().toISOString().split('T')[0],
        글자수: meta.글자수 ? parseInt(meta.글자수) : 0,
        코드수: meta.코드수 ? parseInt(meta.코드수) : 0
      }
    };
  });
};

export default function JSNoteLayout() {
  const { file } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [content, setContent] = useState('');
  const [markdownFiles, setMarkdownFiles] = useState<MarkdownFile[]>([]);
  const [currentFile, setCurrentFile] = useState<MarkdownFile | null>(null);

  useEffect(() => {
    const loadFiles = async () => {
      const files = await getMarkdownFiles();
      setMarkdownFiles(files);
      // 파일 목록이 있고, 현재 file 파라미터가 없으면 첫 번째 파일로 이동
      if (files.length > 0 && !file) {
        navigate(`/note/js/${files[0].slug}`, { replace: true });
      }
    };
    loadFiles();
  }, [file, navigate]);

  const [isLoading, setIsLoading] = useState(false);

  // URL 변경 시 자동으로 내용을 로드
  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      const params = new URLSearchParams(window.location.search);
      const slug = params.get('file');

      if (slug) {
        try {
          const response = await fetch(`/content/note/js/${slug}.md`);
          const content = await response.text();
          setContent(content);
        } catch (error) {
          console.error(`Error reading file ${slug}:`, error);
          setContent('');
        }
      } else {
        setContent('');
      }
      setIsLoading(false);
    };

    loadContent();
  }, []);

  // Handle navigation
  useEffect(() => {
    if (file) {
      // Scroll to top when file changes
      window.scrollTo(0, 0);
    }
  }, [file]);

  useEffect(() => {
    if (file && markdownFiles.length > 0) {
      const found = markdownFiles.find(f => f.slug === file);
      setCurrentFile(found || null);
    }
  }, [file, markdownFiles]);

  const filtered = markdownFiles.filter(f => f.title.includes(search));

  // 읽는 시간, 코드 수 자동 계산 함수
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

  const getCodeCount = () => {
    if (currentFile?.meta?.코드수 && currentFile.meta.코드수 > 0) {
      return currentFile.meta.코드수;
    }
    if (content) {
      return (content.match(/```/g) || []).length / 2;
    }
    return 0;
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
            placeholder="파일명/주제 검색"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="note-search"
            style={{ width: '100%' }}
          />
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
                      })
                      .catch(error => {
                        console.error(`Error reading file ${f.slug}:`, error);
                        setContent('');
                      });
                  }}
                >
                  {f.title}
                </Link>
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
                fontSize: '1rem',
                marginBottom: '1.5rem',
                display: 'flex',
                gap: '2rem',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
                <span>작성일: {currentFile?.meta?.작성일}</span>
                <span>읽는 시간: {getReadingTime()}분</span>
                <span>코드 수: {getCodeCount()}개</span>
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