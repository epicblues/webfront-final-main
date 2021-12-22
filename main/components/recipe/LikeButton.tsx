// LikeButton.tsx
// CardSwiper.js 컴포넌트 내부에서 사용되는 LikeButton

import React, { MouseEventHandler } from 'react'
import { patchStaticAxios, postStaticAxios } from '../../util/axios'
import likeButtonStyles from '../../styles/main/LikeButton.module.css'

const LikeButton = ({ recipeId, token, filterData, index }: any) => {

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (event) => {
    const { data } = await postStaticAxios("/api/recipe/like?id=" + recipeId, token, {}) // post 지만 데이터기 필요 없기 떄문에 빈객체
    const newRecipe = data.recipe; // like 조건이 갱신된  레시피 데이터를 활용할 수 있다.
    filterData((state:any) => {
      const newState = [...state];
      newState[index].likes = newRecipe.likes;
      return newState;
    })
  }

  return (
    <button className={likeButtonStyles.like} onClick={handleClick}>
      <i className="heart outline icon"></i>
    </button>
  )
}

export default LikeButton;
