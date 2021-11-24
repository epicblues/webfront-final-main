import React from "react";
import Link from "next/link";
import "semantic-ui-css/semantic.min.css";
import { getUserOrRedirect } from "../../util/auth";
import { Button } from "semantic-ui-react";
import MyChallenge from "../../components/challenge/Main/MyChallenge";
import clientPromise from "../../util/mongodb";
import ChallengeMainList from "../../components/challenge/List/ChallengeMainList";

const index = ({ challenges, user }) => {
  const participatedChallenges = challenges.filter(
    (challenge) =>
      challenge.userId !== user.id &&
      challenge.participants.some((participant) => participant === user.id)
  );
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link passHref href="challenge/write">
          <Button>챌린지 작성</Button>
        </Link>

        <Link passHref href="challenge/mainlist">
          <Button>챌린지 리스트 보기 </Button>
        </Link>
      </div>
      <br />

      <h2>만든 챌린지</h2>
      <div style={{ border: "solid 2px lightgray", borderRadius: "5px" }}>
        <MyChallenge challenges={challenges} user={user}></MyChallenge>
      </div>

      <h2>참여한 챌린지</h2>
      <div
        className="myChallenge"
        style={{ border: "solid 2px lightgray", borderRadius: "5px" }}
      >
        <ChallengeMainList
          challenges={participatedChallenges}
          user={user}
        ></ChallengeMainList>
      </div>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const user = await getUserOrRedirect(ctx);

  const client = await clientPromise;
  const challenges = await client
    .db("webfront")
    .collection("challenge")
    .aggregate([
      {
        $lookup: {
          from: "user",
          localField: "userId",
          foreignField: "_id",
          as: "author",
        },
      },
    ])
    .match({ endDate: { $gte: new Date() } })
    .toArray();

  console.log("user:", user);
  console.log(challenges);

  return {
    props: { user, challenges: JSON.parse(JSON.stringify(challenges)) },
  };
};
export default index;
