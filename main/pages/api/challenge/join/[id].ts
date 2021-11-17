import { NextApiHandler } from "next";
import { authenticated } from "../../../../util/auth";
import clientPromise from "../../../../util/mongodb";

const handler: NextApiHandler = async (req, res) => {
  if (req.method?.toUpperCase() !== "POST")
    return res.status(404).json({ message: "NO POST METHOD" });
  const userId = JSON.parse(req.headers.authorization as string).id;
  const challengeId = Number(req.query.id);
  try {
    const client = await clientPromise;
    const result = client
      .db("webfront")
      .collection("challenge")
      .findOneAndUpdate(
        { _id: challengeId },
        {
          $set: {
            $push: {
              participants: userId,
            },
          },
        }
      );
    console.log(result);
    res.status(200).json({ result });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export default authenticated(handler);
