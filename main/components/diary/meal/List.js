import React from 'react'

const List = ({ product, index }) => {
    return (
        <div key={index}>
            <div
                className="content"
                style={{
                        display: "flex",
                        justifyContent: "space-between",
                }}
            >
                <div className="header">
                    {product.name}
                    <div className="description">
                        {product.mfr} / {product.serve}{product.unit}
                    </div>
                </div>
                <div
                    className="right floated"
                    style={{ margin: "8px 10px 0 0" }}
                >
                    {product.kcal}Kcal
                </div>
            </div>
        </div>
    )
}

export default List
