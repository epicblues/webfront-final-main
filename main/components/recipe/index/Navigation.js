import React, { useState } from "react";
import Link from "next/link";

//  CSS
import navigationStyles from "../../../styles/recipe/Navigation.module.css";

// Component
import SearchModal from "./SearchModal";
import SearchModalBlackout from "./SearchModalBlackout";
import CategoryModal from "./CategoryModal";
import CategoryModalBlackout from "./CategoryModalBlackout";

const Navigation = ({ currentURL }) => {
  // 검색 Modal
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const handleSetIsSearchModalVisible = (active) => {
    setIsSearchModalVisible(active);
  };

  // 카테고리 Modal
  const [isCatModalVisible, setIsCatModalVisible] = useState(false);
  const handleSetIsCatModalVisible = (active) => {
    setIsCatModalVisible(active);
  };

  return (
    <>
      {isSearchModalVisible && (
        <>
          <SearchModal
            handleSetIsSearchModalVisible={handleSetIsSearchModalVisible}
          />
          <SearchModalBlackout
            handleSetIsSearchModalVisible={handleSetIsSearchModalVisible}
          />
        </>
      )}
      {isCatModalVisible && (
        <>
          <CategoryModal
            handleSetIsCatModalVisible={handleSetIsCatModalVisible}
            currentURL={currentURL}
          />
          <CategoryModalBlackout
            handleSetIsCatModalVisible={handleSetIsCatModalVisible}
          />
        </>
      )}
      <div className={navigationStyles.container}>
        {/* 메인 */}
        <Link href="/recipe/">
          <a>
            <div className={navigationStyles.tab}>
              <p
                className={
                  currentURL === "/recipe" ? navigationStyles.activated : ""
                }
              >
                메인
              </p>
            </div>
          </a>
        </Link>
        {/* 검색 Modal */}
        <div
          className={navigationStyles.tab}
          onClick={() => handleSetIsSearchModalVisible(true)}
        >
          <p
            className={
              currentURL === "/recipe/list/search"
                ? navigationStyles.activated
                : ""
            }
          >
            검색
          </p>
        </div>
        {/* 카테고리 Modal */}
        <div
          className={navigationStyles.tab}
          onClick={() => handleSetIsCatModalVisible(true)}
        >
          <p
            className={
              currentURL === "/recipe/list" || currentURL.includes("category")
                ? navigationStyles.activated
                : ""
            }
          >
            카테고리
          </p>
        </div>
        {/* 즐겨찾기 */}
        <Link href="/recipe/list/like">
          <a>
            <div className={navigationStyles.tab}>
              <p
                className={
                  currentURL === "/recipe/list/like"
                    ? navigationStyles.activated
                    : ""
                }
              >
                즐겨찾기
              </p>
            </div>
          </a>
        </Link>
      </div>
    </>
  );
};

export default Navigation;
