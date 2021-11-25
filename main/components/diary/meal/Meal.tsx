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
        // border: "solid 2px lightgray",
        borderRadius: "5px",
        position: 'relative',
        boxShadow: '1px 1px 3px 1px #dadce0'
      }}
    >
      <img src={diary.meals[type].imageBuffer || ((diary.meals[type].image !== null && process.env.NEXT_PUBLIC_STATIC_SERVER_URL + diary.meals[type].image) || '/empty.jpg')}
        alt=""
        className='ui rounded image'
        style={{ objectFit: 'cover', width: '100%', height: '100%', boxSizing: 'border-box' }}
      />

      <a className="ui teal label" style={{ position: 'absolute', top: '8px', right: '8px', borderRadius: '20px' }}>
        {typeName[type]}
      </a>

      <a className='ui teal circular label'
        style={{
          boxShadow: '1px 1px 3px 1px #dadce0',
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          display: diary.meals[type].foods.length === 0 && !diary.meals[type].imageBuffer ? 'block' : 'none'
        }}
      >
        +
      </a>
    </div>
  )
}

export default Meal
