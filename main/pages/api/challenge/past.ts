import { NextApiHandler } from "next";
import { Challenge } from "../../../models/Challenge";
import { authenticated } from "../../../util/auth";
import clientPromise from "../../../util/mongodb";
import { Document } from "mongodb";
import { Diary } from "../../../models";
const handler: NextApiHandler = async (req, res) => {
  const userId = JSON.parse(req.headers.authorization as string)["id"];
  // 기간이 지난 챌린지 or 기간이 지나지 않았음에도 성공한 챌린지들을 가져오는 Api
  try {
    const client = await clientPromise;
    const challenges = await client
      .db("webfront")
      .collection("challenge")
      .find({
        $or: [{ participants: userId }, { userId }],
      })
      .filter({
        $or: [{ endDate: { $lte: new Date() } }, { winners: userId }],
        // 과거의 챌린지 또는 현재 완료된 챌린지를 가져온다.
      })
      .toArray();
    // 과거의 챌린지 중에서 winners가 없는 챌린지들을 선별해서
    // 한 번 더 체크한다?
    // 체크하고 loser라는 배열에 userId를 넣어버릴까?
    console.log(challenges);
    const modifiedChallenges = challenges.map(async (challenge, index) => {
      // 이미 승리자나 패배자면 인증할 필요가 없다.
      if (challenge.winners.includes(userId)) return challenge;
      if (challenge.endDate.getTime() >= new Date().getTime()) return challenge;
      let verifiedResult: {
        message: string;
        result: number | null | Document;
      } = {
        message: "null",
        result: null,
      };
      switch (challenge.type) {
        case "recipe":
          verifiedResult = await Challenge.validateRecipe(
            challenge,
            client,
            userId
          );
          break;
        case "diet":
          verifiedResult = await Challenge.validateDiary(
            challenge,
            client,
            userId
          );
          break;
      }
      if (verifiedResult.message === "failed") {
        // 실패했을 때는 성공한 flag만 result에 실어서 보내준다.
        // 이미 실패한 것으로 등록되어 있으면 추가적인 db 요청을 하지 않는다.
        if (!challenge.losers.includes(userId))
          challenge = (
            await client
              .db("webfront")
              .collection("challenge")
              .findOneAndUpdate(
                {
                  _id: challenge._id,
                },
                {
                  $push: { losers: userId },
                },
                {
                  returnDocument: "after",
                }
              )
          ).value as Document;
        challenge.result = verifiedResult.result;
        return challenge;
      } else if (verifiedResult.message === "success") {
        // 성공한 챌린지

        challenge = verifiedResult.result as Document;
        return challenge;
      }
    });

    const newChallenges = await Promise.all(modifiedChallenges);
    console.log(newChallenges);
    res.status(200).json({ challenges: newChallenges });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export default authenticated(handler);
