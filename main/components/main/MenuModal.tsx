import { urlObjectKeys } from 'next/dist/shared/lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { CSSProperties, useEffect, useState } from 'react'
import menuButton from '../../styles/main/MenuButton.module.css'
import mainStyle from "../../styles/main/Main.module.css"
const MenuModal = ({ onExit, hidden, loading, setLoading }: { onExit: Function, hidden: boolean, loading: boolean, setLoading: Function }) => {
  const backgroundStyle: CSSProperties = {
    position: "fixed",
    left: "0",
    bottom: "0",
    zIndex: 2,
    width: "100%",
    height: "100%",
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: "white",
    // WebkitTransition: 'background ease-in-out 1s',
    // transition: 'background ease-in-out 1s'
    opacity: '1',
    transition: "all 0.3s"
  }

  const MIDDLE_WIDTH = 44
  const BOTTOM_HEIGHT = 20
  // 위치 조절 상수
  const record = [
    [MIDDLE_WIDTH, BOTTOM_HEIGHT],
    [MIDDLE_WIDTH + 30, BOTTOM_HEIGHT + 10],
    [MIDDLE_WIDTH + 30, BOTTOM_HEIGHT + 25],
    [MIDDLE_WIDTH, BOTTOM_HEIGHT + 35],
    [MIDDLE_WIDTH - 30, BOTTOM_HEIGHT + 25],
    [MIDDLE_WIDTH - 30, BOTTOM_HEIGHT + 10],
  ];
  const router = useRouter();
  return (
    <div style={hidden ? {

    } : backgroundStyle} onClick={() => { onExit() }}>

      <Link href={"/recipe/create"} passHref>
        <div className={menuButton.button} style={
          hidden ? {} : {

            bottom: `${record[4][1]}vw`,
            left: `${record[4][0]}vw`,
            opacity: 1
          }}
          onClick={() => { onExit(); setLoading(true) }}><span>레시피</span>작성</div>
      </Link>
      {["아침", "점심", "저녁", "간식"].map((value, index) => (
        <div className={menuButton.button} key={index}
          style={
            hidden ? {} : {
              bottom: `${record[index][1]}vw`,
              left: `${record[index][0]}vw`,
              opacity: 2
            }}

          onClick={() => {
            onExit(); setLoading(true); router.push(
              `/diary?mode=${index}`
            )
          }}
        >
          <i className='utensils icon' />

          {value}
        </div>

      ))}
      <Link href={"/challenge/create"} passHref>
        <div className={menuButton.button} style={
          hidden ? {} : {
            bottom: `${record[5][1]}vw`,
            left: `${record[5][0]}vw`,
            opacity: 1
          }} onClick={() => { onExit(); setLoading(true) }}>챌린지<br />작성</div>
      </Link>
      {loading && <div className={mainStyle.loadingCircle} style={{ top: "45vh" }}></div>}
    </div>
  )
}

export default MenuModal
