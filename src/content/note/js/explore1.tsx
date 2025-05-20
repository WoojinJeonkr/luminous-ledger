import NoteArticle from '../../../components/NoteArticle';
import { HighlightedCode } from '../../../components/HighlightedCode';

export default function JSExplore1() {
  return (
    <NoteArticle
      title="JS 탐색하기 1"
      date="2024-06-02"
      summary="JavaScript의 기본 문법과 변수 선언 방법, 스코프, 호이스팅, 그리고 실제 사용 예시까지 폭넓게 알아봅니다."
      content={
        <>
          <p><b>JavaScript</b>에서 변수를 선언하는 방법은 <code>var</code>, <code>let</code>, <code>const</code>가 있습니다. 각각의 선언 방식은 스코프, 재할당 가능 여부, 호이스팅 등에서 차이가 있습니다.</p>
          <h3>1. 변수 선언 방식 비교</h3>
          <HighlightedCode
            code={`// var 선언
                    var a = 1;

                    // let 선언
                    let b = 2;

                    // const 선언
                    const c = 3;`
                  }
            language="javascript"
          />

          <p><b>var</b>는 함수 스코프, <b>let</b>과 <b>const</b>는 블록 스코프를 가집니다. <b>const</b>는 재할당이 불가능합니다.</p>
          <h3>2. 스코프와 호이스팅</h3>
          <HighlightedCode code={`function testScope() {
                                  if (true) {
                                    var x = 10;
                                    let y = 20;
                                    const z = 30;
                                  }
                                  console.log(x); // 10
                                  // console.log(y); // ReferenceError
                                  // console.log(z); // ReferenceError
                                }

testScope();`}language="javascript" />
          <p><b>var</b>로 선언된 변수는 함수 전체에서 접근 가능하지만, <b>let</b>과 <b>const</b>는 블록 내부에서만 접근할 수 있습니다.</p>
          <h3>3. 실제 사용 예시</h3>
          <HighlightedCode code={`// 배열의 합 구하기
const arr = [1, 2, 3, 4, 5];
let sum = 0;
for (let i = 0; i < arr.length; i++) {
  sum += arr[i];
}
console.log('합계:', sum);`} language="javascript" />
          <p>실무에서는 <b>let</b>과 <b>const</b>를 주로 사용하며, <b>const</b>를 기본으로, 값이 변경될 필요가 있을 때만 <b>let</b>을 사용합니다.</p>
        </>
      }
      prev={{ slug: "/note/js/install", title: "JS 설치하기" }}
      next={{ slug: "/note/js/explore2", title: "JS 탐색하기 2" }}
      autoReadTime
    />
  );
} 