import React, { useEffect } from 'react'
import { useFetch } from '../../hooks'
import { Challenge } from '../../models/Challenge';
import { Recipe } from '../../models/Recipe';

interface MyContents {
  challenges: Challenge[],
  recipes: Recipe[]
}

const MyContents = () => {
  // 내가 작성한 레시피
  // 내가 참여한 챌린지

  const { data: myContents, setData: setMyContents } = useFetch<MyContents>('/api/user/mycontents');
  console.log(myContents);
  return (
    <>
      <div>
        참여중인 챌린지? : {myContents?.challenges?.length}
      </div>
      <div>
        작성한 레시피 : {myContents?.recipes?.length}
      </div>
    </>
  )
}

export default React.memo(MyContents) 