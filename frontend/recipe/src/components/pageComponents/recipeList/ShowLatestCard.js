import React, {useState, useEffect } from "react";
import ShowRecipeCard from "./ShowRecipeCard";

function ShowLatestCard(props) {
    let rcpDataState = useState(props.rcpData);
    let _rcpData = [];
    _rcpData = rcpDataState[0];
    let setRcpData = rcpDataState[1];

    

    // useEffect(() => {
    //     //  componentDidMount
    //     setRcpData(props.rcpData);

    //     if(_rcpData && _rcpData.length > 0) {
    //         console.log(_rcpData[0])
    //     }
    // })

    return (
        // 뒤에서 1번째 recipe item id값 인자로 넣어서 getListOne 함수실행
        <div className="row">
            {
                // TODO: 비동기 처리로 교체해야 되는지 고려
                _rcpData.map(function (n, i) {
                    return (
                        <ShowRecipeCard rcpData={_rcpData[i]} i={i} key={i} />
                    )   
                })
            }
        </div>
        // 뒤에서 2번째 recipe item

        // 뒤에서 3번째 recipe item
        // 뒤에서 4번째 recipe item
    );
}

export default ShowLatestCard;