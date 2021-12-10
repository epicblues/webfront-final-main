import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getUserOrRedirect } from "../../../../util/auth";
import clientPromise from "../../../../util/mongodb";

import Navigation from "../../../../components/recipe/index/Navigation";

const Index = ({ user, filteredRecipes }) => {
  const [currentURL, setCurrentURL] = useState("/recipe/list/like");
  return (
    <div>
      <Navigation currentURL={currentURL}></Navigation>
      <div className={searchListStyles.container}>
        {filteredRecipes.map((card, index) => {
          return (
            <div key={card._id} className={searchListStyles.card}>
              {/* 카드 헤더 (이미지) */}
              <div className={searchListStyles.cardHeader}>
                <Image
                  className={searchListStyles.cardHeaderImage}
                  src={
                    process.env.NEXT_PUBLIC_STATIC_SERVER_URL +
                    card.steps.slice(-1)[0].image_url
                  }
                  layout="fill"
                  objectFit="cover"
                  objectPosition="top"
                  alt="thumbnail image"
                />
                <div className={searchListStyles.like}>
                  {card.likes.includes(user.id) === true ? (
                    <DislikeButton
                      filterData={setRecipeList}
                      index={index}
                      token={user.token}
                      recipeId={card._id}
                    />
                  ) : (
                    <LikeButton
                      recipeId={card._id}
                      token={user.token}
                      filterData={setRecipeList}
                      index={index}
                    />
                  )}
                </div>
              </div>
              {/* 카드 바디 */}
              <div className={searchListStyles.cardBodyWrapper}>
                {/* 카드 바디 헤더 */}
                <div className={searchListStyles.cardBodyHeader}>
                  <h1 className={searchListStyles.h1}>{card.title}</h1>
                  <p className={searchListStyles.cardBodyAuthor}>
                    <strong>작성자</strong> | {card.author[0].name}
                  </p>
                  <div className={searchListStyles.cardBodyCategory}>
                    <p>#{renderSwitchCategory(card.category)}</p>
                  </div>
                </div>

                {/* 카드 바디 본문 */}
                <div className={searchListStyles.cardBodyMain}>
                  <Link
                    href={{
                      pathname: `/recipe/card/${card._id}`,
                    }}
                    as={`/recipe/card/${card._id}`}
                    passHref
                  >
                    <a>
                      <p className={searchListStyles.cardBodyDesc}>
                        {card.desc}
                      </p>
                    </a>
                  </Link>
                </div>
                {/* 카드 바디 푸터 */}
                <div className={searchListStyles.cardBodyFooter}>
                  <div className={searchListStyles.hr}></div>
                  <div className={searchListStyles.textWrapper}>
                    <span>
                      <FontAwesomeIcon
                        className={searchListStyles.cardIconHit}
                        icon={faEye}
                      />
                      조회{" "}
                      <strong className={searchListStyles.hitSpan}>
                        {card.hit}
                      </strong>
                      회
                    </span>
                    <span className={searchListStyles.cardUploadDate}>
                      {card.upload_date.slice(0, -14)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  // 유저 인증 로직
  const user = await getUserOrRedirect(ctx);
  console.log(user);
  const data = await (
    await clientPromise
  )
    .db("webfront")
    .collection("recipe")
    .find({
      likes: user.id,
    })
    .aggregate([
      {
        $lookup: {
          from: "user",
          localField: "user_id",
          foreignField: "_id",
          as: "author",
        },
      },
    ])
    .match({ user_id: user.id })
    .toArray();
  const filteredRecipes = JSON.parse(JSON.stringify(data));

  return { props: { user, filteredRecipes } };
};

export default Index;
