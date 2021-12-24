import React, { useState } from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
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
      <BiDotsVerticalRounded size='1.2rem' style={{ marginTop: '0.25rem' }} />
      {/* <div></div> */}
      {show && <><div className={mainStyle.foodRankInfo}>
        한 달 동안 식단에 가장 많이 추가된 레시피 또는 음식 입니다.
      </div><div style={{ position: "fixed", left: "0", top: "0", width: "100vw", height: "100vh" }}></div></>}
    </div>
  )
}

export default FoodRankInfo
