import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { CSSProperties } from 'react'

const MenuModal = ({ onExit }: { onExit: Function }) => {
  const backgroundStyle: CSSProperties = {
    display: 'block',
    position: "fixed",
    background: "black",
    left: "0",
    bottom: "0",
    zIndex: 2,
    width: "100%",
    height: "100%",
    color: "white"
  }

  const contentAreaStyle: CSSProperties = {
    position: "fixed",
    bottom: "10px",
    // border: "2px solid white",

    width: "100vw",
    display: 'flex',
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    height: "40vh",
    border: "2px solid gray",
    justifyContent: "space-around",
    fontSize: "1.3em"

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
        <span style={buttonStyle} onClick={() => { onExit() }}></span>

      </div>

    </div>
  )
}

export default MenuModal
