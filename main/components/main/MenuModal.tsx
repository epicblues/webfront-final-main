import { urlObjectKeys } from 'next/dist/shared/lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { CSSProperties } from 'react'
import menuButton from '../../styles/main/MenuButton.module.css'

const MenuModal = ({ onExit, hidden }: { onExit: Function, hidden: boolean }) => {
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

  const router = useRouter()

  const MIDDLE_WIDTH = 50
  const BOTTOM_HEIGHT = 25
  // 위치 조절 상수
  const record = [
    [MIDDLE_WIDTH, BOTTOM_HEIGHT - 5],
    [MIDDLE_WIDTH + 25, BOTTOM_HEIGHT + 10],
    [MIDDLE_WIDTH + 25, BOTTOM_HEIGHT + 35],
    [MIDDLE_WIDTH, BOTTOM_HEIGHT + 50],
    [MIDDLE_WIDTH - 25, BOTTOM_HEIGHT + 35],
    [MIDDLE_WIDTH - 25, BOTTOM_HEIGHT + 10],
  ];

  return (
    <div style={hidden ? {

    } : backgroundStyle}>

      <Link href={"/recipe/create"} passHref>
        <div className={menuButton.button} style={
          hidden ? {} : {

            bottom: `${record[4][1]}vw`,
            left: `${record[4][0]}vw`,
            opacity: 1
          }}
          onClick={() => { onExit() }}>📚<br /><span>레시피작성</span></div>
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
            onExit(); router.push(
              `/diary?mode=${index}`
            )
          }}
        >
          🥪<br /><span>{value}</span>
        </div>

      ))}
      <Link href={"/challenge/create"} passHref>
        <div className={menuButton.button} style={
          hidden ? {} : {
            bottom: `${record[5][1]}vw`,
            left: `${record[5][0]}vw`,
            opacity: 1
          }} onClick={() => { onExit() }}>🏆<br /><span>챌린지작성</span></div>
      </Link>

    </div>
  )
}

export default MenuModal
