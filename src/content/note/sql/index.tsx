import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MarkdownRenderer from '@/components/MarkdownRenderer';

interface MarkdownFile {
  title: string;
  slug: string;
  path: string;
}

export default function SQLNoteLayout() {
  const { file } = useParams();
  const [content, setContent] = useState('');
  const [markdownFiles, setMarkdownFiles] = useState<MarkdownFile[]>([]);
  const search = useState('')[0];

  const getMarkdownFiles = (): MarkdownFile[] => {
    return [
      { title: 'SQL Basics', slug: 'basics', path: 'basics.md' }
    ];
  };

  useEffect(() => {
    setMarkdownFiles(getMarkdownFiles());
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

  const filtered = markdownFiles.filter(f => f.title.includes(search));

  return (
    <div className="gitbook-note-root" style={{ maxWidth: '100%', minHeight: '100vh', display: 'flex' }}>
      <div className="gitbook-note-sidebar" style={{ width: '250px', padding: '20px', borderRight: '1px solid #eee' }}>
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
        </ul>
      </div>
      <div className="gitbook-note-content" style={{ flex: 1, padding: '20px' }}>
        {content && <MarkdownRenderer content={content} />}
      </div>
    </div>
  );
}
