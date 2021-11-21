import axios from "axios";

// 이미지 서버에 POST Ajax 요청을 하기 위한 Axios 인스턴스 생성 함수.
// 클라이언트에서 호출하므로 Next에서 설계한 클라이언트 전용 환경 변수(NEXT_PUBLIC으로 시작하는)
// 사용 가능

// formData로 전송할 때는 이미지가 포함될 떄, 아닐 때는 이미지를 삭제하는 명령일 때
export const postStaticAxios = async (
  url: string,
  token: string,
  data: FormData | object
) => {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_STATIC_SERVER_URL,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return await axiosInstance.post(url, data);
};

// input change 이벤트 같이 짧은 시간에 수 많은 이벤트 리스너를 call 하는 상황에서
// 특정 시간 동안 call 하는 것을 막고 가장 마지막의 call한 eventhandler를
// 호출하게 하는 함수

export const debounce = (callback: Function, delay: number) => {
  let timerId: number;
  return (event: Event) => {
    if (timerId) clearTimeout(timerId);
    // callback : 실질적인 비동기 작업(불필요하게 진행하는 것을 clearTimeout을 통해 막는다.)
    setTimeout(callback, delay, event);
  };
};
