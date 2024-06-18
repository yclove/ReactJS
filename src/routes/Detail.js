import React, { useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";

const useConfirm = (message = "", callback, rejection) => {
  if (typeof callback !== "function" || typeof rejection !== "function") {
    return;
  }

  const confirmAction = () => {
    if (window.confirm(message)) {
      callback();
    } else {
      rejection();
    }
  };
  return confirmAction;
};

const useClick = (onClick) => {
  //   if (typeof onClick !== "function") {
  //     return;
  //   }
  /**
   * Issue : React Hook "useRef / useEffect" is called conditionally. React Hooks must be called in the exact same order in every component render.
   * React Hook의 2원칙
   * 1. Hook 은 최상위에서만 선언되어야 한다.
   *    - 반복문, 조건문 혹은 중첩된 함수 내에서 훅을 호출하면 안된다.
   *    - 리액트는 Hook이 호출되는 순서에 의존하기 때문에 Hook의 실행순서가 밀리게 되거나 건너뛰면 버그를 야기한다.
   *    - 만약 조건부로 Hook을 쓰고 싶다면 Hook 내부에 선언해야 한다.
   * 2. 오직 React 함수 내에서만 Hook을 호출해야 한다.
   *    - 훅을 일반적인 자바스크립트 함수에서 호출하면 안된다.
   *    - 대신 리액트 함수 컴포넌트나 커스텀 훅에서는 호출이 가능하다.
   */
  const element = useRef();

  useEffect(() => {
    // [ if ] componentDidMount 시 호출
    if (element.current) {
      element.current.addEventListener("click", onClick);
    }
    // [ return ] componentWillUnMount 시 호출
    return () => {
      if (element.current) {
        element.current.removeEventListener("click", onClick);
      }
    };
  }, []);
  return element;
};

function Detail() {
  const sayHello = () => console.log("Say Hello");
  const title = useClick(sayHello);

  const { id } = useParams();
  const fetchUrl = `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`;
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  /**
   * useCallback 은 우리가 지난 시간에 배웠던 useMemo 와 비슷한 Hook 입니다.
   * useMemo 는 특정 결과값을 재사용 할 때 사용하는 반면,
   * useCallback 은 특정 함수를 새로 만들지 않고 재사용하고 싶을때 사용합니다.
   */
  const getMovie = useCallback(async () => {
    const json = await (await fetch(fetchUrl)).json();
    setMovie(json.data.movie);
    setLoading(false);
  }, [fetchUrl]);
  useEffect(() => {
    getMovie();
    // Issue : React Hook useEffect has a missing dependency: 'getMovie'. Either include it or remove the dependency array
    // 기능적으로 block해서 일시적으로 해결하는 방법
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDelete = () => {
    console.log("Delete");
  };
  const onAbort = () => {
    console.log("Abort");
  };
  const confirmDelete = useConfirm("Are you sure?", onDelete, onAbort);

  return (
    <div>
      <h1>Detail</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <h1 ref={title}>{movie.title}</h1>
          <button onClick={confirmDelete}>Delete Movie</button>
        </div>
      )}
    </div>
  );
}

export default Detail;
