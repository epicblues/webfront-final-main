import { NextApiHandler } from "next";
import clientPromise from "../../../../util/mongodb";
import { authenticated } from "../../../../util/auth";

// basic logic
// 다이어리 데이터 일 단위로 저장.(중복 불가능 일종의 index)
// 그냥 Date 형태로 저장해야 하는가? -> Date와 일 단위 포함 저장

const handler: NextApiHandler = async (req, res) => {
  const client = await clientPromise;
  const _id = Number(req.query.id);
  const newReview = req.body;

  const result = await client
    .db("webfront")
    .collection("diary")
    .findOneAndUpdate({ _id }, { $push: { reviews: newReview } });
  console.log(result);
  res.status(result.ok ? 200 : 500).json({ message: result.ok });
};

export default authenticated(handler);
