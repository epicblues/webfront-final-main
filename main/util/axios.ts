import axios from "axios";

// 이미지 서버에 POST Ajax 요청을 하기 위한 Axios 인스턴스 생성 함수.
// 일반적으로
export const postStaticAxios = async (
  url: string,
  token: string,
  formData: FormData
) => {
  const axiosInstance = axios.create({
    baseURL: process.env.STATIC_SERVER_URL || "http://localhost:5000",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return await axiosInstance.post(url, formData);
};
