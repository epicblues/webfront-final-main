import Link from "next/link";
import categoriesStyles from "../../../styles/recipe/Categories.module.css";

function showCategories({ currentURL }) {
  return (
    <div className={categoriesStyles.container}>
      <div className={categoriesStyles.containerTitle}>분류 |</div>
      <ul className={categoriesStyles.ul}>
        <Link href="/recipe/list" prefetch={false}>
          <a>
            <li className={categoriesStyles.tab}>
              <p
                className={
                  currentURL === "/recipe/list"
                    ? categoriesStyles.activated
                    : ""
                }
              >
                전체
              </p>
            </li>
          </a>
        </Link>

        <Link href="/recipe/list/category/soup">
          <a>
            <li className={categoriesStyles.tab}>
              <p
                className={
                  currentURL === "/recipe/list/category/soup"
                    ? categoriesStyles.activated
                    : ""
                }
              >
                국/탕/찌개
              </p>
            </li>
          </a>
        </Link>

        <Link href="/recipe/list/category/grill">
          <a>
            <li className={categoriesStyles.tab}>
              <p
                className={
                  currentURL === "/recipe/list/category/grill"
                    ? categoriesStyles.activated
                    : ""
                }
              >
                구이
              </p>
            </li>
          </a>
        </Link>

        <Link href="/recipe/list/category/noodle">
          <a>
            <li className={categoriesStyles.tab}>
              <p
                className={
                  currentURL === "/recipe/list/category/noodle"
                    ? categoriesStyles.activated
                    : ""
                }
              >
                면/파스타
              </p>
            </li>
          </a>
        </Link>

        <Link href="/recipe/list/category/rice">
          <a>
            <li className={categoriesStyles.tab}>
              <p
                className={
                  currentURL === "/recipe/list/category/rice"
                    ? categoriesStyles.activated
                    : ""
                }
              >
                밥/볶음밥
              </p>
            </li>
          </a>
        </Link>

        <Link href="/recipe/list/category/side">
          <a>
            <li className={categoriesStyles.tab}>
              <p
                className={
                  currentURL === "/recipe/list/category/side"
                    ? categoriesStyles.activated
                    : ""
                }
              >
                반찬
              </p>
            </li>
          </a>
        </Link>

        <Link href="/recipe/list/category/kimchi">
          <a>
            <li className={categoriesStyles.tab}>
              <p
                className={
                  currentURL === "/recipe/list/category/kimchi"
                    ? categoriesStyles.activated
                    : ""
                }
              >
                김치
              </p>
            </li>
          </a>
        </Link>

        <Link href="/recipe/list/category/dessert">
          <a>
            <li className={categoriesStyles.tab}>
              <p
                className={
                  currentURL === "/recipe/list/category/dessert"
                    ? categoriesStyles.activated
                    : ""
                }
              >
                디저트
              </p>
            </li>
          </a>
        </Link>

        <Link href="/recipe/list/category/etc">
          <a>
            <li className={categoriesStyles.tab}>
              <p
                className={
                  currentURL === "/recipe/list/category/etc"
                    ? categoriesStyles.activated
                    : ""
                }
              >
                기타
              </p>
            </li>
          </a>
        </Link>
      </ul>
    </div>
  );
}

export default showCategories;
