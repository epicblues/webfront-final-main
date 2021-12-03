import { urlObjectKeys } from 'next/dist/shared/lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { CSSProperties } from 'react'

const MenuModal = ({ onExit }: { onExit: Function }) => {
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
  }

  const contentAreaStyle: CSSProperties = {
    position: "fixed",
    bottom: "6px",
    marginBottom: "6vh",
    display: 'flex',
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "40vh",
    justifyContent: "space-around",
    fontSize: "1.3em",
  }

  const buttonStyle: CSSProperties = {
    //   height: 25px;
    //   width: 25px;
    //   background- color: #bbb;
    // border - radius: 50 %;
    // display: inline - block;
    height: "40px",
    width: "40px",
    background: "#bbb",
    borderRadius: "50%",
    display: 'inline-block',
    margin: "30px",
  }

  const router = useRouter()



  return (
    <div style={backgroundStyle}>
      <div style={contentAreaStyle}>
        <Link href={"/recipe/create"} passHref>
          <div onClick={() => { onExit() }}>레시피 작성</div>
        </Link>
        <Link href={"/challenge/create"} passHref>
          <div onClick={() => { onExit() }}>챌린지 작성</div>
        </Link>
        {["아침", "점심", "저녁", "간식"].map((value, index) => (
          <div key={index} onClick={() => {
            onExit(); router.push(
              `/diary?mode=${index}`
            )
          }}
          >
            {value}
          </div>

        ))}


      </div>

    </div>
  )
}

export default MenuModal
