// page component '/recipe/list'
// 모든 레시피를 보여주는 리스트

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ShowCategories from '../../../components/recipe/main/Categories'
import axios from 'axios'

//  CSS
import recipeListStyles from '../../../styles/RecipeList.module.css'

const index = () => {
    //  레시피 전체 리스트 데이터 받아오기
    const getRecipeDataAll = async () => {
        const { data } = await axios.get('/api/recipe');
        return data
    }
    const initialData = getRecipeDataAll();
    const [recipeData, setRecipeData] = useState(initialData)

    return (
        <div>
            <ShowCategories></ShowCategories>
            <h1>레시피 : 전체</h1>
            <div>
                <ul className={recipeListStyles.cards}>
                    {recipeData.map((card, index) => {
                        return (
                            <li key={card._id}>
                                <Link 
                                    href={{
                                    pathname: `/recipe/card/${card._id}`,
                                    query: { props : JSON.stringify(card) }
                                    }}
                                    as={`/recipe/card/${card._id}`}
                                    >
                                    <a>
                                        <Image 
                                            src={card.rcp_thumb_url}
                                            width={100}
                                            height={100}
                                            alt={card.rcp_main_title}
                                        />
                                        <p>{card.rcp_main_title}</p>
                                        <p>{card.rcp_sub_title}</p>
                                        <p>좋아요: {card.rcp_likes}</p>
                                    </a>
                                </Link>
                            </li>
                        )                        
                    })}
                </ul>
            </div>
        </div>
    )
}



export default index
