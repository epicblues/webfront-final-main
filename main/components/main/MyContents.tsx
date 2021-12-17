import React, { useEffect } from 'react'
import { useFetch } from '../../hooks'
import { Challenge } from '../../models/Challenge';
import { Recipe } from '../../models/Recipe';
import mainStyle from '../../styles/main/Main.module.css';
import Link from 'next/link'
import { BiExit } from 'react-icons/bi'
interface MyContents {
  challenges: Challenge[],
  recipes: Recipe[]
}

const MyContents = () => {
  // 내가 작성한 레시피
  // 내가 참여한 챌린지

  const [myContents, setMyContents] = useFetch<MyContents>('/api/user/mycontents');
  // 조건 연산자를 사용하여 로딩 느낌이 나게 해보기
  const buttonSize = "1.5rem"
  return (
    <>
      {myContents ?
        <>
          {myContents.challenges.length > 0 && <div className={mainStyle.contentBar}>
            <span>참여중인 챌린지</span>
            <span>{myContents.challenges.length}</span>
            <Link href="/challenge" passHref>
              <div>
                <BiExit size={buttonSize} height="1rem" />
              </div>
            </Link>
          </div>}
          {myContents.recipes.length > 0 && <div className={mainStyle.contentBar}>
            <span>작성한 레시피</span>
            <span>{myContents.recipes.length}</span>
            <Link href="/recipe/list/my" passHref>
              <div>
                <BiExit size={buttonSize} />
              </div>
            </Link>

          </div>}

        </>
        : <div className={mainStyle.loadingCircleGlobal} style={{ alignSelf: 'center', justifySelf: "center" }} />}

    </>
  )
}

export default React.memo(MyContents) 