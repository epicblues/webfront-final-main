import axios from 'axios';
import React, { useEffect, useState,useCallback } from 'react'
import Link from 'next/dist/client/link';
import { Image } from 'semantic-ui-react';
import { Challenge } from '../../../models/Challenge';
//css
import PastStyles from "../../../styles/challenge/Past.module.css"
import ChallengeStyle from "../../../styles/challenge/Challenge.module.css"
import { FaUser } from "react-icons/fa";
interface Props {
  userId?: number
}

const PastChallenge = (challenge: Challenge ) => (
  <div style={{display:"flex", justifyContent:"center", padding:"1rem", textAlign:"center"}} key={challenge._id}>
    <Link passHref href={"/challenge/list/" + challenge._id}>
    <>    
    <div className={PastStyles.imageDiv} >
    <Image
     className={PastStyles.image}
    src={process.env.NEXT_PUBLIC_STATIC_SERVER_URL as string + challenge.image}
    />
    <div style={{ backgroundColor: "gray",
     width:"50px",
      left:"54%", 
      bottom: "75%",
      position: "absolute",                  
      textAlign: "right",
       zIndex : 1,
    color: "white"
  }}>
    <FaUser size="16px" color='white' />
    {challenge.participants?.length}명
    </div>
    </div>
    <div className={PastStyles.ulDiv}>
      <ul>
      <li style={{font:"normal 600 1.1rem/22px Noto Sans KR"}}> 
      {challenge.title}</li>
      <li style={{font:"normal 400 1rem/22px NanumSquare"}}> 
      시작일: {
           (challenge.startDate?.getMonth() as number+1)+"월"
           +challenge.startDate?.getDate()+"일"
}   </li>
<li style={{font:"normal 400 1rem/22px NanumSquare"}}>
종료일: { (challenge.endDate?.getMonth() as number+1)+"월"
           +challenge.endDate?.getDate()+"일"}
     </li>
     <br/>
     <li> {challenge.hasOwnProperty("result") ? 
     <div 
     style={{
       border:"1px solid",
       borderRadius:"0.3rem",
       boxShadow:"2px 2px 2px #ccc",
       backgroundColor:"#ff5656",
       font: "normal 600 1.1rem/24px Noto Sans KR",
       color:"#fff",
       width:"33vw",
       textAlign:"center"
     }}

     >
       
       {challenge.type=== "diet"?(
       <div>
        최종달성율  {(Number(challenge.result)/Number(challenge.diet?.condition))*100} %
       </div>):(
       <div>
        최종달성율  {(Number(challenge.result)/Number(challenge.recipe?.uploadCount))*100}%
         </div>)}
     </div> :
     <div
     style={{
      border:"1px solid",
      borderRadius:"0.3rem",
      backgroundColor:"#6799FF",
      font: "normal 600 1.1rem/24px Noto Sans KR",
      color:"#fff",
      width:"35vw",
      textAlign:"center",
      marginLeft:"5px",
          }}>
      최종달성율 100%
      </div>}</li>
     </ul>
    </div>
    </>
   </Link>
  </div>
  )   


const PastChallenges: React.FC<Props> = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const handleScroll = useCallback(async () => {
    const documentElement = document.documentElement;
    // DOM의 전체 HTML 문서?

    const scrollHeight = documentElement.scrollHeight
    // 전체 문서의 scroll과 상관 없는 전체 크기 pixel
    const scrollY = Math.ceil(window.scrollY)
    // 전체 문서에서 얼마나 스크롤로 내려왔는가
    const offsetHeight = Math.ceil(documentElement.offsetHeight);
    // 전체 문서가 viewport 기준으로 얼마만큼 보여지고 있는가

    if (scrollHeight <= scrollY + offsetHeight + 60) {

      window.removeEventListener('scroll', handleScroll)
      try {
        const { data: { challenges: pastChallenges } } = await axios.get('/api/challenge/past');
        setChallenges(pastChallenges.map((challenge: any) => {

          return { ...challenge, startDate: new Date(challenge.startDate), endDate: new Date(challenge.endDate) }
        }));

      } catch (error) {
        console.error(error);
      }
    }
  }, [])


  useEffect(() => {

    window.addEventListener('scroll', handleScroll)
    return ;  
  }, [handleScroll])
  
  return (
    <div>
      {challenges.length === 0 ?
        <>      
        
       <div className={ChallengeStyle.bottomTag}>종료된 챌린지</div>
       <div className={ChallengeStyle.scrollTag}>챌린지가 존재하지 않습니다.</div>
       
       </>

        :
        <> 
        <div className={ChallengeStyle.bottomTag}>종료된 챌린지</div>
        <div>
          {challenges.map(PastChallenge)}
        </div>
        </>
}
    </div>
  )
}

export default PastChallenges
