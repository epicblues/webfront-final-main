import axios from "axios";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

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
): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(false);
    return () => {};
  }, [dependency]);

  return [loading, setLoading];
};
