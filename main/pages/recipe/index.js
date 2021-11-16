import React, { useState } from "react";
import Link from "next/link";

// import RcpData from "../../public/static/recipe/dataSample/RecipeData";
import clientPromise from "../../util/mongodb";
import { getUserOrRedirect } from "../../util/auth";
import Categories from "../../components/recipe/index/Categories";
import Search from "../../components/recipe/index/Search";

<<<<<<< HEAD
const Index = () => {
=======
// CSS
import recipeListStyles from "../../styles/RecipeList.module.css";

const index = (user, filteredLatestRecipes, filteredHitRecipes) => {
  const [hitRecipes, setHitRecipes] = useState([filteredHitRecipes]);
>>>>>>> 330fd197fadd8750033bc360ac4f395e5e03350d
  const [showCategories, setShowCategories] = useState(true);

  return (
    <div>
      {/* 홈 */}
      <h1>Recipe Main</h1>

      {/* 검색창 */}
      <Search />

      {/* 카테고리 검색 */}
      {showCategories ? <Categories /> : null}
      <input
        type="button"
        value={showCategories ? "카테고리 접기" : "카테고리 펼치기 "}
        onClick={() => {
          setShowCategories(showCategories ? false : true);
        }}
      />
      <br />
      <p></p>

      {/* 레시피 등록하기 */}
      <Link passHref href="recipe/create">
        <button>레시피 등록하기</button>
      </Link>

      {/* 찜한 레시피 조회 */}
      <input type="button" value="찜한 레시피" />

      {/* 내 레시피 조회 */}
      <Link passHref href="recipe/list/my">
        <button>내 레시피</button>
      </Link>

      {/* 인기 레시피 */}
      <h3>인기 레시피</h3>
      <ul className={recipeListStyles.cards}>
        {hitRecipes.map((card, index) => {
          return (
            <li key={card._id}>
              <Link
                href={{
                  pathname: `/recipe/card/${card._id}`,
                }}
                as={`/recipe/card/${card._id}`}
                passHref
              >
                <a>
                  <Image
                    src={user.url + card.steps.slice(-1)[0].image_url}
                    width={100}
                    height={100}
                    alt="thumbnail image"
                  />
                  <p>{card.title}</p>
                  <p>카테고리: {renderSwitchCategory(card.category)}</p>
                  <p>작성자: {card.author[0].name}</p>
                  <p>조회수: {card.hit}</p>
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
      {/* 최신 레시피 */}
      <h3>최신 레시피</h3>
      {/* <ShowLatestCard rcpData={_rcpData} /> */}
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  // 유저 인증 로직
  const user = await getUserOrRedirect(ctx);
  const data1 = await (
    await clientPromise
  )
    .db("webfront")
    .collection("recipe")
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
    .sort({ upload_date: -1 })
    .limit(3)
    .toArray();
  const filteredLatestRecipes = JSON.parse(JSON.stringify(data1));

  const data2 = await (
    await clientPromise
  )
    .db("webfront")
    .collection("recipe")
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
    .sort({ hit: -1 })
    .limit(3)
    .toArray();
  const filteredHitRecipes = JSON.parse(JSON.stringify(data2));

  return { props: { user, latestRecipes, hitRecipes } };
};
export default Index;
