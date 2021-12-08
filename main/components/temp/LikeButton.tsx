import React, { MouseEventHandler } from 'react'
import { patchStaticAxios, postStaticAxios } from '../../util/axios'


// Challenge도 똑같이 사용하면 됩니다.
const LikeButton = ({ recipeId, token }: any) => {

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (event) => {
    const { data } = await postStaticAxios("/api/recipe/like?id=" + recipeId, token, {}) // post 지만 데이터기 필요 없기 떄문에 빈객체
    const newRecipe = data.recipe; // like 조건이 갱신된  레시피 데이터를 활용할 수 있습니다.
  }

  return (
    <button onClick={handleClick}>
      like
    </button>
  )
}

// 좋아요 취소 버튼 (같은 api 주소 하지만 PATCH 메소드를 사용한다.)

const DislikeButton = ({ recipeId, token }: any) => {

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (event) => {
    const { data } = await patchStaticAxios("/api/recipe/like?id=" + recipeId, token) // patch 지만 데이터가 필요 없기 떄문에 빈객체
    const newRecipe = data.recipe; // like 조건이 갱신된  레시피 데이터를 활용할 수 있습니다.
  }

  return (
    <button onClick={handleClick}>
      Dislike
    </button>
  )
}


export default LikeButton
