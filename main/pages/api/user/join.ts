import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import clientPromise, { getNextSequence } from "../../../util/mongodb";
import { hash } from "bcrypt";
import { sendAuthEmail } from "../../../util/email";

// 이메일 중복 체크 api
const join: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const userForm = req.body;
  console.log(userForm);
  const password = await hash(userForm.password, 10);
  const key = Math.floor(Math.random() * 1000000).toString();
  await sendAuthEmail(userForm.email, key);
  try {
    const client = await clientPromise;
    const nextSequence = await getNextSequence("user", client);

    const result = await client
      .db("webfront")
      .collection("user")
      .insertOne({
        _id: nextSequence,
        ...userForm,
        password,
        verified: false,
        key,
      });
    res
      .status(200)
      .json(result.insertedId ? { status: "OK" } : { status: "Failed" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: JSON.stringify(err) });
  }
};

export default join;
