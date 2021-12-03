import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'

import { getUserOrRedirect } from '../util/auth'
import Link from 'next/link';
import { Button, Card, CardHeader, CommentText, Container, TextArea } from 'semantic-ui-react';
import homeStyle from '../styles/Home.module.css';
import { CSSProperties } from 'react';
import { useRouter } from 'next/router';
import clientPromise from '../util/mongodb';


const Home: NextPage<{ user: any, foodRank: { name: string, count: number }[] }> = ({ user: { name, email, bmr, activity }, foodRank }) => {

  const cardStyle: CSSProperties = {
    border: "solid 2px lightgray",
    borderRadius: "5px",

    padding: "20px",
    fontWeight: 700,
    fontSize: "1.3em",
    textAlign: "center"


  }
  const router = useRouter()
  const clickHandler = async () => {
    const res = await fetch('/api/user/logout');
    if (res.status === 200) {
      router.push('/user/login')
    }
  }


  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "stretch", margin: "1vh 1vh", justifyContent: "space-between", "minHeight": "70vh"
    }}>
      < div style={cardStyle} >
        <h3>{name} 님 안녕하세요</h3>
        <p>Email : {email}</p>

      </div >
      {bmr && (
        <div style={cardStyle} >
          <p>기초 대사량 : <span style={{ color: "red", fontWeight: "bolder" }}>{bmr}kcal</span></p>
          <p>일일 권장 칼로리 : <span style={{ color: "red", fontWeight: "bolder" }}>{activity}kcal</span></p>
        </div>
      )
      }
      <div style={{ ...cardStyle, background: "lightgreen", fontSize: "1.3em", color: "whitesmoke" }}>
        한 달 동안 많이 먹은 음식 Top 3
      </div>
      {foodRank.length !== 0 ? foodRank.map(({ name, count }) => (
        <div key={name}>
          {name} : {count}
        </div>
      )) : <div>일지를 더 작성해주세요!</div>}
      <Link href="/recipe" passHref>
        <a style={{ ...cardStyle, backgroundColor: "lightgrey", fontSize: "1.3em", color: "whitesmoke" }}>
          레시피
        </a>
      </Link>





      <Link href="/challenge" passHref>
        <a style={{ ...cardStyle, background: "lightgrey", fontSize: "1.3em", color: "whitesmoke" }}>
          Challenge
        </a>
      </Link>

      <button className="ui button facebook" onClick={clickHandler}>Logout</button>

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
  const client = await clientPromise;
  const now = new Date()
  const before = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000))

  const myDiaries = await client.db('webfront').collection("diary").aggregate(
    [{
      $match: {
        user_id: user.id,
        date: { $gte: before }

      }
    },
    {
      $project: {
        meals: 1
      }
    }
    ]
  ).toArray();

  if (myDiaries.length >= 3) {
    const bestTable: any = {}
    myDiaries.forEach(diary => {
      const meals = diary.meals;
      meals.forEach((meal: any) => {
        const foods = meal.foods;
        foods.forEach((food: { title?: string, name?: string }) => {

          // 레시피(title 속성 존재)
          if (food.title) {
            if (bestTable[food.title]) {
              bestTable[food.title] += 1
            } else {
              bestTable[food.title] = 1
            }
            // 일반 음식(name 속성 존재)
          } else if (food.name) {
            if (bestTable[food.name]) {
              bestTable[food.name] += 1
            } else {
              bestTable[food.name] = 1
            }
          }
        })
      })
    })
    const rankedFoods = Object.keys(bestTable).sort((key1, key2) => {
      return bestTable[key2] - bestTable[key1] // 내림차순 정렬
    })
    rankedFoods.splice(3);

    const finalData = rankedFoods.map(name => { return { name, count: bestTable[name] } })
    return { props: { user, foodRank: finalData } };

  }

  return { props: { user, foodRank: [] } }




}

export default Home
