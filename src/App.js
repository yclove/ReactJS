/**
 * 브라우저는 HTML, CSS, JavaScript만 읽을 수 있기 때문에 우리가 작성한 React를 읽지 못한다.
 * 따라서 React로 작성한 코드를 브라우저가 읽을 수 있도록 변환해주어야한다.
 * 리액트에서 JSX 문법을 사용하는데, 이 JSX 문법을 자바스크립트로 변환시킬 때 JSX transformer를 사용해 JSX로 작성된 React 메소드를 변환시킨다.
 * 이때 객체인 React를 가져오기 위해서 import React from ‘react’를 맨 위에 작성해 React를 불러오게 되면 객체 React를 통해 React 메소드를 작성할 수 있게 된다.
 *
 * React 버전 17부터 생략 가능!
 * 2020년 10월 20일에 릴리즈된 React v17를 보면,
 * React 내부적으로 JSX transformer가 JSX를 React 요소로 변환하는 작업을 거치기 때문에 모든 컴포넌트에 import React from ‘react’를 작성하지 않아도 된다!
 */
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/hello" element={<h1>Hello</h1>} />
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Detail />} />
      </Routes>
    </Router>
  );
}

export default App;
