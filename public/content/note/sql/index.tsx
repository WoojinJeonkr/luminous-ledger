import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MarkdownRenderer from '@/components/MarkdownRenderer';

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

export default function SQLNoteLayout() {
  const { file } = useParams();
  const [content, setContent] = useState('');
  const [markdownFiles, setMarkdownFiles] = useState<MarkdownFile[]>([]);
  const [search, setSearch] = useState('');

  const getMarkdownFiles = async (): Promise<MarkdownFile[]> => {
    const files = import.meta.glob('../../note/sql/*.md', { eager: true });
    return Object.entries(files).map(([path, content]) => {
      const filename = path.split('/').pop() || '';
      const slug = filename.replace('.md', '');
      const title = filename.replace('.md', '').replace(/-/g, ' ').replace(/\w+/g, (word) =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      );
      const fileContent = typeof content === 'string' ? content : '';
      return {
        title,
        slug,
        path,
        content: fileContent,
        meta: {
          제목: title,
          작성일: '',
          글자수: fileContent.length
        }
      };
    });
  };

  useEffect(() => {
    const loadFiles = async () => {
      const files = await getMarkdownFiles();
      setMarkdownFiles(files);
    };
    loadFiles();
  }, []);

  useEffect(() => {
    if (file) {
      fetch(`/src/content/note/sql/${file}.md`)
        .then(response => response.text())
        .then(content => {
          setContent(content);
        })
        .catch(error => {
          console.error(`Error reading file ${file}:`, error);
          setContent('');
        });
    } else {
      setContent('');
    }
  }, [file]);

  // Handle navigation
  useEffect(() => {
    if (file) {
      // Scroll to top when file changes
      window.scrollTo(0, 0);
    }
  }, [file]);

  const filtered = markdownFiles.filter(f => {
    const searchLower = search.toLowerCase();
    return (
      f.title.toLowerCase().includes(searchLower) ||
      f.content.toLowerCase().includes(searchLower) ||
      f.meta?.제목.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="gitbook-note-root" style={{ maxWidth: '100%', minHeight: '100vh', display: 'flex' }}>
      <div className="gitbook-note-sidebar" style={{ width: '250px', padding: '20px', borderRight: '1px solid #eee' }}>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="파일명/내용 검색"
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
        <h2>SQL Files</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {filtered.map((file) => (
            <li key={file.slug} style={{ marginBottom: '10px' }}>
              <Link 
                to={`/note/sql/${file.slug}`}
                style={{ 
                  textDecoration: 'none', 
                  color: '#333', 
                  display: 'block', 
                  padding: '8px 0',
                  borderBottom: '1px solid #eee'
                }}
              >
                {file.title}
              </Link>
            </li>
          ))}
          {filtered.length === 0 && (
            <li style={{ padding: '0.5rem 0', color: '#64748b' }}>검색 결과가 없습니다.</li>
          )}
        </ul>
      </div>
      <div className="gitbook-note-content" style={{ flex: 1, padding: '20px' }}>
        {content && <MarkdownRenderer content={content} />}
      </div>
    </div>
  );
}
