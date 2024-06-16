import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

function Detail() {
    const { id } = useParams();
    const fetchUrl = `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState({});
    /**
     * useCallback 은 우리가 지난 시간에 배웠던 useMemo 와 비슷한 Hook 입니다.
     * useMemo 는 특정 결과값을 재사용 할 때 사용하는 반면,
     * useCallback 은 특정 함수를 새로 만들지 않고 재사용하고 싶을때 사용합니다.
     */
    const getMovie = useCallback(async () => {
        const json = await (
            await fetch(fetchUrl)
        ).json();
        setMovie(json.data.movie);
        setLoading(false);
    }, [fetchUrl]);
    useEffect(() => {
        getMovie();
        // Issue : React Hook useEffect has a missing dependency: 'getMovie'. Either include it or remove the dependency array
        // 기능적으로 block해서 일시적으로 해결하는 방법
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>Detail</h1>
            {loading ? (
                <strong>Loading...</strong>
            ) : (
                <div>
                    <h1>{movie.title}</h1>

                </div>
            )}
        </div>
    );
}

export default Detail;