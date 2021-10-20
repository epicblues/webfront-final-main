//  component ShowRecipeCard

import React, { useState } from "react";
import { Link } from "react-router-dom";

function ShowRecipeCard(props) {
    let [rcpData, setRcpData] = useState(props.rcpData)

    return (
        <div id="columns">
            <div className="rcp_thumb_card">
                <Link to={{
                    pathname: `/card/${rcpData.rcp_post_id}`,
                    state: {rcpData}

                }}>
                    {/* img를 DB에서 불러올 수 있게 연결할 것 */}
                    <img id="rcp_thumb" src={rcpData.rcp_thumb_url} />
                    <p id="rcp_main_title">{rcpData.rcp_main_title}</p>
                    <p id="rcp_sub_title">{rcpData.rcp_sub_title}</p>
                    <p id="rcp_likes">좋아요: {rcpData.rcp_likes}</p>
                </Link>
            </div>
        </div>
    );
}

export default ShowRecipeCard;