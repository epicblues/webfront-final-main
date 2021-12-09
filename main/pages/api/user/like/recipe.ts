import { NextApiHandler } from "next";
import { authenticated } from "../../../../util/auth";
import clientPromise from "../../../../util/mongodb";

// 내가 좋아하는 레시피를 가져온다.
const handler: NextApiHandler = async (req, res) => {
  const user = JSON.parse(req.headers.authorization as string);
  const userId = user.id;
  try {
    const client = await clientPromise;
    const likedRecipes = await client
      .db("webfront")
      .collection("recipe")
      .find({
        likes: userId,
      })
      .toArray();
    res.status(200).json(likedRecipes);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error });
  }
};

export default authenticated(handler);
