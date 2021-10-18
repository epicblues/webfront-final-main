import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Article.module.css";
import { useEffect, useState } from "react";
import ArticleList from '../components/ArticleList';
import { server } from '../config';

// 모듈에 있는 css를 적용하려면 class에 해당 css 클래스를 .연산자로 접근해야한다.

export default function Home({ articles }: { articles: [any] }) {
  console.log(articles);
  return (
    <div>

      <h2>Welcome To Next</h2>
      <ArticleList articles={articles} />
    </div>
  );
}

// getStaticProps는 nextjs에서 약속한 식별자.
export const getStaticProps = async () => {
  const res = await fetch(
    `${server}/api/articles`
  );
  const articles = await res.json();
  return {
    props: {
      articles,
    },
  };
};
