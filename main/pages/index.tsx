

import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import { getCookieParser } from 'next/dist/server/api-utils'
import { decode, verify } from 'jsonwebtoken'
import styles from '../styles/Home.module.css'


const Home: NextPage<any> = ({ name, email }) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>hello {name}</h1>
        <p>This is Main Page</p>
        <p>Your email : {email}</p>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<any> = async (ctx) => {
  // 토큰이 존재하지 않을 경우 로그인 페이지로 redirect
  if (!ctx.req.cookies.auth) {
    ctx.res.writeHead(302, {
      'Location': '/user/login'
    })
    ctx.res.end();

    return { props: { "status": "auth required" } };
  }
  // auth 토큰이 존재할 경우
  const jwt = ctx.req.cookies.auth;
  const auth = verify(jwt, process.env.UUID_SECRET as string)
  console.log("auth:", auth);
  return { props: auth };

}






export default Home
