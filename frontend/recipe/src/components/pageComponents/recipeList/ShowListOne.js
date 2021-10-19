import React, {useState} from "react";

// post_id 인자로 사용
function ShowListOne(props) {
    let [foodData, setFoodDate] = useState(props.foodData)

    return (
        <div id="columns">
            <div class="recipe_thumbnail_card">
                {/* a 태그 -> link 태그로 리팩토링하여 리렌더링 방지할 것 */}
                <a href="#">
                    {/* img를 DB에서 불러올 수 있게 연결할 것 */}
                    <img id="recipe_thumbnail" src={props.foodData.thumbnail_url} />
                    <p id="main_title">{props.foodData.main_title}</p>
                    <p id="sub_title">{props.foodData.sub_title}</p>
                    <p id="likes">{props.foodData.likes}</p>
                </a>
            </div>
        </div>
    );
}

export default ShowListOne;