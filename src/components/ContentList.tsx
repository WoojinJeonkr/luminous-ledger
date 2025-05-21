import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface ContentListProps {
  type: string;
}

export function ContentList({ type }: ContentListProps) {
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    // 각 섹션별 파일 목록
    const sectionFiles = {
      js: [
        { title: 'Example', slug: 'example' },
        { title: 'Basics', slug: 'basics' }
      ],
      sql: [
        { title: 'Basics', slug: 'basics' },
        { title: 'Advanced', slug: 'advanced' }
      ]
    };

    // type이 note일 때는 프로그래밍 언어 목록을 표시
    if (type === 'note') {
      const languages = Object.keys(sectionFiles);
      setFiles(languages);
      return;
    }

    // 현재 섹션에 해당하는 파일 목록 설정
    const section = sectionFiles[type as keyof typeof sectionFiles];
    if (section) {
      setFiles(section.map(file => file.slug));
    }
  }, [type]);

  return (
    <div className="content-list">
      {type === 'note' ? (
        <div>
          <h2>Programming Languages</h2>
          <ul>
            {files.map(lang => (
              <li key={lang}>
                <Link to={`/note/${lang}`}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          <h2>{type.charAt(0).toUpperCase() + type.slice(1)} Files</h2>
          <ul>
            {files.map(file => (
              <li key={file}>
                <Link to={`/note/${type}/${file}`}>
                  {file.charAt(0).toUpperCase() + file.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
