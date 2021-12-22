import React, { useMemo, useState } from 'react'
import { BiQuestionMark } from 'react-icons/bi';
import { RankedFood } from '../../pages';
import cardStyle from '../../styles/main/Main.module.css'
import FoodRankInfo from './FoodRankInfo';
import FoodRankModal from './FoodRankModal';

interface Props {
  foodRank: RankedFood[]

}

const WordToComponent: React.FC<{
  word: string, nutrition: {
    kcal: number,
    carbs: number,
    prot: number,
    fat: number
  }
}> = ({ word, nutrition }) => {
  const wordArray = word.split(' ');
  const wordTooLong = wordArray.length > 2;

  const [showFoodModal, setShowFoodModal] = useState(false);

  const component = wordArray.slice(0, 2).map((value, index) => (<div key={index} className={cardStyle.foodName}>{value}</div>));
  return (<div onClick={({ currentTarget: elem }) => {
    if (!showFoodModal) {

      setTimeout(() => {
        (elem.children[elem.children.length - 1] as HTMLElement).style.opacity = "1"
      })
      setShowFoodModal(true);
      return;
    }

    (elem.children[elem.children.length - 1] as HTMLElement).style.opacity = "0"

    setTimeout(() => {
      setShowFoodModal(!showFoodModal);
    }, 200)

  }}>
    {component} {wordTooLong &&
      <div>...</div>}
    {showFoodModal && <FoodRankModal word={word} nutrition={nutrition} />}
  </div>)
}


const FoodRank = ({ foodRank }: Props) => {

  return (
    <div className={cardStyle.flex} style={{ flexDirection: 'column' }}>
      <div className={cardStyle.card} style={{ fontSize: "1.3em", flexDirection: "row" }}>
        <FoodRankInfo />월간 식단 Top 3
      </div>

      <div className={cardStyle.flex} style={{ padding: "10px", borderRadius: "20px", justifyContent: "space-between", fontWeight: 400, fontSize: "0.9em", }}>
        {foodRank.length !== 0 ? foodRank.map(({ name, count, nutrition }, index) => (
          <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", textAlign: "center", paddingRight: "5px" }} key={name}>
            {<WordToComponent word={name.replace(/,/g, "")} nutrition={nutrition} />}
          </div>
        )) : <div>일지를 더 작성해주세요!</div>}
      </div>
    </div>
  )
}

export default FoodRank