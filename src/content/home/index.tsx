import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home">
      <h1 className="home-title">Luminous Ledger</h1>
      <p className="home-subtitle">개발자의 지식과 경험을 기록하는 공간</p>
      <div className="home-features">
        <Link to="/tutorial" className="feature" style={{ textDecoration: 'none', cursor: 'pointer' }}>
          <h3>📚 튜토리얼</h3>
          <p>단계별 튜토리얼과 실습 프로젝트로 효과적인 학습</p>
        </Link>
        <Link to="/project" className="feature" style={{ textDecoration: 'none', cursor: 'pointer' }}>
          <h3>💻 프로젝트</h3>
          <p>다양한 프로젝트를 통해 실무에서 필요한 기술 습득</p>
        </Link>
        <Link to="/note/js" className="feature" style={{ textDecoration: 'none', cursor: 'pointer' }}>
          <h3>📝 노트</h3>
          <p>개발 관련 노트와 문서를 체계적으로 정리</p>
        </Link>
        <Link to="/errors" className="feature" style={{ textDecoration: 'none', cursor: 'pointer' }}>
          <h3>🐞 오류 목록</h3>
          <p>개발 중 자주 만나는 에러와<br />해결 방법을 한눈에 정리</p>
        </Link>
      </div>
    </div>
  );
}
