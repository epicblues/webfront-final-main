import React, { useState } from "react";
import Link from "next/link";

//  CSS
import navigationStyles from "../../../styles/recipe/Navigation.module.css";

// Component
import SearchModal from "../../../components/recipe/index/SearchModal";
import SearchModalBlackout from "../../../components/recipe/index/SearchModalBlackout";

const Navigation = ({ currentURL }) => {
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const handleSetIsSearchModalVisible = (active) => {
    setIsSearchModalVisible(active);
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
      <div className={navigationStyles.container}>
        <div className={navigationStyles.tab}>
          <p className={navigationStyles.url}>레시피 |</p>
        </div>
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
        {/* 종류 */}
        <Link href="/recipe/list/">
          <a>
            <div className={navigationStyles.tab}>
              <p
                className={
                  currentURL === "/recipe/list"
                    ? navigationStyles.activated
                    : ""
                }
              >
                카테고리
              </p>
            </div>
          </a>
        </Link>
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
