import React, { useState } from "react";
import Link from "next/link";

// import RcpData from "../../public/static/recipe/dataSample/RecipeData";
import { getUserOrRedirect } from "../api/auth";
import Categories from "../../components/recipe/main/Categories";
import Search from "../../components/recipe/main/Search";
import ShowLatestCard from "../../components/recipe/recipeList/ShowLatestCard";
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
      <input type="button" value="레시피 등록하기" />

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
// export const getServerSideProps = async() => {
//     const res = await fetch('api 주소');
//     const rcpData = await res.json();

//     return {
//         props: {
//             _rcpData : rcpData
//         },
//         revalidate: 20
//     }
// }

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
