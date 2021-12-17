import axios from 'axios';
import React, { useState } from 'react'
import { Challenge } from '../../../models/Challenge';

interface Props {
  userId?: number
}

const PastChallenge = (challenge: Challenge) => (
  <div key={challenge._id}>
    
    {challenge.title}
    {challenge.hasOwnProperty("result") ? "실패" : "성공"}
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
