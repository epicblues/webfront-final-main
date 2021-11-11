import React from "react";
import { useForm } from "react-hook-form";
import Router from "next/router";

const Search = () => {
  const { register, handleSubmit } = useForm();
  const searchBtnClick = async (data) => {
    const keyword = data.keyword;
    console.log(keyword);
    Router.push("/recipe/list/search/" + keyword);
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
