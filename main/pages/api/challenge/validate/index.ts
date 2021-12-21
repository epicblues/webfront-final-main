import { NextApiHandler } from "next";
import { Challenge } from "../../../../models/Challenge";

import { authenticated } from "../../../../util/auth";

import clientPromise from "../../../../util/mongodb";

const handler: NextApiHandler = async (req, res) => {
  const userId = JSON.parse(req.headers.authorization as string).id;

  const client = await clientPromise;
  const challenge = req.body;

  // challenge를 확인하고 type과 조건을 확인한다.
  // wjs
  try {
    let result: object | null = null;
    if (challenge.type === "recipe") {
      result = await Challenge.validateRecipe(challenge, client, userId);
    } else if (challenge.type === "diet") {
      result = await Challenge.validateDiary(challenge, client, userId);
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export default authenticated(handler);
