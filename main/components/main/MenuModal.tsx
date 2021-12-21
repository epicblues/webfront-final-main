import { urlObjectKeys } from 'next/dist/shared/lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { CSSProperties, useEffect, useState } from 'react'
import menuButton from '../../styles/main/MenuButton.module.css'

const MenuModal = ({ onExit, hidden, setLoading }: { onExit: Function, hidden: boolean, setLoading: Function, }) => {
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

  const router = useRouter();

  const MIDDLE_WIDTH = 50
  const BOTTOM_HEIGHT = 10
  // 위치 조절 상수
  const record = [
    [MIDDLE_WIDTH, BOTTOM_HEIGHT + 5],
    [MIDDLE_WIDTH + 25, BOTTOM_HEIGHT + 10],
    [MIDDLE_WIDTH + 25, BOTTOM_HEIGHT + 25],
    [MIDDLE_WIDTH, BOTTOM_HEIGHT + 30],
    [MIDDLE_WIDTH - 25, BOTTOM_HEIGHT + 25],
    [MIDDLE_WIDTH - 25, BOTTOM_HEIGHT + 10],
  ];
  return (
    <div style={hidden ? {

    } : backgroundStyle} onClick={() => { onExit() }}>

      <Link href={"/recipe/create"} passHref>
        <div>
          <div className={menuButton.button} style={
            hidden ? {} : {
              bottom: `${record[4][1]}vh`,
              left: `${record[4][0]}vw`,
              opacity: 1
            }}
            onClick={() => { onExit(); setLoading(true) }}>📚<br /></div><div className={menuButton.title} style={hidden ? {} : {
              position: "fixed",
              bottom: `${record[4][1] - 4}vh`,
              left: `${record[4][0] - 8.5}vw`,

            }}>레시피 작성</div></div>
      </Link>
      {["아침", "점심", "저녁", "간식"].map((value, index) => (
        <div key={value}>
          <div className={menuButton.button}
            style={
              hidden ? {} : {
                bottom: `${record[index][1]}vh`,
                left: `${record[index][0]}vw`,
                opacity: 2
              }}

            onClick={() => {
              onExit(); setLoading(true); router.push(
                `/diary?mode=${index}`
              )
            }}
          >
            🥪<br />
          </div>
          <div className={menuButton.title} style={hidden ? {} : {
            position: "fixed",
            bottom: `${record[index][1] - 4}vh`,
            left: `${record[index][0] - 3}vw`,

          }}>{value}</div></div>
      ))}

      <Link href={"/challenge/create"} passHref>
        <div>
          <div className={menuButton.button} style={
            hidden ? {} : {
              bottom: `${record[5][1]}vh`,
              left: `${record[5][0]}vw`,
              opacity: 1
            }} onClick={() => { onExit(); setLoading(true) }}>🏆<br /></div><div className={menuButton.title} style={hidden ? {} : {
              position: "fixed",
              bottom: `${record[5][1] - 4}vh`,
              left: `${record[5][0] - 8.5}vw`,

            }}>챌린지 작성</div></div>
      </Link>
    </div>
  )
}

export default MenuModal
