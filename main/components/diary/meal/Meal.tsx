import React from 'react'

const Meal = ({ diary, type, setWritingMode, user }: any) => {
  const typeName = ["아침", "점심", "저녁", "간식"]
  return (
    <div
      className="item"
      onClick={(e) => {
        e.preventDefault();
        setWritingMode(type);
      }}
      style={{
        border: "solid 2px lightgray", borderRadius: "5px",
        display: "grid", gridTemplateColumns: "5fr", gridAutoRows: "200px"
      }}
    >
      <img src={diary.meals[type].imageBuffer || user.url + diary.meals[type].image}
        className='ui rounded image'
        style={{ objectFit: 'cover', width: '100%', height: '100%', boxSizing: 'border-box' }} />

      {/* {typeName[type]} */}
    </div>
  )
}

export default Meal
