import Link from "next/link";

import {
  GiCookingPot,
  GiMeat,
  GiNoodles,
  GiBowlOfRice,
  GiOrangeSlice,
  GiSlicedMushroom,
  GiChiliPepper,
} from "react-icons/gi";
import {
  BiGridAlt,
  BiArrowToBottom,
  BiDotsHorizontalRounded,
} from "react-icons/bi";
import categoryModalStyles from "../../../styles/recipe/CategoryModal.module.css";

function CategoryModal({ currentURL, handleSetIsCatModalVisible }) {
  return (
    <div className={categoryModalStyles.container}>
      <div className={categoryModalStyles.h1}>
        <BiArrowToBottom size="1.8rem" />
        카테고리 선택
      </div>
      <div className={categoryModalStyles.wrapper}>
        <Link href="/recipe/list">
          <a>
            <div
              className={
                currentURL === "/recipe/list"
                  ? categoryModalStyles.activated
                  : categoryModalStyles.deactivated
              }
              onClick={() => handleSetIsCatModalVisible(false)}
            >
              <span>
                <BiGridAlt gradientUnits="" size="2rem" />
              </span>
              <br />
              전체
            </div>
          </a>
        </Link>

        <Link href="/recipe/list/category/soup">
          <a>
            <div
              className={
                currentURL === "/recipe/list/category/soup"
                  ? categoryModalStyles.activated
                  : categoryModalStyles.deactivated
              }
              onClick={() => handleSetIsCatModalVisible(false)}
            >
              <span>
                <GiCookingPot gradientUnits="" size="2rem" />
              </span>
              <br />
              국/탕/찌개
            </div>
          </a>
        </Link>

        <Link href="/recipe/list/category/grill">
          <a>
            <div
              className={
                currentURL === "/recipe/list/category/grill"
                  ? categoryModalStyles.activated
                  : categoryModalStyles.deactivated
              }
              onClick={() => handleSetIsCatModalVisible(false)}
            >
              <span>
                <GiMeat gradientUnits="" size="2rem" />
              </span>
              <br />
              구이
            </div>
          </a>
        </Link>
        <Link href="/recipe/list/category/noodle">
          <a>
            <div
              className={
                currentURL === "/recipe/list/category/noodle"
                  ? categoryModalStyles.activated
                  : categoryModalStyles.deactivated
              }
              onClick={() => handleSetIsCatModalVisible(false)}
            >
              <span>
                <GiNoodles gradientUnits="" size="2rem" />
              </span>
              <br />
              면/파스타
            </div>
          </a>
        </Link>

        <Link href="/recipe/list/category/rice">
          <a>
            <div
              className={
                currentURL === "/recipe/list/category/rice"
                  ? categoryModalStyles.activated
                  : categoryModalStyles.deactivated
              }
              onClick={() => handleSetIsCatModalVisible(false)}
            >
              <span>
                <GiBowlOfRice gradientUnits="" size="2rem" />
              </span>
              <br />
              밥/볶음밥
            </div>
          </a>
        </Link>

        <Link href="/recipe/list/category/side">
          <a>
            <div
              className={
                currentURL === "/recipe/list/category/side"
                  ? categoryModalStyles.activated
                  : categoryModalStyles.deactivated
              }
              onClick={() => handleSetIsCatModalVisible(false)}
            >
              <span>
                <GiSlicedMushroom gradientUnits="" size="2rem" />
              </span>
              <br />
              반찬
            </div>
          </a>
        </Link>

        <Link href="/recipe/list/category/kimchi">
          <a>
            <div
              className={
                currentURL === "/recipe/list/category/kimchi"
                  ? categoryModalStyles.activated
                  : categoryModalStyles.deactivated
              }
              onClick={() => handleSetIsCatModalVisible(false)}
            >
              <span>
                <GiChiliPepper gradientUnits="" size="2rem" />
              </span>
              <br />
              김치
            </div>
          </a>
        </Link>
        <Link href="/recipe/list/category/dessert">
          <a>
            <div
              className={
                currentURL === "/recipe/list/category/dessert"
                  ? categoryModalStyles.activated
                  : categoryModalStyles.deactivated
              }
              onClick={() => handleSetIsCatModalVisible(false)}
            >
              <span>
                <GiOrangeSlice gradientUnits="" size="2rem" />
              </span>
              <br />
              디저트
            </div>
          </a>
        </Link>
        <Link href="/recipe/list/category/etc">
          <a>
            <div
              className={
                currentURL === "/recipe/list/category/etc"
                  ? categoryModalStyles.activated
                  : categoryModalStyles.deactivated
              }
              onClick={() => handleSetIsCatModalVisible(false)}
            >
              <span>
                <BiDotsHorizontalRounded gradientUnits="" size="2rem" />
              </span>
              <br />
              기타
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
}

export default CategoryModal;
