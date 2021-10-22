import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Article.module.css";
import { FunctionComponent, useEffect, useState } from "react";
import ArticleList from '../components/ArticleList';
import { server } from '../config';
import { authenticated } from './api/practice';
import cookie from 'cookie';
import { GetStaticProps, GetStaticPropsContext, NextComponentType, NextPageContext } from 'next';
import Router from 'next/router';
import getUser from './api/getUser';








// 모듈에 있는 css를 적용하려면 class에 해당 css 클래스를 .연산자로 접근해야한다.

const Home = ({ articles, user }) => {

  return (
    <div>
      <h2>Welcome {user.welcome}</h2>
      <ArticleList articles={articles} />
    </div>
  );
}



Home.getInitialProps = async (ctx: NextPageContext) => {
  const res = await fetch(
    `${server}/api/articles`
  );
  const articles = await res.json();
  const user = await getUser(server, ctx);

  return {
    articles,
    user
  };
};
export default Home;



