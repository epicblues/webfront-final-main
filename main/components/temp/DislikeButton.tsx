import React, { MouseEventHandler } from 'react'
import { patchStaticAxios, postStaticAxios } from '../../util/axios'
import likeButtonStyles from '../../styles/main/LikeButton.module.css'


// 좋아요 취소 버튼 (같은 api 주소 하지만 PATCH 메소드를 사용한다.)
const DislikeButton = ({ recipeId, token, filterData, index }: any) => {

    const handleClick: MouseEventHandler<HTMLButtonElement> = async (event) => {
      const { data } = await patchStaticAxios("/api/recipe/like?id=" + recipeId, token) // patch 지만 데이터가 필요 없기 떄문에 빈객체
      const newRecipe = data.recipe;
      filterData((state:any) => {
        const newState = [...state];
        newState[index].likes = newRecipe.likes;
        return newState;
      })
    }
  
    return (
      <button className={likeButtonStyles.dislike} onClick={handleClick}>
             <i className="heart icon"></i>
      </button>
    )
}

export default DislikeButton;