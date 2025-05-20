import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface ContentListProps {
  type: string;
}

export function ContentList({ type }: ContentListProps) {
  const [files, setFiles] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFiles = async () => {
      try {
        const response = await fetch(`/src/content/${type}`);
        if (!response.ok) {
          throw new Error(`Failed to load files: ${response.status}`);
        }

        const text = await response.text();
        const lines = text.split('\n');

        const contentFiles = lines
          .filter(line => line.trim().endsWith('.tsx'))
          .map(line => line.trim());

        setFiles(contentFiles);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load file list');
      }
    };

    loadFiles();
  }, [type]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="content-list">
      <h2>Available Files</h2>
      <ul>
        {files.map(file => (
          <li key={file}>
            <Link to={`/${type}/${file.replace('.tsx', '')}`}>
              {file.replace('.tsx', '')}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
