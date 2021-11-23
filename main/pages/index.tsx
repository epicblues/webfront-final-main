import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'

import { getUserOrRedirect } from '../util/auth'
import Link from 'next/link';
import { Button, Card, CardHeader, CommentText, Container, TextArea } from 'semantic-ui-react';
import homeStyle from '../styles/Home.module.css';
import { CSSProperties } from 'react';


const Home: NextPage<any> = ({ user: { name, email, bmr, activity } }) => {

  const cardStyle: CSSProperties = {
    border: "solid 2px lightgray",
    borderRadius: "5px",

    padding: "20px"


  }


  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "stretch", margin: "1vh 1vh", justifyContent: "space-evenly", "minHeight": "50vh"
    }}>
      < div style={cardStyle} >
        <h3>{name} 님 안녕하세요</h3>
        <p>Email : {email}</p>

      </div >
      {bmr && (
        <div style={cardStyle} >
          <p>기초 대사량 : {bmr}</p>
          <p>일일 권장 칼로리 : {activity}</p>
        </div>
      )
      }
      <div style={cardStyle}>
        Challenge
      </div>
      <div style={cardStyle}>
        Diary
      </div>
      <div style={cardStyle}>
        Recipe
      </div>




      <Link passHref href="/user/update">
        <Button color="google plus">회원 정보 수정</Button>
      </Link> </div >


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
