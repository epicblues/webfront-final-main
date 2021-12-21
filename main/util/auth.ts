import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { decode, JwtPayload, verify } from "jsonwebtoken";
import { GetServerSidePropsContext } from "next";
import axios from "axios";
// Api 요청에 대한 인증확인 미들웨어
// Api 전용. getServerSideProps와는 상관 없음
export const authenticated =
  (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.auth;
    // Token이 유효한가
    try {
      const decoded = verify(token, process.env.UUID_SECRET as string);
      // 에러가 나지 않으면 유효한 토큰!
      // 서버에서 index로 활용할 유저 이메일을 리퀘스트에 심는다.
      console.log("API 미들웨어 인증 성공");
      req.headers.authorization = JSON.stringify(decoded);

      return await fn(req, res);
    } catch (error) {
      // token이 없거나 유효하지 않은 경우
      // 401 status : 인증되지 않은 회원
      res.status(401).json({ status: "no auth" });
    }
  };

export const checkValid = (...strArray: string[]): boolean => {
  return strArray.every((str) => str.trim().length !== 0);
};

// ServerSideProps로 user데이터를 활용할 때
export const getUserOrRedirect = async (
  ctx: GetServerSidePropsContext
): Promise<any> => {
  const jwt = ctx.req.cookies.auth;
  try {
    const user = verify(jwt, process.env.UUID_SECRET as string) as JwtPayload;
    // 토큰 인증이 성공할 경우 토큰의 user 데이터를 return
    user.token = jwt;
    return user;
  } catch (error) {
    // 토큰 인증이 실패할 경우 redirect
    ctx.res.writeHead(302, {
      Location: "/user/login",
    });
    ctx.res.end();
    return { status: "auth required" };
  }
};

export const getGoogleUserInfo = async (code: string) => {
  const oauthBuffer = createOAuthBuffer(
    process.env.GOOGLE_OAUTH_CLIENT_ID as string,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET as string,
    code,
    "google"
  );

  try {
    const { data } = await axios.post(
      "https://oauth2.googleapis.com/token",
      oauthBuffer,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log(data);
    const token = data.id_token;
    const userToken = decode(token) as { email: string };
    console.log(userToken);
    return userToken;
  } catch (error) {
    throw error;
  }
};

export const getKakaoUserInfo = async (code: string) => {
  const oauthBuffer = createOAuthBuffer(
    process.env.KAKAO_OAUTH_CLIENT_ID as string,
    process.env.KAKAO_OAUTH_CLIENT_SECRET as string,
    code,
    "kakao"
  );

  try {
    const { data } = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      oauthBuffer,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log(data);
    const token = data.access_token;
    const { data: userData } = await axios.post(
      "https://kapi.kakao.com/v2/user/me",
      {},
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(userData);
    // 만약 이메일에 동의하지 않았을 경우
    if (!userData["email"]) {
      userData.email = `${userData.id}@kakaotemp.com`;
      // 임시 이메일 등록
    }

    // const userToken = decode(token) as { email: string };
    // console.log(userToken);
    return userData;
  } catch (error) {
    throw error;
  }
};

const createOAuthBuffer = (
  clientId: string,
  clientSecret: string,
  code: string,
  type: string
) => {
  const data: any = {
    client_id: clientId,
    client_secret: clientSecret,
    code,
    grant_type: "authorization_code",
    redirect_uri: `${process.env.NEXT_HOSTNAME}/api/user/oauth/${type}`, // 반드시 처음에 요청한 url과 같아야 한다.
  };

  const dataBuffer: string[] = [];
  Object.keys(data).forEach((key) => {
    dataBuffer.push(encodeURI(key) + "=" + encodeURI(data[key]) + "&");
  });

  const bufferedString = dataBuffer.join("");
  const splittedBuffer = bufferedString.substring(0, bufferedString.length - 1); // 끝의 & 문자 제거
  return splittedBuffer;
};
