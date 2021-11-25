import React from "react";
import { useForm } from "react-hook-form";
import Router from "next/router";

// ICON
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// CSS
import moduleStyles from "../../../styles/recipe/Search.module.css";

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
    <form onSubmit={handleSubmit(searchBtnClick)}>
      <span className={moduleStyles.inputWindow}>
        <input
          className={moduleStyles.input}
          type="text"
          placeholder="요리명을 검색해보세요!(예: 감바스)"
          {...register("keyword")}
        />
      </span>

      <button className={moduleStyles.button} type="submit">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
};

export default Search;
