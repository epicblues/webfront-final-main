import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../util/mongodb";
import { verify, sign } from "jsonwebtoken";
import { hash, compareSync, compare } from "bcrypt";
import { Document } from "bson";
import cookie from "cookie";

// json 형태로 아이디 비밀번호를 받아서 json 형태로 응답(직접적인 Redirect는 불가)
const login: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const userForm = req.body;
  const password = req.body.password;
  const secret = process.env.UUID_SECRET as string;
  try {
    const result = (await (await clientPromise)
      .db("webfront")
      .collection("user")
      .findOne({ email: userForm.email, type: "normal" })) as Document;

    if (!result) {
      throw new Error("이메일이 유효하지 않습니다.");
    } else {
      console.log(result);
      if (!result.verified) throw new Error("이메일 인증");
      const isValidPW = await compare(password, result.password);
      // 로그인 성공 후에 유저 인증 관련 jwt를 쿠키에 저장
      if (!isValidPW) throw new Error("비밀번호 불일치");
      const jwt = sign(
        {
          email: result.email,
          name: result.name,
          id: result._id,
          bmr: result.bmr?.bmr,
          activity: result.bmr?.activity,
        },
        secret,
        { expiresIn: "2h" }
      );
      // 인증 토큰을 생성하고 쿠키에 저장
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("auth", jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: true,
          maxAge: 3600,
          path: "/",
        })
      );

      res.status(200).json({ status: "OK" });
    }
  } catch (error: any) {
    res.status(200).json({ status: error.message });
  }
};

export default login;
