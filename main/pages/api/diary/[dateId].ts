import { NextApiHandler } from "next";
import { authenticated } from "../../../util/auth";
import clientPromise from "../../../util/mongodb";

const handler: NextApiHandler = async (req, res) => {
  const { id: user_id } = JSON.parse(req.headers.authorization as string);
  const upload_date = req.query.dateId;

  try {
    const client = await clientPromise;
    const diary = await client
      .db("webfront")
      .collection("diary")
      .findOne({ user_id, upload_date });
    if (!diary) throw new Error("찾는 다이어리 없음");
    res.status(200).json({ newDiary: diary });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export default authenticated(handler);
