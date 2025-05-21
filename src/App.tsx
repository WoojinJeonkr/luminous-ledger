import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { ContentList } from './components/ContentList';
import { Content } from './components/Content';
import Home from './content/home';
import Footer from './components/Footer';
import Header from './components/Header';
import JSNoteLayout from './content/note/js';
import SQLNoteLayout from '@/content/note/sql/index';

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
            <Route path="/note" element={<ContentList type="note" />} />
            <Route path="/note/js" element={<JSNoteLayout />} />
            <Route path="/note/js/:file" element={<JSNoteLayout />} />
            <Route path="/note/sql" element={<SQLNoteLayout />} />
            <Route path="/note/sql/:file" element={<SQLNoteLayout />} />
            {sections.filter(s => s.type !== 'note').map(({ type }) => (
              <Route key={type} path={`/${type}`} element={<ContentList type={type} />} />
            ))}
            <Route path="/:type/:slug" element={<Content />} />
            <Route path="/errors" element={<div>404: Not Found</div>} />
            <Route path="*" element={<div>404: Not Found</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;