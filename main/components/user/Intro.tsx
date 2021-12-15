import React, { CSSProperties } from 'react'
import animation from '../../styles/user/animation.module.css'

const Intro = ({ handleClick, loginMode }: { handleClick: Function, loginMode: boolean }) => {

  const container: CSSProperties = {
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'end',
    gap: '2rem',
    alignItems: "center",
    padding: '1rem',
    height: "74vh",
    transition: "all 0.3s",
    width: "100vw",

    // position: "fixed",

  }

  const item: CSSProperties = {
    display: 'flex',
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "18vh",
    fontWeight: 600,

  }

  const button: CSSProperties = {
    backgroundColor: "#ff5656",
    borderRadius: "20px",
    color: "white",
    border: "none",
    alignSelf: "stretch",
    height: "2.8rem",
    fontWeight: 600,
    fontSize: "1.2rem"
  }

  return (
    <div style={container}>
      <img src='/static/logos/logo06.png' alt='요건 다 내꺼' style={{ width: '12rem', margin: '0 auto' }} />
      <p style={{font: 'normal 400 1.2rem "Noto Sans KR"', textAlign: 'center', width: '82%', margin: 0}}>
        처음 오셨나요?
        바로 가입하고 시작하세요.<br />
        이미 사용하고 계신가요?
        로그인하시면 함께한 기록을 모두 확인할 수 있습니다.
      </p>

      <div style={item}>
        <h3>레시피</h3>
        <div style={{ fontSize: "1.1rem" }}>🍖 레시피를 작성하고 회원들과 공유할 수 있습니다.</div>
        <h3>다이어리</h3>
        <div style={{ fontSize: "1.1rem" }}>💪 먹은 음식의 영양 성분을 기록할 수 있습니다.</div>
        <h3>챌린지</h3>
        <div style={{ fontSize: "1.1rem" }}>⌛️ &nbsp;&nbsp;보다 능동적으로 건강관리를 할 수 있습니다.</div>
      </div>

      <button style={button} onClick={() => { handleClick() }}>시작하기</button>
    </div>
  )
}

export default Intro
