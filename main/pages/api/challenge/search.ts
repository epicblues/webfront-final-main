import { NextApiHandler } from "next";
import { authenticated } from "../../../util/auth";
import clientPromise from "../../../util/mongodb";

const handler: NextApiHandler = async (req, res) => {
  

  try {
    const client = await clientPromise;
    const searchedChallenges = await client
      .db("webfront")
      .collection("challenge")
      .find({  endDate: {$gte:new Date()} })
      .toArray();
    res.status(200).json({ challenges: searchedChallenges });
  } catch (error: any) {
    res.status(404).json(error.message);
  }
};

export default authenticated(handler);
