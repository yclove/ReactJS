/**
 * from 'react' 의 경우 Node.js 모듈을 의미.
 */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  /**
   * 개발모드에서 (개발 단계시 오류를 잘 잡기위해) 두 번씩 렌더링됩니다.
   * 개발 모드일때만 디버그를 하며 해당 태그로 감싸져 있는 부분은 자손까지 검사를 한다!
   * 안전하지 않은 생명주기를 가진 컴포넌트라든지, 권장되지 않는 부분이 있다든지 배포 후 문제가 될만한 이슈들을 미리 잡는 모드라고 보면 되겠다.
   */
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
