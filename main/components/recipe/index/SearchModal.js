import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Router from "next/router";
import axios from "axios";
import { debounce } from "../../../util/axios";

// CSS
import "semantic-ui-css/semantic.min.css";
import searchModalStyles from "../../../styles/recipe/SearchModal.module.css";

const SearchModal = ({ handleSetIsSearchModalVisible }) => {
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
    <div className={searchModalStyles.container}>
      <div className={searchModalStyles.inputWrapper}>
        <form
          onSubmit={handleSubmit(searchBtnClick)}
          className="ui fluid icon input"
        >
          <input
            className={searchModalStyles.input}
            type="text"
            placeholder="요리명을 검색해보세요!"
            autoComplete="off"
            autoFocus
            {...register("keyword")}
          ></input>
          <button className={searchModalStyles.button} type="submit">
            <i className="search icon" style={{ fontSize: "1.6rem" }}></i>
          </button>
        </form>
      </div>
      <div className={searchModalStyles.footer}>
        <div
          className={searchModalStyles.xBtn}
          onClick={() => handleSetIsSearchModalVisible(false)}
        >
          닫기
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
