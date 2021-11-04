import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'

import { getUserOrRedirect } from './api/auth'
import Link from 'next/link';
import { Button, Container } from 'semantic-ui-react';



const Home: NextPage<any> = ({ user: { name, email }, foods }) => {


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


// 서버(db)에서 데이터를 받아와서 해당 page에 Props로 뿌리는 Logic 
export const getServerSideProps: GetServerSideProps<any> = async (ctx) => {
  // 유저 인증 로직
  const user = await getUserOrRedirect(ctx);
  console.log("user:", user);
  return { props: { user } };

}

export default Home
