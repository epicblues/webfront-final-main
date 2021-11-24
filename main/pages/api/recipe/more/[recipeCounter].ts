import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../util/mongodb";

const handler: NextApiHandler = async (req, res) => {
  const { recipeCounter } = req.query
  try {
    const data = await (
      await clientPromise
    )
      .db("webfront")
      .collection("recipe")
      .aggregate([
        {
          $lookup: {
            from: "user",
            localField: "user_id",
            foreignField: "_id",
            as: "author",
          },
        },
      ])
      .sort({ upload_date: -1 })
      .skip(Number(recipeCounter))
      .limit(4)
      .toArray();

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(404).send("검색 실패");
  }
};

export default handler;
