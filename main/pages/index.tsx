import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { getUserOrRedirect } from './api/auth'
import Link from 'next/link';
import { Button, Container } from 'semantic-ui-react';

const Home: NextPage<any> = ({ name, email }) => {
  return (

    <Container textAlign="center">
      <h1>hello {name}</h1>
      <p>This is Main Page</p>
      <p>Your Email : {email}</p>
      <Link href="/challenge" >
        <button className="ui button">Challenge</button>
      </Link>
      <Link href="/diary">
        <button className="ui button">Diary</button>
      </Link>
      <Link href="/recipe">
        <button className="ui button">Recipe</button>
      </Link>
    </Container>


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

  const user = await getUserOrRedirect(ctx);
  console.log("user:", user);
  return { props: user };

}

export default Home
