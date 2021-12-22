import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import { getUserOrRedirect } from '../util/auth'
import Link from 'next/link';
import { Button, Card, CardHeader, CommentText, Container, TextArea } from 'semantic-ui-react';
import homeStyle from '../styles/Home.module.css';
import { CSSProperties, MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import clientPromise from '../util/mongodb';
import { io, Socket } from 'socket.io-client';
import Chat from '../components/main/Chat';
import { LiveData } from '../models';
import { BACKGROUND_COLOR, FLEXBOX_NORMAL, MAIN_COLOR, MIDDLE_COLOR } from '../constants';
import Image from 'next/dist/client/image';
import AppIcon from '../public/static/logos/logo04.png'
import FoodRank from '../components/user/FoodRank';
import LikeChallenge from '../components/user/likes/LikeChallenge';
import LikeRecipe from '../components/user/likes/LikeRecipe';
import mainStyle from '../styles/main/Main.module.css';
import ShortNav from '../components/main/ShortNav';
import MyContents from '../components/main/MyContents';
import { BiDish, BiFolderMinus, BiFolderPlus, BiTrophy } from 'react-icons/bi'
import { LoadingProps } from '../hooks';
// react-icons
import { AiOutlineFire } from "react-icons/ai";
import { BiExit, BiChevronRight, BiHeart, BiStar, BiMessageSquareAdd, BiMessageSquareMinus } from "react-icons/bi";
import { IoFootstepsOutline } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";

export interface RankedFood {
  name: string; count: number; nutrition: {
    kcal: number,
    carbs: number,
    fat: number,
    prot: number
  }
}

const Home: NextPage<{ user: any, foodRank: RankedFood[], loadingProps: LoadingProps }> = ({ user: { name, email, bmr, activity }, foodRank, loadingProps: [loading, setLoading] }) => {

  const [largeMode, setLargeMode] = useState(false);
  const [showLikesChallenge, setShowLikesChallenge] = useState(false)
  const [showLikesRecipe, setShowLikesRecipe] = useState(false)

  const router = useRouter()
  const clickHandler = async () => {
    setLoading(true);
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
        setLiveData(originalData => [...originalData, message])
      }
    })
    setSocket(newSocket);
    return () => {
      // cleanup function
      newSocket.close();
    }
  }, []) // 빈 배열일 경우 componentDidMount와 같은 효과

  return (
    <div>
      <div className={mainStyle.reportWrap}>

          <div className={mainStyle.reportHeader}>  
            <div className={mainStyle.headerTop}>
              <div className={mainStyle.text}>
                {name} 님 안녕하세요!
              </div>
              <div className={mainStyle.icon}>
                <BiExit size='1.5rem' onClick={clickHandler} />
                <Link passHref href="/user/update">
                  <FiSettings size='1.4rem' onClick={() => { setLoading(true) }} />
                </Link>
              </div>
            </div>
          </div >
            {bmr && (
                <div className={mainStyle.bmrWrap}>
                  <div className={mainStyle.bmrInfo}>
                      <div>기초 대사량</div>
                      <div className={mainStyle.important}>{bmr}</div>
                  </div>
                  <div className={mainStyle.bmrInfo}>
                      <div>하루 권장량</div>
                      <div className={mainStyle.important}>{activity}</div>
                  </div>
                </div>
              )
            }

          <div className={mainStyle.contentsWrap}>
            <div className={mainStyle.contentsList}>
                <div className={mainStyle.contentsTitle}>
                  <BiDish size="1.55rem" style={{margin: '0 auto'}} />
                  <p>작성 레시피</p>
                </div>
            </div>

            <div className={mainStyle.contentsList} onClick={() => { setShowLikesRecipe(true) }}>
                <div className={mainStyle.contentsTitle}>
                  <BiHeart size="1.5rem" style={{margin: '0 auto'}} />
                  <p>찜한 레시피</p>
                </div>
            </div>

            <div className={mainStyle.contentsList}>
                <div className={mainStyle.contentsTitle}>
                  <BiTrophy size="1.5rem" style={{margin: '0 auto'}} />
                  <p>참여 챌린지</p>
                </div>
            </div>

            <div className={mainStyle.contentsList} onClick={() => { setShowLikesChallenge(true) }}>
                <div className={mainStyle.contentsTitle}>
                  <BiStar size="1.5rem" style={{margin: '0 auto'}} />
                  <p>관심 챌린지</p>
                </div>
            </div>

            {/* <MyContents /> */}
          </div>

          <FoodRank foodRank={foodRank} />


        </div>
      <div>

        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: "center"}}>
          <div onClick={() => { setLargeMode(!largeMode) }}>
          {largeMode ? <BiMessageSquareMinus size="1.6rem" /> : <BiMessageSquareAdd size="1.6rem" />}
          </div>
        </div>
        <Chat liveData={liveData} socket={socket as Socket} name={name} largeMode={largeMode} setLargeMode={setLargeMode} />
      
      
      
      </div>



      <div className={mainStyle.sideBar} style={{ left: showLikesChallenge ? "50vw" : "100vw" }}>
        <div onClick={() => { setShowLikesChallenge(false) }}>
          <button style={{ justifySelf: "", border: "0px", paddingBottom: "3px", background: "whitesmoke" }} onClick={() => { setShowLikesChallenge(false) }}><BiTrophy size="3rem" /></button>

        </div>
        <LikeChallenge />
      </div>
      <div className={mainStyle.sideBar} style={{ left: showLikesRecipe ? "50vw" : "100vw" }}>
        <div onClick={() => { setShowLikesRecipe(false) }}>
          <button style={{ justifySelf: "", border: "0px", paddingBottom: "3px", background: "whitesmoke" }} onClick={() => { setShowLikesRecipe(false) }}><BiDish size="3rem" /></button>

        </div>
        <LikeRecipe />

      </div>
      {(showLikesChallenge || showLikesRecipe) && (<div className={mainStyle.cancelArea} onClick={() => {
        if (showLikesChallenge) setShowLikesChallenge(false);
        if (showLikesRecipe) setShowLikesRecipe(false);
      }}>

      </div>)}
      <ShortNav />

    </div >
  )
}


// 서버(db)에서 데이터를 받아와서 해당 page에 Props로 뿌리는 Logic 
export const getServerSideProps: GetServerSideProps<any> = async (ctx) => {
  // 유저 인증 로직
  const user = await getUserOrRedirect(ctx);
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
        foods.forEach((food: { title?: string, name?: string, nutrition?: object }) => {
          // 레시피(title 속성 존재)
          if (food.title) {
            if (bestTable[food.title]) {
              bestTable[food.title].count += 1

            } else {
              bestTable[food.title] = {
                count: 1,
                nutrition: food.nutrition,
                type: 'recipe'
              }
            }
            // 일반 음식(name 속성 존재)
          } else if (food.name) {
            if (bestTable[food.name]) {
              bestTable[food.name].count += 1
            } else {
              bestTable[food.name] = {
                count: 1,
                nutrition: { ...food },
                type: 'food'
              }

            }
          }
        })
      })
    })
    const rankedFoods = Object.keys(bestTable).sort((key1, key2) => {
      return bestTable[key2].count - bestTable[key1].count // 내림차순 정렬
    })
    rankedFoods.splice(3);

    const finalData = rankedFoods.map(name => { return { name, count: bestTable[name].count, nutrition: bestTable[name].nutrition } })
    return { props: { user, foodRank: finalData } };

  }

  return { props: { user, foodRank: [] } }

}

export default Home
