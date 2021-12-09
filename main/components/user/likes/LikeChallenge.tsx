import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { Challenge } from '../../../models/Challenge';

const LikeChallenge = () => {
  // 내가 좋아하는 챌린지 useEffect를 통해서 fetch
  const [challenges, setChallenges] = useState([]);
  useEffect(() => {
    (async function fetchData() {
      const { data: likedChallenges } = await axios.get("/api/user/like/challenge")
      setChallenges(likedChallenges);
    })();
    return () => { }
  }, [])

  return (
    <div>
      <div>
        좋아하는 챌린지
      </div>
      <div>
        {challenges.map((challenge: Challenge) =>
        (<Link passHref href={`/challenge/list/${challenge._id}`} key={challenge._id}><div >
          {challenge.title}
        </div></Link>)
        )}
      </div>

    </div>


  )
}

export default LikeChallenge
