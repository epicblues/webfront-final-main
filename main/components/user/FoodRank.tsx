import React, { useMemo, useState } from 'react'
import { BiQuestionMark, BiMedal } from 'react-icons/bi';
import { RankedFood } from '../../pages';
import mainStyle from '../../styles/main/Main.module.css';
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
  // const medalImg = [
  //   {
  //     image:
  //     "/1st.png",
  //   },
  //   {
  //     image:
  //     "/2nd.png",
  //   },
  //   {
  //     image:
  //       "/3rd.png",
  //   },
  // ];
  const component = wordArray.slice(0, 2).map((value, index) => (<div key={index}>{value}</div>));
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
    <div className={mainStyle.foodRankWrap}>
      <div className={mainStyle.rankTitle}>
        <p>많이 먹은 음식 TOP 3</p>
        <FoodRankInfo />
      </div>

      <div className={mainStyle.rankList}>
        {foodRank.length !== 0 ? foodRank.map(({ name, count, nutrition }, index) => (
          <div className={mainStyle.rankOrder} key={name}>
            <div className={mainStyle.rankMedal}></div>
            {/* <WordToComponent word={name.replace(/,/g, "")} nutrition={nutrition} /> */}
            <div>{name}</div>
            <div className={mainStyle.orderCount}>{count}</div>
          </div>
        )) : <div>식단을 기록하면 볼 수 있어요.</div>
        }
      </div>
    </div>
  )
}

export default FoodRank