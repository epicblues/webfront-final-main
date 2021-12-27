import { React, useState } from "react";
import { getUserOrRedirect } from "../../util/auth";
import clientPromise from "../../util/mongodb";
import Link from "next/dist/client/link";
// component
import Navbar from "../../components/challenge/Main/Navbar";
import Search from "../../components/challenge/Main/Search";
//css
import "semantic-ui-css/semantic.min.css";
import ListStyle from "../../styles/challenge/List.module.css";
import ChallengeStyle from "../../styles/challenge/Challenge.module.css";
import ImageStyle from "../../styles/challenge/Input.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Image } from "semantic-ui-react";

const NewList = ({ challenges, user }) => {
  const [search, setSearch] = useState(false);

  return (
    <div style={{ padding: "1rem" }}>
      <div className={ChallengeStyle.header2}>
        <Search />
        <Navbar currentURL={"/challenge/newlist"} />
      </div>
      <div className={ChallengeStyle.newTitle}>신규 챌린지</div>
      <div className={ChallengeStyle.container}>
        {challenges.map((challenge) => {
          return (
            <div key={challenge._id}>
              <>
                <div className={ChallengeStyle.list}>
                  <Link passHref href={"/challenge/list/" + challenge._id}>
                    <div
                      className="image-wrap"
                      style={{
                        position: "relative",
                        borderRadius: "0.3rem",
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: "gray",
                          width: "50px",
                          right: "0",
                          position: "absolute",
                          textAlign: "right",
                          zIndex: "1",
                          color: "white",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faUser}
                          className={ImageStyle.image2}
                        />
                        {challenge.participants.length}명
                      </div>
                      <Image
                        style={{
                          zIndex: "0",
                          borderRadius: "5%",
                          height: "13vh",
                          width: "42vw",
                        }}
                        src={
                          process.env.NEXT_PUBLIC_STATIC_SERVER_URL +
                          challenge.image
                        }
                        layout="fill"
                      />
                    </div>
                  </Link>
                  <Link passHref href={"/challenge/list/" + challenge._id}>
                    <ul className={ListStyle.ul}>
                      <li className={ChallengeStyle.content}>
                        {challenge.title}
                      </li>

                      <li style={{ margin: "0 11px" }}>
                        시작일:
                        {new Date(challenge.startDate).getFullYear() +
                          "년" +
                          (new Date(challenge.startDate).getMonth() + 1) +
                          "월" +
                          new Date(challenge.startDate).getDate() +
                          "일"}
                        <br />
                        종료일:
                        {new Date(challenge.endDate).getFullYear() +
                          "년" +
                          (new Date(challenge.endDate).getMonth() + 1) +
                          "월" +
                          new Date(challenge.endDate).getDate() +
                          "일"}
                      </li>
                      {challenge.type === "diet" ? (
                        <li>챌린지 종류: 다이어트</li>
                      ) : (
                        <li>챌린지 종류: 레시피</li>
                      )}
                    </ul>
                  </Link>
                </div>
              </>
            </div>
          );
        })}
      </div>
    </div>
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
    .match({
      uploadDate: { $gte: new Date(new Date() - 2 * 24 * 60 * 60 * 1000) },
    })
    .sort({ _id: 1 })
    .toArray();

  console.log("user:", user);
  console.log(challenges);

  return {
    props: { user, challenges: JSON.parse(JSON.stringify(challenges)) },
  };
};

export default NewList;
