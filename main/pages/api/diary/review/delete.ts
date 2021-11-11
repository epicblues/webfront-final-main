import { NextApiHandler } from "next";
import clientPromise from "../../../../util/mongodb";
import { authenticated } from "../../../../util/auth";

// basic logic
// 다이어리 데이터 일 단위로 저장.(중복 불가능 일종의 index)
// 그냥 Date 형태로 저장해야 하는가? -> Date와 일 단위 포함 저장

const handler: NextApiHandler = async (req, res) => {
  console.log(req.query);
  console.log(req.body);
  const client = await clientPromise;
  const diaryId = Number(req.query.id);
  const reviewId = req.body.id;

  const result = await client
    .db("webfront")
    .collection("diary")
    .updateOne({ _id: diaryId }, { $pull: { reviews: { id: reviewId } } });
  console.log(result);
  res
    .status(result.acknowledged ? 200 : 500)
    .json({ message: result.acknowledged });
};

export default authenticated(handler);
