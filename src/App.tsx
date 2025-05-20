import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './App.css';
import { SectionPage } from './routes/SectionPage';

const sections = [
  { title: '튜토리얼', type: 'tutorial', icon: '📚' },
  { title: '프로젝트', type: 'project', icon: '💻' },
  { title: '노트', type: 'note', icon: '📝' }
];

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <nav className="nav">
            <div className="logo">
              <h1>Luminous Ledger</h1>
            </div>
            <div className="nav-links">
              {sections.map(({ title, type, icon }) => (
                <Link key={type} to={`/${type}`} className="nav-link">
                  {icon} {title}
                </Link>
              ))}
            </div>
          </nav>
        </header>

        <div className="main-layout">
          <main className="main-content">
            <Routes>
              <Route path="/" element={
                <>
                  <section className="hero">
                    <h2>학습을 시작해보세요</h2>
                    <p>튜토리얼, 프로젝트, 노트를 통해 지식을 확장하세요</p>
                    <div className="cta-buttons">
                      <Link to="/tutorial" className="btn primary">
                        학습 시작하기
                      </Link>
                      <Link to="/project" className="btn secondary">
                        프로젝트 보기
                      </Link>
                    </div>
                  </section>

                  <section className="features">
                    <h2>제공 서비스</h2>
                    <div className="feature-grid">
                      {sections.map(({ title, type, icon }) => (
                        <div key={type} className="feature-card">
                          <div className="feature-icon">{icon}</div>
                          <h3>{title}</h3>
                          <p>{title} 모음을 확인해보세요</p>
                          <Link to={`/${type}`} className="btn secondary">
                            {title} 바로가기
                          </Link>
                        </div>
                      ))}
                    </div>
                  </section>
                </>
              } />
              <Route path="/:type" element={<SectionPage />} />
            </Routes>
          </main>
        </div>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3>소개</h3>
              <p>Luminous Ledger는 개인 지식 관리 시스템입니다</p>
            </div>
            <div className="footer-section">
              <h3>빠른 링크</h3>
              <ul>
                {sections.map(({ title, type }) => (
                  <li key={type}>
                    <Link to={`/${type}`} className="footer-link">
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-section">
              <h3>문의</h3>
              <p>지원 및 피드백은 언제든 연락해 주세요</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Luminous Ledger. 모든 권리 보유.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;