import React from 'react'
import { BiWorld } from 'react-icons/bi'
import cardStyle from '../../styles/main/Main.module.css'

interface Props {
  word: string, nutrition: {
    kcal: number | string,
    carbs: number | string,
    prot: number | string,
    fat: number | string
  }
}

const FoodRankModal: React.FC<Props> = ({ word, nutrition: { kcal, carbs, fat, prot } }) => {
  return (<div style={{ transition: "opacity 0.2s ease", opacity: "0" }}>
    <div className={cardStyle.foodRankModal}>
      <div>{word.split(' ').length > 3 ? <><div>{word.split(' ').slice(0, 3).join(' ')}</div><div>{word.split(' ').slice(3).join(' ')}</div></> : word}</div>
      <div className={cardStyle.foodRankTable}>
        <div> <div>열량</div>{kcal} kcal</div>
        <div> <div>탄수화물</div>{carbs} {carbs !== "-" && "g"}</div>
        <div> <div>지방</div>{fat} {fat !== "-" && "g"}</div>
        <div> <div>단백질</div>{prot} {fat !== "-" && "g"}</div>
      </div>
    </div>
    <div />

  </div>
  )
}

export default FoodRankModal
