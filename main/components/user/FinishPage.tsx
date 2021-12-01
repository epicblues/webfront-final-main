import { useRouter } from 'next/router'
import React, { CSSProperties } from 'react'

const FinishPage = ({ email }: { email: string }) => {
  const container: CSSProperties = {
    position: 'fixed',
    left: 0,
    top: 0,
    display: 'flex',
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    background: "white"
  }

  const item: CSSProperties = {
    display: 'flex',
    flexDirection: "column",
    justifyContent: "center",
    minHeight: "18vh",
    fontWeight: 700,
    border: "2px solid gray",
    borderRadius: "20px",
    minWidth: "80vw",
    height: "40vh",
    alignItems: "center"

  }

  return (
    <div style={container}>
      <h1>회원 가입 완료!</h1>
      <div style={item}>
        <h3>
          {email}
        </h3>
        <h3>인증 메일을 보냈습니다. </h3>
        <h3>이메일을 확인해보세요!</h3>
      </div>
    </div>
  )
}

export default FinishPage
