import { useRouter } from 'next/router'
import React, { CSSProperties } from 'react'
import 'animate.css';
import { BiEditAlt, BiBarChartAlt, BiHappyAlt } from 'react-icons/bi';

const FinishPage = ({ email }: { email: string }) => {
  const container: CSSProperties = {

    display: 'flex',
    flexDirection: "column",
    // justifyContent: "space-evenly",
    alignItems: "center",
    background: "white",
    height: "100vh"
  }

  const title: CSSProperties = {
    width: '100%',
    textAlign: 'left',
    font: "normal 600 2rem 'Noto Sans KR'",
    marginBottom: '1rem'
  }

  const leftBox: CSSProperties = {
    borderTopLeftRadius: '10px',
    borderBottomLeftRadius: '10px'
  }

  const rightBox: CSSProperties = {
    borderTopRightRadius: '10px',
    borderBottomRightRadius: '10px'
  }

  const item: CSSProperties = {
    display: 'flex',
    flexDirection: "column",
    justifyContent: "start",
    width: '100%',
    height: "50vh",
    padding: '4rem 1rem',
    backgroundColor: '#eee',
    borderRadius: '10px',
    textAlign: 'center',
    font: "normal 400 1.2rem 'Noto Sans KR'",
    position: 'relative'
  }

  const emphasize: CSSProperties = {
    fontWeight: 600
  }

  return (
    <div style={container}>
      <div style={title}>축하합니다! <br /> 회원 가입을 완료했어요.</div>
      <div className="ui mini unstackable steps" style={{ margin: '0 auto 1rem', borderRadius: '10px', width: '100%' }}>
        <div className="disabled step" style={leftBox}>
          <BiEditAlt size='2rem' style={{ marginRight: '0.25rem' }} />
          <div className="content">
            <div className="title">작성</div>
          </div>
        </div>
        <div className="disabled step">
          <BiBarChartAlt size='2rem' style={{ marginRight: '0.25rem' }} />
          <div className="content">
            <div className="title">BMR</div>
          </div>
        </div>
        <div className="active step" style={rightBox}>
          <BiHappyAlt size='2rem' style={{ marginRight: '0.25rem' }} />
          <div className="content">
            <div className="title">완료</div>
          </div>
        </div>
      </div>

      <div style={item}>
        <span style={emphasize}>{email}</span>로
        <br />
        인증 메일을 보냈습니다.
        <br />
        이메일을 확인하세요!
        <img className='animate__animated animate__tada' src='/clap.png' style={{ width: '54%', position: 'absolute', bottom: '10%', right: '10%' }} />
      </div>
    </div>
  )
}

export default FinishPage
