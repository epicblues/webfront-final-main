import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useFetch } from '../../../hooks';
import { Challenge } from '../../../models/Challenge';
import likeStyle from '../../../styles/main/LikeContent.module.css'

const LikeChallenge = () => {
  // 내가 좋아하는 챌린지 useEffect를 통해서 fetch
  console.log('likeChallenge rendered');
  const [challenges, setChallenges] = useFetch<Challenge[]>('/api/user/like/challenge');

  return (
    <div className={likeStyle.container}>
      {challenges?.length === 0 && (<div>좋아하는 챌린지가 없습니다!</div>)}
      {challenges?.map((challenge) =>
      (<div key={challenge._id}><Link passHref href={`/challenge/list/${challenge._id}`} ><i className="icon share"></i></Link><div >
        {challenge.title}
      </div></div>)
      )}
    </div>




  )
}

export default React.memo(LikeChallenge)
