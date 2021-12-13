import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { Recipe } from '../../../models/Recipe';
import likeStyle from '../../../styles/main/LikeContent.module.css'
const LikeRecipe = () => {
  // 내가 좋아하는 챌린지 useEffect를 통해서 fetch
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  useEffect(() => {
    (async function fetchData() {
      const { data: likedRecipes } = await axios.get("/api/user/like/recipe")
      setRecipes(likedRecipes);
    })();
    return () => { }
  }, [])

  return (
    <div className={likeStyle.container}>
      {recipes.length === 0 && <div>좋아하는 레시피가 없습니다!</div>}
      {recipes.map((recipe: Recipe) =>
      (<div key={recipe._id}><Link href={`/recipe/card/${recipe._id}`} passHref>

        <i className="icon share" ></i>
      </Link>
        <div >{recipe.title}</div>
      </div>
      )
      )}
    </div>
  )
}

export default LikeRecipe
