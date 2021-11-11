import React from 'react'

const Meal = ({ diary, type, setWritingMode }: any) => {
  const typeName = ["아침", "점심", "저녁", "간식"]
  return (
    <div
      className="item"
      style={{ border: "solid 2px lightgray", borderRadius: "5px" }}
    >
      <div>
        <a
          onClick={(e) => {
            e.preventDefault();
            setWritingMode(type);
          }}
          className="ui teal circular label"
        >
          +
        </a>
        <img src={diary.meals[type].imageBuffer} width={100} height={100} />
      </div>
      {typeName[type]}
    </div>
  )
}

export default Meal
