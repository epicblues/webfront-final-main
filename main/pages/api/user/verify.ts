import { NextApiHandler } from "next";
import { sendAuthEmail } from "../../../util/email";
import clientPromise from "../../../util/mongodb";

const verify: NextApiHandler = async (req, res) => {
  const email = req.body.email;
  console.log(email);
  try {
    const client = await clientPromise;
    const user = await client
      .db("webfront")
      .collection("user")
      .findOne({ email });
    if (!user) throw new Error("이메일에 사용자 없음");
    await sendAuthEmail(email, user.key);
    res.status(200).json({ status: "email success" });
  } catch (error: any) {
    res.status(404).json({ status: error.message });
  }
};

export default verify;
