import { NextApiHandler } from "next";
import clientPromise from "../../../util/mongodb";

const handler: NextApiHandler = async (req, res) => {
  const name = req.body.name;

  const client = await clientPromise;
  const sameNameUser = await client
    .db("webfront")
    .collection("user")
    .findOne({ name });
  return res.status(200).json({ message: !Boolean(sameNameUser) });
};

export default handler;
