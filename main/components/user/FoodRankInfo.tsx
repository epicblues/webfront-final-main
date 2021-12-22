import React, { useState } from 'react'
import { BsFillQuestionCircleFill } from 'react-icons/bs'
import mainStyle from '../../styles/main/Main.module.css'
const FoodRankInfo = () => {
  const [show, setShow] = useState(false)
  return (
    <div style={{ position: "relative", overflow: "visible" }} onClick={({ currentTarget: btn }) => {
      if (!show) {
        setShow(!show);

        setTimeout(() => { (btn.children[1] as HTMLElement).style.opacity = "1"; },)
        return;
      }

      (btn.children[1] as HTMLDivElement).style.opacity = show ? "0" : "1";

      setTimeout(() => { setShow(!show) }, 200)



    }}>
      <BsFillQuestionCircleFill />
      {show && <div className={mainStyle.foodRankInfo}>
        내가 한달 동안 많이 선택한 레시피 / 음식 입니다!
      </div>}
    </div>
  )
}

export default FoodRankInfo
