import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import mainStyle from "../styles/main/Main.module.css";

export const useFetch = <T>(
  url: string
): [T | undefined, Dispatch<SetStateAction<T | undefined>>] => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [data, setData] = useState<T>();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    (async () => {
      const { data: result } = await axios.get(url);
      setData(result);
    })();
  }, [url]);

  return [data, setData];
};

// dependency가 변경되면 loading State를 false로 바꾸는 hook
// 보통 pageProps를 변경하는 컴포넌트(보통 next/link next/router)에
// 이벤트 핸들러로 setLoading(true)를 설정하면
// next의 serverSideProps가 실행되고 props를 변경하기 전 까지
// loading 상태가 true를 유지한다.
export const useLoading = (
  dependency: any
): [boolean, Dispatch<SetStateAction<boolean>>, React.FC<{ top?: string }>] => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(false);
    return () => {};
  }, [dependency]);

  // JSX의 실제 모습은 Element나  Component를 return 하는 함수
  // 즉 Element 만으로는 JSX로 표현할 수 없다.
  const LoadingCircle: React.FC<{ top?: string }> = ({ top }) => {
    return loading
      ? React.createElement("div", {
          className: mainStyle.loadingCircleGlobal,
          style: {
            position: "fixed",
            top: "45vh",
            left: "47vw",
          },
        })
      : null;
  };
  return [loading, setLoading, LoadingCircle];
};
