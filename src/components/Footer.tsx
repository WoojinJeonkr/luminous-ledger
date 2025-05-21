import { Link } from 'react-router-dom';

const sections = [
  { title: '튜토리얼', type: 'tutorial' },
  { title: '프로젝트', type: 'project' },
  { title: '노트', type: 'note' },
  { title: '오류 목록', type: 'errors' }
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>소개</h3>
          <p>Luminous Ledger는 개발자의 지식과 경험을 체계적으로 관리하는 공간입니다</p>
        </div>
        <div className="footer-section">
          <h3>메뉴</h3>
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
        <p>&copy; 2025 Luminous Ledger, @Woojinjeonkr</p>
      </div>
    </footer>
  );
} 