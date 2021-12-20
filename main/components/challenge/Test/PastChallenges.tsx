import axios from 'axios';
import React, { useState } from 'react'
import { Image } from 'semantic-ui-react';
import { Challenge } from '../../../models/Challenge';
import PastStyles from "../../../styles/challenge/Past.module.css"
import ImageAndParti from '../Main/ImageAndParti';

interface Props {
  userId?: number
}

const PastChallenge = (challenge: Challenge) => (
  <div style={{ display:"flex", justifyContent:"space-between"}} key={challenge._id}>
    <div>
    <Image
     className={PastStyles.image}
    src={process.env.NEXT_PUBLIC_STATIC_SERVER_URL + challenge.image}
    />
    {challenge.title}
    {challenge.startDate}~{challenge.endDate}
    {challenge.hasOwnProperty("result") ? "실패" : "성공"}
    </div>
  </div>)


const PastChallenges: React.FC<Props> = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const handleClick = async () => {
    try {
      const { data: { challenges: pastChallenges } } = await axios.get('/api/challenge/past');
      setChallenges(pastChallenges);

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
