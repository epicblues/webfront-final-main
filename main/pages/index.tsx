

import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { getUserOrRedirect } from './api/auth'


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


// const getUserOrRedirect = (ctx: GetServerSidePropsContext): any => {
//   // 토큰이 존재하지 않을 경우 로그인 페이지로 redirect
//   if (!ctx.req.cookies.auth) {
//     ctx.res.writeHead(302, {
//       'Location': '/user/login'
//     })
//     ctx.res.end();
//     return { "status": "auth required" };
//   }
//   // auth 토큰이 존재할 경우
//   // 초기 props로 로그인한 user의 name과 email를 전달한다.
//   const jwt = ctx.req.cookies.auth;
//   const user = verify(jwt, process.env.UUID_SECRET as string)
//   return user;
// }

export const getServerSideProps: GetServerSideProps<any> = async (ctx) => {

  const user = getUserOrRedirect(ctx);
  console.log("user:", user);
  return { props: user };

}

export default Home
