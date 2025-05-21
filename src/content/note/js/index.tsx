import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Content } from '../../../components/Content';
import { MarkdownRenderer } from '../../../components/MarkdownRenderer';

interface MarkdownFile {
  title: string;
  slug: string;
  path: string;
}

// Get all markdown files in the current directory
const getMarkdownFiles = (): MarkdownFile[] => {
  // 브라우저에서는 파일 시스템에 직접 접근할 수 없으므로,
  // 파일 목록을 하드코딩으로 정의합니다
  return [
    { title: 'Example', slug: 'example', path: 'example.md' }
  ];
};



export default function JSNoteLayout() {
  const { file } = useParams();
  const [search, setSearch] = useState('');
  const [content, setContent] = useState('');
  const [markdownFiles, setMarkdownFiles] = useState<MarkdownFile[]>([]);

  useEffect(() => {
    setMarkdownFiles(getMarkdownFiles());
  }, []);

  useEffect(() => {
    if (file) {
      // 브라우저에서는 fetch를 사용하여 파일을 읽는다
      fetch(`/src/content/note/js/${file}.md`)
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

  const filtered = markdownFiles.filter(f => f.title.includes(search));

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
                    padding: '0.5rem 0',
                    textDecoration: 'none'
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
        {content ? (
          <>
            <Content type="note" />
            <MarkdownRenderer content={content} />
          </>
        ) : (
          <div style={{ color: '#666' }}>Select a note to view</div>
        )}
      </main>
    </div>
  );
}