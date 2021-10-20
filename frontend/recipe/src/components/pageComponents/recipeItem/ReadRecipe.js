import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useLocation } from "react-router";

function ReadRecipe() {
    const {rcpData} = useLocation().state;
    // const abc = useLocation().state;
    return (
        <div>
            <Link exact to="/">
                <h1>Recipe Main</h1>
            </Link>
           
            <div className="rcp_thumb">
                {/* 상단 레시피 인트로 이미지, 썸네일과 동일 */}
                <img id="rcp_thumb" src={`../${rcpData.rcp_thumb_url}`} />
                {/* 카테고리 중간 사이즈 폰트 */}
                <p id="rcp_category">{rcpData.rcp_category}</p>
                {/* 레시피 이름 */}
                <p id="rcp_main_title">{rcpData.rcp_main_title}</p>
                {/* 레시피 부제 */}
                <p id="rcp_sub_title">{rcpData.rcp_sub_title}</p>
                {/* 레시피 설명 */}
                <p id="rcp_desc">{rcpData.rcp_desc}</p>
                {/* 레시피 재료 */}
                {/* 영양성분표 Modal */}
                <input type="button" value="영양성분보기" />
            </div>
        </div>
    );
}

export default ReadRecipe;