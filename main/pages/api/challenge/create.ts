// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { authenticated } from "../../../util/auth";
import clientPromise, { getNextSequence } from "../../../util/mongodb";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const challengeForm = req.body;
  try {
    const client = await clientPromise;
    const challengeId = await getNextSequence("challenge", client);

    await client
      .db("webfront")
      .collection("challenge")
      .insertOne({
        ...challengeForm,
        _id: challengeId,
        uploadDate: new Date(),
        startDate: new Date(challengeForm.startDate),
        endDate: new Date(challengeForm.endDate),
        success: false,
        participants: [challengeForm.userId],
      });
    res.status(200).json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
}

export default authenticated(handler);
