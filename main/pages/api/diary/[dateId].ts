import { NextApiHandler } from "next";
import { Diary } from "../../../models";
import { authenticated } from "../../../util/auth";
import clientPromise, { getNextSequence } from "../../../util/mongodb";

const handler: NextApiHandler = async (req, res) => {
  const { id: user_id } = JSON.parse(req.headers.authorization as string);
  const upload_date = req.query.dateId;

  try {
    const client = await clientPromise;
    const diary = await client
      .db("webfront")
      .collection("diary")
      .findOne({ user_id, upload_date });
    if (!diary) {
      const diaryId = await getNextSequence("diary", client);
      const pastDiary = new Diary(user_id, upload_date as string);

      await client
        .db("webfront")
        .collection("diary")
        .insertOne({ ...pastDiary, _id: diaryId });

      res.status(200).json({ newDiary: { ...pastDiary, _id: diaryId } });
    } else {
      res.status(200).json({ newDiary: diary });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export default authenticated(handler);
