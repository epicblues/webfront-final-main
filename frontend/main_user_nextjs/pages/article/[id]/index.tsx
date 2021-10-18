import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useRouter } from 'next/dist/client/router';
import articleStyle from '/styles/Article.module.css';
import Link from 'next/link';


const article = (article) => {

  const router = useRouter();
  const { id } = router.query;


  return (
    <div className={articleStyle.card}>
      <h2>{article.title}</h2>
      <p>{article.body}</p>
      <Link href="/"><button>Go Back</button></Link>
    </div>);
};


// 자바스크립트를 읽는 주체 : Web Browser가 아닌 Node.js
// 이 Promise가 결과를 낼 때까지 서버에서 스크립트 파일을 렌더링하지 않는다.
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.params.id}`)
  const article = await res.json();
  const result: GetServerSidePropsResult<{}> = {
    props: article
  }

  return result
}

export default article;
