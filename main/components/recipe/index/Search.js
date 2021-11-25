import React from "react";
import { useForm } from "react-hook-form";
import Router from "next/router";

const Search = () => {
  const { register, handleSubmit } = useForm();
  const searchBtnClick = async (data) => {
    const keyword = data.keyword;
    console.log(keyword);
    if (keyword) {
      Router.push("/recipe/list/search/" + keyword);
    } else if (keyword === "") {
      alert("검색어를 입력해주세요!");
    }
  };
  return (
    <form onSubmit={handleSubmit(searchBtnClick)} className="search">
      <input
        type="text"
        placeholder="요리명을 검색해보세요!(예: 감바스)"
        {...register("keyword")}
      />
      <input type="submit" value="검색" />
    </form>
  );
};

export default Search;
