import { Outlet, Link, useParams } from 'react-router-dom';
import { useState } from 'react';

const files = [
  { title: 'JS 설치하기', slug: 'install' },
  { title: 'JS 탐색하기 1', slug: 'explore1' },
  { title: 'JS 탐색하기 2', slug: 'explore2' },
];

export default function JSNoteLayout() {
  const { file } = useParams();
  const [search, setSearch] = useState('');
  const filtered = files.filter(f => f.title.includes(search));

  return (
    <div className="gitbook-note-root" style={{ maxWidth: '100%' }}>
      <aside>
        <input
          type="text"
          placeholder="파일명/주제 검색"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="note-search"
        />
        <ul className="note-file-list">
          {filtered.map(f => (
            <li key={f.slug}>
              <Link
                to={`/note/js/${f.slug}`}
                style={{
                  fontWeight: file === f.slug ? 'bold' : undefined,
                  color: file === f.slug ? '#2563eb' : undefined,
                }}
              >
                {f.title}
              </Link>
            </li>
          ))}
          {filtered.length === 0 && <li>검색 결과가 없습니다.</li>}
        </ul>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
} 