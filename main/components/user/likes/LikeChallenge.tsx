import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { Challenge } from '../../../models/Challenge';
import likeStyle from '../../../styles/main/LikeContent.module.css'

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


    <div className={likeStyle.container}>
      {challenges.length === 0 && (<div>좋아하는 챌린지가 없습니다!</div>)}
      {challenges.map((challenge: Challenge) =>
      (<><Link passHref href={`/challenge/list/${challenge._id}`} key={challenge._id}><i className="icon share"></i></Link><div >
        {challenge.title}
      </div></>)
      )}
    </div>




  )
}

export default LikeChallenge
