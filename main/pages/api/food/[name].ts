import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../util/mongodb";

const handler: NextApiHandler = async (req, res) => {
  const { name } = req.query;
  const foods = await (
    await clientPromise
  )
    .db("webfront")
    .collection("food")
    .find({ name: new RegExp(`${name}`) })
    .limit(20)
    .toArray();
  res.status(200).json(foods);
};

export default handler;
