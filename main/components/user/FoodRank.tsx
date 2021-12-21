import React, { useMemo, useState } from 'react'
import cardStyle from '../../styles/main/Main.module.css'

interface Props {
  foodRank: {
    name: string,
    count: number
  }[]
}

const WordToComponent: React.FC<{ word: string }> = ({ word }) => {
  const wordArray = word.split(' ');
  const wordTooLong = wordArray.length > 2;

  const [showFullName, setShowFullName] = useState(false);

  const component = wordArray.slice(0, 2).map((value, index) => (<div key={index} className={cardStyle.foodName}>{value}</div>));
  return (<div onClick={(e) => {
    if (wordTooLong) setShowFullName(!showFullName);
  }} style={{ position: "relative" }}>
    {component} {wordTooLong &&
      <div>...</div>}
    {showFullName && <div className={cardStyle.fullFoodName}>{word}</div>}
  </div>)
}


const FoodRank = ({ foodRank }: Props) => {

  return (
    <div className={cardStyle.flex} style={{ flexDirection: 'column' }}>
      <div className={cardStyle.card} style={{ fontSize: "1.3em", }}>
        월간 식단 Top 3
      </div>

      <div className={cardStyle.flex} style={{ padding: "10px", borderRadius: "20px", justifyContent: "space-between", fontWeight: 400, fontSize: "0.9em", position: "relative" }}>
        {foodRank.length !== 0 ? foodRank.map(({ name, count }, index) => (
          <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", textAlign: "center", paddingRight: "5px" }} key={name}>
            {<WordToComponent word={name.replace(/,/g, "")} />}
          </div>
        )) : <div>일지를 더 작성해주세요!</div>}
      </div>
    </div>
  )
}

export default FoodRank