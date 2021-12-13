import React, { useMemo } from 'react'
import cardStyle from '../../styles/main/Main.module.css'

interface Props {
  foodRank: {
    name: string,
    count: number
  }[]
}

const wordToComponent = (word: string) => {
  const wordArray = word.split(' ');

  const component = wordArray.map((value, index) => (<div key={index} className={cardStyle.foodName}>{value}</div>));
  return (<>{component}</>)
}


const FoodRank = ({ foodRank }: Props) => {
  console.log("FoodRank Rendered");
  return (
    <div className={cardStyle.flex} style={{ flexDirection: 'column' }}>
      <div className={cardStyle.card} style={{ fontSize: "1.3em", }}>
        월간 식단 Top 3
      </div>

      <div className={cardStyle.flex} style={{ padding: "10px", borderRadius: "20px", justifyContent: "space-between", fontWeight: 400, fontSize: "0.9em", }}>
        {foodRank.length !== 0 ? foodRank.map(({ name, count }, index) => (
          <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", textAlign: "center", paddingRight: "5px" }} key={name}>
            {wordToComponent(name.split(',')[0])}
          </div>
        )) : <div>일지를 더 작성해주세요!</div>}
      </div>
    </div>
  )
}

export default FoodRank