import { NextApiHandler } from "next";
import { Challenge } from "../../../models/Challenge";
import { authenticated } from "../../../util/auth";
import clientPromise from "../../../util/mongodb";

const handler: NextApiHandler = async (req, res) => {
  const { id: userId } = JSON.parse(req.headers.authorization as string);
  try {
    const client = await clientPromise;

    const results = await client
      .db("webfront")
      .collection("user")
      .aggregate([
        {
          $match: {
            _id: userId,
          },
        },
        {
          $lookup: {
            from: "challenge",
            localField: "_id",
            foreignField: "participants",
            as: "challenge",
          },
        },
        {
          $lookup: {
            from: "recipe",
            localField: "_id",
            foreignField: "user_id",
            as: "recipe",
          },
        },
        {
          $project: {
            challenge: 1,
            recipe: 1,
          },
        },
      ])
      .toArray();

    const resultObj = {
      challenges: results[0].challenge.filter(
        (chal: Challenge) =>
          (chal.endDate as Date) > new Date() &&
          !(chal.winners as number[]).includes(userId)
      ),
      recipes: results[0].recipe,
    };

    res.status(200).json(resultObj);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};
export default authenticated(handler);
