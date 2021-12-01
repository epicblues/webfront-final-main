import { NextApiHandler } from "next";
import clientPromise from "../../../util/mongodb";

const handler: NextApiHandler = async (req, res) => {
  const email = req.body.email;

  const client = await clientPromise;
  const sameEmailUser = await client
    .db("webfront")
    .collection("user")
    .findOne({ email });
  return res.status(200).json({ message: !Boolean(sameEmailUser) });
};

export default handler;
