import { NextApiHandler } from "next";

import { authenticated } from "../../../../util/auth";
import clientPromise from "../../../../util/mongodb";

const handler: NextApiHandler = async (req, res) => {
  const userId = JSON.parse(req.headers.authorization as string).id;

  const client = await clientPromise;
  const challenge = req.body;

  // challenge를 확인하고 type과 조건을 확인한다.
  // wjs
  try {
    let result;
    if (challenge.type === "recipe") {
      result = await client
        .db("webfront")
        .collection("recipe")
        .find({
          category: challenge.recipe.category,
          $and: [
            { upload_date: { $gte: new Date(challenge.startDate) } },
            { upload_date: { $lte: new Date(challenge.endDate) } },
          ],
          user_id: userId,
        })
        .sort({ upload_date: 1 })
        .toArray();
      console.log(result);
      if (result.length >= +challenge.recipe.uploadCount) {
        // 레시피 챌린지 성공
        const updateResult = await client
          .db("webfront")
          .collection("challenge")
          .findOneAndUpdate(
            {
              _id: challenge._id,
            },
            {
              $push: { winners: userId },
            },
            {
              returnDocument: "after",
            }
          );
        console.log(updateResult);
        res.status(200).json({ message: "success" });
      } else {
        res.status(200).json({ message: "챌린지 실패" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error });
  }
};

export default authenticated(handler);
