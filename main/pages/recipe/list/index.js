// page component '/recipe/list'
// 모든 레시피를 보여주는 리스트

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ShowCategories from '../../../components/recipe/main/Categories'
import RcpData from '../../../public/static/recipe/dataSample/RecipeData'

import recipeListStyles from '../../../styles/RecipeList.module.css'

// API 추가시 recipeAll을 인자로 사용
const index = () => {
    let [rcpData ,setRcpData] = useState(RcpData)
    return (
        <div>
            <ShowCategories></ShowCategories>
            <h1>레시피 : 전체</h1>
            <div>
                <ul className={recipeListStyles.cards}>
                    {rcpData.map((card, index) => {
                        return (
                            <li key={card.rcp_post_id}>
                                <Link 
                                    href={{
                                    pathname: `/recipe/card/${card.rcp_post_id}`,
                                    query: {  props : JSON.stringify(card) }
                                    }}
                                    as={`/recipe/card/${card.rcp_post_id}`}
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

// export const getServerSideProps = async (ctx) => {
//     await getUserOrRedirect(ctx);
//     const client = await clientPromise;
//     const rcpData = await client
//       .db("webfront")
//       .collection("recipe")
//       .find({})
//       .project({ _id: 0 })
//       .toArray();
//     console.log(rcpData);
//     return { props: { rcpData } };
//   };

export default index
