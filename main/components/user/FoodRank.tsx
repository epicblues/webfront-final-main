import React, { useMemo, useState } from 'react'
import { BiQuestionMark, BiMedal } from 'react-icons/bi';
import { RankedFood } from '../../pages';
import mainStyle from '../../styles/main/Main.module.css';
import FoodRankInfo from './FoodRankInfo';
import FoodRankModal from './FoodRankModal';

interface Props {
  foodRank: RankedFood[]

}

const medalImg = [
  {
    image:
      "/1st.png",
  },
  {
    image:
      "/2nd.png",
  },
  {
    image:
      "/3rd.png",
  },
];


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
            <img src={medalImg[index].image} className={mainStyle.rankMedal} />
            {/* <WordToComponent word={name.replace(/,/g, "")} nutrition={nutrition} /> */}
            <div className={mainStyle.orderName}>{name.split('(')[0]}</div>
            <div className={mainStyle.orderCount}>{count}</div>

          </div>
        )) : <div>식단을 기록하면 볼 수 있어요.</div>
        }
      </div>
    </div>
  )
}

export default FoodRank