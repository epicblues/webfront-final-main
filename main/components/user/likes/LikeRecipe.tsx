import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { Recipe } from '../../../models/Recipe';

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
    <div>
      <div>
        좋아하는 레시피
      </div>
      <div>
        {recipes.map((recipe: Recipe) =>
        (<Link key={recipe._id} href={`/recipe/card/${recipe._id}`} passHref>
          <div>{recipe.title}</div>
        </Link>)
        )}
      </div>
    </div>
  )
}

export default LikeRecipe
