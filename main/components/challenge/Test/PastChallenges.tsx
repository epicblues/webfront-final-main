import axios from 'axios';
import React, { useState } from 'react'
import { Image } from 'semantic-ui-react';
import { Challenge } from '../../../models/Challenge';
import PastStyles from "../../../styles/challenge/Past.module.css"
import ImageAndParti from '../Main/ImageAndParti';

interface Props {
  userId?: number
}

const PastChallenge = (challenge: Challenge ) => (
  <div style={{display:"flex", justifyContent:"center"}} key={challenge._id}>
    <div className={PastStyles.imageDiv} >
    <Image
     className={PastStyles.image}
    src={process.env.NEXT_PUBLIC_STATIC_SERVER_URL as string + challenge.image}
    />
    </div>
    <div className={PastStyles.ulDiv}>
      <ul>
      <li style={{font:"normal 600 1.2rem/22px Noto Sans KR"}}> 
      {challenge.title}</li>
      <li style={{font:"normal 500 1rem/22px Noto Sans KR"}}> {challenge.startDate?.getFullYear()+"."+ 
           (challenge.startDate?.getMonth() as number+1)+"."
           +challenge.startDate?.getDate()}
           ~{challenge.endDate?.getFullYear()+"."
           + (challenge.endDate?.getMonth() as number+1)+"."
           +challenge.endDate?.getDate()}
     </li>
     <br/>
     <li> {challenge.hasOwnProperty("result") ? <div 
     style={{
       border:"1px solid",
       borderRadius:"0.3rem",
       backgroundColor:"#fff5f5",
       font: "normal 600 1.2rem/22px Noto sans KR",
       color:"#F15F5F",
       width:"80%",
     }}
     >최종달성율 {challenge.result}% </div> :<div
     style={{
      border:"1px solid",
      borderRadius:"0.3rem",
      backgroundColor:"#fff5f5",
      font: "normal 600 1.2rem/22px Noto sans KR",
      color:"#F15F5F",
      width:"90%",
    }}>최종달성율 100%</div>}</li>
     </ul>
    </div>
  </div>
  )   


const PastChallenges: React.FC<Props> = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const handleClick = async () => {
    try {
      const { data: { challenges: pastChallenges } } = await axios.get('/api/challenge/past');
      setChallenges(pastChallenges.map((challenge:any) => {
        
        return {...challenge, startDate: new Date(challenge.startDate), endDate: new Date(challenge.endDate)}
      }));

    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      {challenges.length === 0 ?
        <button onClick={handleClick}>과거 챌린지 보기</button>
        :
        <div>
          {challenges.map(PastChallenge)}
        </div>}
    </div>
  )
}

export default PastChallenges
