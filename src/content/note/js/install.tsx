import NoteArticle from '../../../components/NoteArticle';
import { HighlightedCode } from '../../../components/HighlightedCode';

export default function JSInstall() {
  return (
    <NoteArticle
      title="JS 설치하기"
      date="2024-06-01"
      summary="JavaScript 개발 환경을 설치하는 방법을 안내합니다."
      content={
        <>
          <p>Node.js와 npm을 설치하면 JavaScript 개발을 시작할 수 있습니다.</p>
          <HighlightedCode code={`$ brew install node\n$ node -v\n$ npm -v`} language="bash" />
        </>
      }
      prev={null}
      next={{ slug: "/note/js/explore1", title: "JS 탐색하기 1" }}
      autoReadTime
    />
  );
} 