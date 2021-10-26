import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";
import { GetServerSidePropsContext } from "next";

// Api 요청에 대한 인증확인 미들웨어
// Api 전용. getServerSideProps와는 상관 없음
export const authenticated =
  (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.auth;
    // Token이 유효한가
    try {
      await verify(token, process.env.UUID_SECRET as string);
      // 에러가 나지 않으면 유효한 토큰!
      return await fn(req, res);
    } catch (error) {
      // token이 없거나 유효하지 않은 경우
      // 401 status : 인증되지 않은 회원
      res.status(401).json({ status: "no auth" });
    }
  };

export const checkValid = (...strArray: string[]): boolean => {
  return strArray.filter((str) => str.trim().length === 0).length === 0;
};

// ServerSideProps로 user데이터를 활용할 때
export const getUserOrRedirect = async (
  ctx: GetServerSidePropsContext
): Promise<any> => {
  const jwt = ctx.req.cookies.auth;
  try {
    const user = await verify(jwt, process.env.UUID_SECRET as string);
    // 토큰 인증이 성공할 경우 토큰의 user 데이터를 return
    return user;
  } catch (error) {
    // 토큰 인증이 실패할 경우 redirect
    ctx.res.writeHead(302, {
      Location: "/user/login",
    });
    ctx.res.end();
    return { status: "auth required" };
  }

  // 토큰이 존재하지 않을 경우 로그인 페이지로 redirect
  // if (!ctx.req.cookies.auth) {
  //   ctx.res.writeHead(302, {
  //     Location: "/user/login",
  //   });
  //   ctx.res.end();
  //   return { status: "auth required" };
  // }
  // auth 토큰이 존재할 경우
  // props의 도구로 활용할 수 있는 user 데이터를 보내준다.

  // return user;
};
