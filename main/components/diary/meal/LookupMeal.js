import React from 'react'

import ImageUpload from "./ImageUpload";

const LookupMeal = () => {
    return (
        <div style={{ padding: "0 16px 16px" }}>
            
            <ImageUpload />
                
            <div>
                아침에 해당하는 총 카운트된 데이터들: 칼로리,탄,단,지 출력    
            </div>

            <div className="ui middle aligned divided list">
                {/* {cart.map((product, index) => (
                <div className="item" key={index} style={{ padding: "8px 0" }}>
                    <div
                        className="content"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div className="header">
                          {value.name}
                          <div className="description">
                            {value.mfr} / {value.serve}{value.unit}
                          </div>
                        </div>
                        <div
                          className="right floated"
                          style={{ margin: "8px 10px 0 0" }}
                        >
                          {value.kcal}Kcal
                        </div>
                    </div>
                </div>
                ))} */}
            </div>

        </div>
    )
}

export default LookupMeal
