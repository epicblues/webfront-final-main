import React, {useState} from "react";

function ReadRecipe(props) {
    let [rcpData, setRcpData] = useState(props.rcpData);


    return (
        <div>
            <div class="rcp_thumb">
                {/* 상단 레시피 인트로 이미지, 썸네일과 동일 */}
                <img id="rcp_thumb" src={rcpData.rcp_thumb_url} />
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
            </div>
        </div>
    );
}

export default ReadRecipe;