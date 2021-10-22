import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next';

import articleStyle from '/styles/Article.module.css';
import Link from 'next/link';
import { server } from '../../../config';



const article = (article) => {



  return (
    <div className={articleStyle.card}>
      <h2>{article.title}</h2>
      <p>{article.body}</p>
      <Link passHref href="/"><button>Go Back</button></Link>
    </div>);
};

// -------------------------------------------------------


// // 자바스크립트를 읽는 주체 : Web Browser가 아닌 Node.js
// // 이 Promise가 결과를 낼 때까지 서버에서 스크립트 파일을 렌더링하지 않는다.
// export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.params.id}`)
//   const article = await res.json();
//   const result: GetServerSidePropsResult<{}> = {
//     props: article
//   }

//   return result
// }

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch(`${server}/api/articles/${context.params.id}`)
  // static paths를 통해서 얻은 params를 동적으로 ajax URL에 탑재
  const article = await res.json();
  return { props: article };
}



export const getStaticPaths: GetStaticPaths = async (context) => {
  const res = await fetch(`${server}/api/articles`)
  const articles = await res.json();

  const ids = articles.map((article) => article.id)
  const paths = ids.map(id => ({ params: { id: id.toString() } }))
  // 해당 데이터베이스에서 받은 모든 id를 path화 정적 path로 만든다?
  const result: GetStaticPathsResult = { paths, fallback: false };
  return result
}
// 정적인 path를 만들어준다.

export default article;
