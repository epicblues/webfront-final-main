import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'

import { getUserOrRedirect } from '../util/auth'
import Link from 'next/link';
import { Button, Card, CardHeader, CommentText, Container, TextArea } from 'semantic-ui-react';
import homeStyle from '../styles/Home.module.css';
import { CSSProperties, MutableRefObject, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import clientPromise from '../util/mongodb';
import { io, Socket } from 'socket.io-client';
import Chat from '../components/main/Chat';
import { LiveData } from '../models';
import { BACKGROUND_COLOR, FLEXBOX_NORMAL, MAIN_COLOR, MIDDLE_COLOR } from '../constants';
import Image from 'next/dist/client/image';
import AppIcon from '../public/static/logos/logo04.png'




const Home: NextPage<{ user: any, foodRank: { name: string, count: number }[] }> = ({ user: { name, email, bmr, activity }, foodRank }) => {

  const cardStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    // border: "solid 1px",
    borderColor: MAIN_COLOR,
    borderRadius: "10px",
    background: "whitesmoke",
    padding: "20px",
    fontWeight: 700,
    // fontSize: "1.1em",
    // textAlign: "center"


  }
  const router = useRouter()
  const clickHandler = async () => {
    const res = await fetch('/api/user/logout');
    if (res.status === 200) {
      router.push('/user/login')
    }
  }

  const [socket, setSocket] = useState<null | Socket>(null);
  const [liveData, setLiveData] = useState<LiveData[]>([]);

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_STATIC_SERVER_URL as string, {
      path: "/chat"
    })
    newSocket.on('message', (message: LiveData | LiveData[]) => {
      if (Array.isArray(message)) {
        setLiveData(message)
      } else {
        setLiveData(originalData => {
          return [...originalData, message]
        })
      }

    })
    setSocket(newSocket);
    return () => {
      // cleanup function
      newSocket.close();
      console.log("socket closed");
    }
  }, [])

  return (
    <div style={{

      display: "flex", flexDirection: "column", alignItems: "stretch", margin: "1vh", justifyContent: "space-between", "minHeight": "85vh",
    }}>
      <div style={FLEXBOX_NORMAL}>
        < div style={{ ...cardStyle, alignItems: "center", justifyContent: "center" }} >
          <Image src={AppIcon} width="60em" height="60em" alt="요건 다 내꺼 마크"></Image>
          <span>{name} 님 </span>
          <span>안녕하세요!</span>
        </div >
        {bmr && (
          <div style={cardStyle} >
            <div style={FLEXBOX_NORMAL}>기초 대사량  <span style={{ color: "red", fontWeight: "bolder" }}>{bmr}kcal</span></div>
            <div>일일 권장 칼로리  <span style={{ color: "red", fontWeight: "bolder" }}>{activity}kcal</span></div>
          </div>
        )
        }
      </div>

      <div style={{ ...cardStyle, fontSize: "1.3em", }}>
        한 달 동안 많이 먹은 음식 Top 3
      </div>
      <div style={{ ...FLEXBOX_NORMAL, padding: "6px", borderRadius: "20px", justifyContent: "space-around", fontWeight: 700, fontSize: "1.1em" }}>
        {foodRank.length !== 0 ? foodRank.map(({ name, count }) => (
          <div style={{ textAlign: "center" }} key={name}>
            <p>{name.split(',')[0]}</p>  <p>{count}</p>
          </div>
        )) : <div>일지를 더 작성해주세요!</div>}
      </div>



      <div style={{ ...cardStyle, fontSize: "1.3em", }}>
        채팅 / 실시간 현황
      </div>
      <Chat liveData={liveData} socket={socket as Socket} name={name} />

      <div style={{ ...FLEXBOX_NORMAL, justifyContent: "space-around" }}>

        <button className="ui button facebook" onClick={clickHandler}>Logout</button>

        <Link passHref href="/user/update">
          <Button color="google plus">회원 정보 수정</Button>
        </Link>
      </div>
    </div >
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
