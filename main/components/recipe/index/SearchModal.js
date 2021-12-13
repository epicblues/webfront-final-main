import React from "react";
import { useForm } from "react-hook-form";
import Router from "next/router";

// ICON
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// CSS
import SearchModalStyles from "../../../styles/recipe/SearchModal.module.css";

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
    <div className={SearchModalStyles.container}>
      <form onSubmit={handleSubmit(searchBtnClick)}>
        <span className={SearchModalStyles.inputWindow}>
          <input
            className={SearchModalStyles.input}
            type="text"
            placeholder="요리명을 검색해보세요!(예: 감바스)"
            {...register("keyword")}
          />
        </span>

        <button className={SearchModalStyles.button} type="submit">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
      <div className={SearchModalStyles.footer}>
        <div onClick={() => handleSetIsSearchModalVisible(false)}>X</div>
      </div>
    </div>
  );
};

export default SearchModal;
