import { NextApiHandler } from "next";
import axios from "axios";
import https from "https";
import { decode, sign, verify } from "jsonwebtoken";
import clientPromise from "../../../../util/mongodb";
import cookie from "cookie";
import { getGoogleUserInfo, getKakaoUserInfo } from "../../../../util/auth";

const handler: NextApiHandler = async (req, res) => {
  // console.log(req);
  console.log(req.body);
  console.log(req.query);
  const type = req.query.type;

  let userToken;
  try {
    switch (type) {
      case "google":
        userToken = await getGoogleUserInfo(req.query.code as string);
        break;
      case "kakao":
        userToken = await getKakaoUserInfo(req.query.code as string);
        break;
      default:
        return res.send("No Type");
    }

    // 토큰 확보 scope에 의해 필요한 정보들이 이미 들어있다(profile, email)

    const client = await clientPromise;
    // 1. 실제 회원인지 확인한다. - 이메일과 가입 유형으로 데이터베이스 검색
    const user = await client
      .db("webfront")
      .collection("user")
      .findOne({ email: userToken.email, type });
    if (user === null) {
      // 2. 회원이 아닐 경우 Oauth 용 회원 가입 페이지로 이동시킨다.
      res.redirect(`/user/oauth/join?email=${userToken.email}&type=${type}`);
    } else {
      // 3. 기존에 가입한 회원일 경우가져온 user data를 바탕으로 jwt token을 만든 뒤에 쿠키에 싣는다
      const jwt = sign(
        {
          email: user.email,
          name: user.name,
          id: user._id,
          bmr: user.bmr?.bmr,
          activity: user.bmr?.activity,
        },
        process.env.UUID_SECRET as string,
        { expiresIn: "1h" }
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
      // 4. 원활한 쿠키 저장을 위해 중간 페이지로 redirect
      res.status(302).redirect("/user/oauth/temp");
    }
  } catch (error) {
    res.json(error);
  }

  //   POST /token HTTP/1.1
  // Host: oauth2.googleapis.com
  // Content-Type: application/x-www-form-urlencoded

  // code=4/P7q7W91a-oMsCeLvIaQm6bTrgtp7&
  // client_id=your_client_id&
  // client_secret=your_client_secret&
  // redirect_uri=https%3A//oauth2.example.com/code&
  // grant_type=authorization_code
};

export default handler;
