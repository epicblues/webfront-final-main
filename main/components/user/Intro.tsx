import React, { CSSProperties } from 'react'
import animation from '../../styles/user/animation.module.css'

const Intro = ({ handleClick, loginMode }: { handleClick: Function, loginMode: boolean }) => {

  const container: CSSProperties = {
    display: 'flex',
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "20px",
    height: "70vh",
    transition: "all 0.3s",
    transform: loginMode ? "translate(-110%,-60vh)" : 'translate(0%,-60vh)'

  }

  const item: CSSProperties = {
    display: 'flex',
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "18vh",
    fontWeight: 700,


  }

  return (
    <div style={container}>
      <h1>요건 다 내꺼</h1>
      <h2>
        요리와 건강을 모두 챙겨봅시다!
      </h2>

      <div style={item}>
        <h3>Recipe</h3>
        <div style={{ fontSize: "1.1em" }}>🍖 레시피를 작성하고 회원들과 공유할 수 있습니다.</div>
        <h3>Diary</h3>
        <div style={{ fontSize: "1.1em" }}>💪 먹은 음식의 영양 성분을 기록할 수 있습니다. </div>
        <h3>Challenge</h3>
        <div style={{ fontSize: "1.1em" }}>⌛️ &nbsp;&nbsp;보다 능동적인 건강관리를 할 수 있습니다.</div>
      </div>



      <button style={{ paddingLeft: "5px", paddingRight: "10px", backgroundColor: "#ff5656", fontWeight: "bolder", borderRadius: "20px", color: "white", boxShadow: "none", border: "none", alignSelf: "stretch", height: "40px", marginTop: "10px", fontSize: "1.2em" }} onClick={() => { handleClick() }}>시작하기</button>
    </div>
  )
}

export default Intro
