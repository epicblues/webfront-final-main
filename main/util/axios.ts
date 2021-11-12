import axios from "axios";

// 이미지 서버에 POST Ajax 요청을 하기 위한 Axios 인스턴스 생성 함수.
// 클라이언트에서 호출하므로 노드 전용 모듈을 사용할 수 없다.(process.env 등)
// hello
export const postStaticAxios = async (
  url: string,
  token: string,
  formData: FormData
) => {
  const axiosInstance = axios.create({
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return await axiosInstance.post(url, formData);
};
