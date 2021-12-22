import axios from "axios";
import React, {
  CSSProperties,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
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
export type LoadingProps = [
  boolean,
  Dispatch<SetStateAction<boolean>>,
  React.FC<{ style?: CSSProperties; className?: string }>
];

// dependency가 변경되면 loading State를 false로 바꾸는 hook
// 상태가 비동기적으로 변경되는 state를 dependency로 넣는다.
// 대표적인 예시 : Root Component의 pageProps.(next/router가 pageProps를 변경하기 까지 시간이 걸린다.)
// 함수를 사용하는 컴포넌트에서는 특정 비동기 요청을 하기 직전에 loading을 true로 설정한다.
export const useLoading = (dependency?: any): LoadingProps => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 비동기 요청이 끝나면 dependency의 변경을 감지하고
    // useEffect가 발동해서 다시 loading을 false로 전환
    setLoading(false);
  }, [dependency]);

  // JSX의 실제 모습은 Element나  Component를 return 하는 함수
  // 즉 Element 만으로는 JSX로 표현할 수 없다.
  const LoadingCircle: React.FC<{ style?: CSSProperties; className?: string }> =
    ({ style, className }) => {
      return loading
        ? React.createElement("div", {
            className: className ? className : mainStyle.loadingCircleGlobal,
            style,
          })
        : null;
    };
  return [loading, setLoading, LoadingCircle];
};
