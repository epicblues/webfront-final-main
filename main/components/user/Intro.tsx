import React, { CSSProperties } from 'react'
import { Button } from 'semantic-ui-react'

const Intro = ({ handleClick }: { handleClick: Function }) => {

  const container: CSSProperties = {
    display: 'flex',
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "20px",
    minHeight: "50vh"


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
      <h3>
        요리와 건강을 모두 챙겨봅시다!
      </h3>

      <div style={item}>
        <h3>Recipe</h3>
        <div>🍖 레시피를 작성하고 회원들과 공유할 수 있습니다.</div>
        <h3>Diary</h3>
        <div>💪 먹은 음식의 영양 성분을 기록할 수 있습니다. </div>
        <h3>Challenge</h3>
        <div>⌛️ &nbsp;&nbsp;보다 능동적인 건강관리를 할 수 있습니다.</div>
      </div>



      <button style={{ paddingLeft: "5px", paddingRight: "10px", backgroundColor: "#00b5ad", fontWeight: "bolder", borderRadius: "5px", color: "white", boxShadow: "none", border: "none", alignSelf: "stretch", height: "30px", marginTop: "10px" }} onClick={() => { handleClick() }}>참여하기</button>
    </div>
  )
}

export default Intro
