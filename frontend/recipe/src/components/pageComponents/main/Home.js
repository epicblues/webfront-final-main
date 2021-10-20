import React, { useState} from 'react';
import { Link } from 'react-router-dom';

import RcpData from '../../../Data/RecipeData';

import Categories from './Categories';
import Search from './Search';
import ShowLatestCard from '../recipeList/ShowLatestCard';

function Home() {
    const [showCategories, setShowCategories] = useState(false);
    const [_rcpData, setRcpData] = useState(RcpData); 

    return (
        // App으로 보내주다가 괜히 Home 따로 만들어서 개고생 중
        <>
            {/* 홈 */}
            <Link exact to="/">
                <h1>Recipe Main</h1>
            </Link>

            {/* 레시피 등록하기 */}
            <input type="button" value="레시피 등록하기" />

            {/* 카테고리 검색 */}
            <input type="button" value="카테고리 펼치기" 
                onClick={() => {setShowCategories( showCategories ? false : true)}}
            />
            {showCategories ? <Categories></Categories> : null}

            {/* 찜한 레시피 조회 */}
            <input type="button" value="찜한 레시피" />

            {/* 내 레시피 조회 */}
            <input type="button" value="내 레시피" />

            {/* 검색창 */}
            <Search></Search>

            {/* 인기 레시피 */}
            <h3>인기 레시피</h3>

            {/* 최신 레시피 */}
            <h3>최신 레시피</h3>
            <ShowLatestCard rcpData={_rcpData}/>
        </>
    );
}

export default Home;