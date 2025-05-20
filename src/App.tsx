import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { ContentList } from './components/ContentList';
import { Content } from './components/Content';
import Home from './content/home';
import Footer from './components/Footer';
import Header from './components/Header';
import JSNoteLayout from './content/note/js';
import JSInstall from './content/note/js/install';
import JSExplore1 from './content/note/js/explore1';
import JSExplore2 from './content/note/js/explore2';

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
  }
];

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/note/js" element={<JSNoteLayout />}>
              <Route index element={
                <div
                  style={{
                    color: '#64748b',
                    fontSize: '1.15rem',
                    marginTop: '3rem',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    textAlign: 'center',
                    lineHeight: 1.7,
                    background: '#f9fafb',
                    borderRadius: '8px',
                    marginBottom: '2.5rem',
                    maxWidth: '100%',
                  }}
                >
                  왼쪽에서 파일을 선택하거나 검색해 주세요.
                </div>
              } />
              <Route path="install" element={<JSInstall />} />
              <Route path="explore1" element={<JSExplore1 />} />
              <Route path="explore2" element={<JSExplore2 />} />
            </Route>
            <Route path="/note/:slug" element={<Content />} />
            {sections.filter(s => s.type !== 'note').map(({ type }) => (
              <Route key={type} path={`/${type}`} element={<ContentList type={type} />} />
            ))}
            <Route path="/:type/:slug" element={<Content />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;