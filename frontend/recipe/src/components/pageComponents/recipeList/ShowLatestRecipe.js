import React, {useState} from "react";
import ShowListOne from "./ShowListOne";
function ShowLatestRecipe(props) {
    let [_foodData, setFoodData] = useState(props.foodData)

    return (
        // 뒤에서 1번째 recipe item id값 인자로 넣어서 getListOne 함수실행
        <div className="row">
            {
                _foodData.map(function (n, i) {
                    return (
                        <ShowListOne foodData={_foodData[i]} i={i} key={i} />
                    )   
                })
            }
        </div>
        // 뒤에서 2번째 recipe item

        // 뒤에서 3번째 recipe item
        // 뒤에서 4번째 recipe item
    );
}

export default ShowLatestRecipe;