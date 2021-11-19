import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../util/mongodb";

const handler: NextApiHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const recipes = await (
      await clientPromise
    )
      .db("webfront")
      .collection("recipe")
      .find({ title: new RegExp(`${name}`) })
      .limit(20)
      .project({
        upload_date: 0,
        hit: 0,
        duration: 0,
        steps: 0,
        ingredients: 0,
      })
      .toArray();

    res.status(200).json(recipes);
  } catch (error) {
    console.log(error);
    res.status(404).send("검색 실패");
  }
};

export default handler;
