import axios from "axios";
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
