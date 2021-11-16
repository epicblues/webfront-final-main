import React, { useState } from "react";
import Link from "next/link";

// import RcpData from "../../public/static/recipe/dataSample/RecipeData";
import { getUserOrRedirect } from "../../util/auth";
import Categories from "../../components/recipe/index/Categories";
import Search from "../../components/recipe/index/Search";

const Index = () => {
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

      {/* 최신 레시피 */}
      <h3>최신 레시피</h3>
      {/* <ShowLatestCard rcpData={_rcpData} /> */}
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const user = await getUserOrRedirect(ctx);
  return { props: { user } };
};
export default Index;
