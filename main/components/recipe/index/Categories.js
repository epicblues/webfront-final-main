import Link from "next/link";
import categoriesStyles from "../../../styles/Categories.module.css";

function showCategories() {
  return (
    <div className={categoriesStyles.button}>
      <ul>
        <li>
          <Link href="/recipe/list">
            <a>전체</a>
          </Link>
        </li>
        <li>
          <Link href="/recipe/list/category/soup">
            <a>국/탕/찌개</a>
          </Link>
        </li>
        <li>
          <Link href="/recipe/list/category/grill">
            <a>구이</a>
          </Link>
        </li>
        <li>
          <Link href="/recipe/list/category/noodle">
            <a>면/파스타</a>
          </Link>
        </li>
        <li>
          <Link href="/recipe/list/category/rice">
            <a>밥/볶음밥</a>
          </Link>
        </li>
        <li>
          <Link href="/recipe/list/category/side">
            <a>반찬</a>
          </Link>
        </li>
        <li>
          <Link href="/recipe/list/category/kimchi">
            <a>김치</a>
          </Link>
        </li>
        <li>
          <Link href="/recipe/list/category/dessert">
            <a>디저트</a>
          </Link>
        </li>
        <li>
          <Link href="/recipe/list/category/etc">
            <a>기타</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default showCategories;
