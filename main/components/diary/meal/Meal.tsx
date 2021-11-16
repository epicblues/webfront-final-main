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
        border: "solid 2px lightgray",
        borderRadius: "5px",
        position: 'relative'
      }}
    >
      <img src={diary.meals[type].imageBuffer || user.url + diary.meals[type].image}
        className='ui rounded image'
        style={{ objectFit: 'cover', width: '100%', height: '100%', boxSizing: 'border-box' }}
      />

      <a className="ui teal label" style={{ position: 'absolute', top: '8px', right: '8px' }}>
        {typeName[type]}
      </a>

      <a className='ui teal circular label'
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          display: (!(diary.meals[type].foods.length !== 0)) ? 'block' : 'none'
        }}
      >
        +
      </a>
    </div>
  )
}

export default Meal
