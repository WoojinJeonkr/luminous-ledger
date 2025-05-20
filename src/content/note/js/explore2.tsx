import NoteArticle from '../../../components/NoteArticle';
import { HighlightedCode } from '../../../components/HighlightedCode';

export default function JSExplore2() {
  return (
    <NoteArticle
      title="JS 탐색하기 2"
      date="2024-06-03"
      summary="JavaScript의 함수 선언과 호출 방법을 알아봅니다."
      content={
        <>
          <p>JavaScript에서 함수를 선언하는 방법은 여러 가지가 있습니다.</p>
          <HighlightedCode code={`function add(a, b) {\n  return a + b;\n}\n\nconst multiply = (a, b) => a * b;`} language="javascript" />
          <p>함수 선언식과 화살표 함수의 차이점을 이해해보세요.</p>
        </>
      }
      prev={{ slug: "/note/js/explore1", title: "JS 탐색하기 1" }}
      next={null}
      autoReadTime
    />
  );
} 