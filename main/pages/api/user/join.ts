import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import clientPromise, { getNextSequence } from "../../../util/mongodb";
import { hash } from "bcrypt";
import { sendAuthEmail } from "../../../util/email";
import cookie from "cookie";
import { sign } from "jsonwebtoken";
import { InsertOneResult } from "mongodb";

// 이메일 중복 체크 api
const join: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const userForm = req.body;
  console.log(userForm);
  const client = await clientPromise;
  let nextSequence;
  let result: InsertOneResult<Document>;
  if (userForm.type === "normal") {
    const password = await hash(userForm.password, 10);
    const key = Math.floor(Math.random() * 1000000).toString();
    await sendAuthEmail(userForm.email, key);

    nextSequence = await getNextSequence("user", client);

    result = await client
      .db("webfront")
      .collection("user")
      .insertOne({
        _id: nextSequence,
        ...userForm,
        password,
        verified: false,
        key,
      });
  } else {
    nextSequence = await getNextSequence("user", client);
    result = await client
      .db("webfront")
      .collection("user")
      .insertOne({
        _id: nextSequence,
        ...userForm,
        verified: true,
      });
  }

  const jwt = sign(
    {
      email: userForm.email,
      name: userForm.name,
      id: nextSequence,
      bmr: userForm.bmr?.bmr,
      activity: userForm.bmr?.activity,
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
  res
    .status(200)
    .json(result.insertedId ? { status: "OK" } : { status: "Failed" });
};

export default join;
