import Link from 'next/link'
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
    height: "190px",
    border: "2px solid gray"

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

  const menuStyle: CSSProperties = {

  }



  return (
    <div style={backgroundStyle}>
      <div style={contentAreaStyle}>
        <Link href={"/recipe/list/my"} passHref>
          <div onClick={() => { onExit() }}>내 레시피</div>
        </Link>

        <div>다이어리 작성</div>

        <div>내 레시피</div>
        <span style={buttonStyle} onClick={() => { onExit() }} />
      </div>
    </div>
  )
}

export default MenuModal
