import React from 'react'
import cardStyle from '../../styles/main/Main.module.css'

interface Props {
  foodRank: {
    name: string,
    count: number
  }[]
}

const FoodRank = ({ foodRank }: Props) => {
  return (
    <div className={cardStyle.flex} style={{ flexDirection: 'column' }}>
      <div className={cardStyle.card} style={{ fontSize: "1.3em", }}>
        월간 식단 Top 3
      </div>

      <div className={cardStyle.flex} style={{ padding: "10px", borderRadius: "20px", justifyContent: "space-around", fontWeight: 400, fontSize: "0.9em" }}>
        {foodRank.length !== 0 ? foodRank.map(({ name, count }) => (
          <div style={{ textAlign: "center" }} key={name}>
            <p>{name.split(',')[0]}</p><p> {count}</p>
          </div>
        )) : <div>일지를 더 작성해주세요!</div>}
      </div>
    </div>
  )
}

export default FoodRank
