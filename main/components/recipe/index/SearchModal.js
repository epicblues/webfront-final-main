import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Router from "next/router";

// CSS
import "semantic-ui-css/semantic.min.css";
import searchModalStyles from "../../../styles/recipe/SearchModal.module.css";

const SearchModal = ({ handleSetIsSearchModalVisible }) => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(false);

  const searchBtnClick = async (data) => {
    const keyword = data.keyword;
    if (keyword) {
      setError(false);
      handleSetIsSearchModalVisible(false);
      Router.push("/recipe/list/search/" + keyword);
    } else if (keyword === "") {
      setError(true);
    }
  };
  return (
    <div className={searchModalStyles.container}>
      <form onSubmit={handleSubmit(searchBtnClick)}>
        <div className={searchModalStyles.inputWrapper}>
          <input
            className={searchModalStyles.input}
            type="text"
            placeholder="요리명을 검색해보세요!"
            autoComplete="off"
            autoFocus
            {...register("keyword")}
          />
          <button className={searchModalStyles.button} type="submit">
            <i className="search icon" style={{ fontSize: "1.6rem" }}></i>
          </button>
        </div>
      </form>
      <div className={searchModalStyles.footer}>
        {error && (
          <div className={searchModalStyles.errorMsg}>
            검색어를 입력해주세요!
          </div>
        )}
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
