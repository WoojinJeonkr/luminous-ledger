import { Link } from 'react-router-dom';

const sections = [
  { title: '튜토리얼', type: 'tutorial', icon: '📚' },
  { title: '프로젝트', type: 'project', icon: '💻' },
  {
    title: '노트',
    type: 'note',
    icon: '📝',
    subSections: [
      { title: 'JavaScript', slug: 'js' },
      { title: 'SQL', slug: 'sql' },
      { title: 'Java', slug: 'java' },
      { title: 'Python', slug: 'python' },
      { title: 'Linux', slug: 'linux' }
    ]
  },
  { title: '오류 목록', type: 'errors', icon: '🐞' }
];

export default function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <div className="logo">
          <Link to="/" className="logo-link">
            <h1>Luminous Ledger</h1>
          </Link>
        </div>
        <div className="nav-links">
          {sections.map(({ title, type, icon, subSections }) => (
            <div key={type} className="nav-item">
              <Link to={`/${type}`} className="nav-link">
                {icon} {title}
              </Link>
              {subSections && (
                <div className="sub-menu">
                  {subSections.map(({ title, slug }) => (
                    <Link key={slug} to={`/note/${slug}`} className="sub-link">
                      {title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
} 