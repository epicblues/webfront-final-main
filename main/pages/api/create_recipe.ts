// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Document } from "bson";
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../util/mongodb";
import { authenticated } from "./auth";

async function handler(req: NextApiRequest, res: NextApiResponse<Document>) {
  const client = await clientPromise;
  const db = client.db("webfront");

  const insertResult = await db.collection("recipe").insertOne({
    post_id: 1,
    user_id: "작성자2",
    thumb_url: "img/2thumb.jpg",
    main_title: "음식2",
    sub_title: "맛있어요",
    desc: "냉채미역국을 구워봅시다.",
    likes: 50,
    total_review: 10,
    total_score: 100,
    total_evaluator: 10,
    category: "Grill",
    duration: 1,
    ingredient: "",
  });
  res.status(200).json({ status: insertResult });
}

export default authenticated(handler);
