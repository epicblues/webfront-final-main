import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";

export const authenticated =
  (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.auth;
    // Token이 유효한가
    try {
      const auth = await verify(token, process.env.UUID_SECRET as string);
      return await fn(req, res);
    } catch (error) {
      // token이 없거나 유효하지 않은 경우
      res.writeHead(302, {
        Location: "/user/login",
      });
      res.end();
    }
  };

export const checkValid = (...strArray: string[]): boolean => {
  return strArray.filter((str) => str.trim().length === 0).length === 0;
};
