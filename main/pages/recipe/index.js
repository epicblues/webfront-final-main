import React, { useState } from "react";
import Link from "next/link";

// import RcpData from "../../public/static/recipe/dataSample/RecipeData";
import { getUserOrRedirect } from "../api/auth";
import Categories from "../../components/recipe/main/Categories";
import Search from "../../components/recipe/main/Search";
import clientPromise from "../../util/mongodb";

const index = ({ rcpData }) => {
  const [_rcpData, setRcpData] = useState(rcpData);
  const [showCategories, setShowCategories] = useState(false);

  return (
    <div>
      {/* 로그인 버튼 */}
      <Link href="/user/login">
        <button>Login</button>
      </Link>

      {/* 홈 */}
      <Link href="/recipe">
        <h1>Recipe Main</h1>
      </Link>

      {/* 레시피 등록하기 */}
      <Link href="recipe/create">
        <button>레시피 등록하기</button>
      </Link>

      {/* 카테고리 검색 */}
      <input
        type="button"
        value="카테고리 펼치기"
        onClick={() => {
          setShowCategories(showCategories ? false : true);
        }}
      />
      {showCategories ? <Categories></Categories> : null}

      {/* 찜한 레시피 조회 */}
      <input type="button" value="찜한 레시피" />

      {/* 내 레시피 조회 */}
      <input type="button" value="내 레시피" />

      {/* 검색창 */}
      <Search></Search>

      {/* 인기 레시피 */}
      <h3>인기 레시피</h3>

      {/* 최신 레시피 */}
      <h3>최신 레시피</h3>
      {/* <ShowLatestCard rcpData={_rcpData} /> */}
    </div>
  );
};

// 식품 데이터 API 완성되면 붙일 것
// export const getServerSideProps = async (ctx) => {
//   await getUserOrRedirect(ctx);
//   const client = await clientPromise;
//   const rcpData = await client
//     .db("webfront")
//     .collection("recipe")
//     .find({})
//     .project({ _id: 0 })
//     .toArray();
//   console.log(rcpData);
//   return { props: { rcpData } };
// };


export const getServerSideProps = async (ctx) => {
    await getUserOrRedirect(ctx);
    const client = await clientPromise;
    const rcpData = await client
      .db("webfront")
      .collection("recipe")
      .find({})
      .project({ _id: 0 })
      .toArray();
    console.log(rcpData);
    return { props: { rcpData } };
  };
export default index;
