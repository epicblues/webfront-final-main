import { useRouter } from 'next/dist/client/router'
import React, { FunctionComponent, LegacyRef, UIEventHandler, useRef } from 'react'
import 'semantic-ui-css/semantic.min.css'


import MiniButton from './main/NavButton'




const Layout: FunctionComponent<{ pageProps: any }> = ({ children, pageProps }) => {
  const router = useRouter()
  const clickHandler = async () => {
    const res = await fetch('/api/user/logout');
    if (res.status === 200) {
      router.push('/user/login')
    }
  }






  return (
    // 모든 페이지에 적용될 레이아웃 디자인 (Header Or Footer)
    <>


      <div style={{ height: "40px", display: "flex", justifyContent: "space-between", background: "black", padding: "3px" }}>
        {pageProps.user
          ?
          (<>

            <button onClick={(e) => { e.currentTarget.innerHTML = "&copy; 강래헌, 김민성, 조은혜, 박지훈"; e.currentTarget.classList.toggle("instagram"); }} style={{ paddingLeft: "5px", paddingRight: "10px", backgroundColor: "#00b5ad", fontWeight: "bolder", borderRadius: "5px", color: "white", boxShadow: "none", border: "none" }} > &copy;요건 다 내꺼</button>
            <button className="ui button facebook" onClick={clickHandler}>Logout</button>



          </>)
          :
          <button onClick={(e) => { e.currentTarget.innerHTML = "강래헌, 김민성, 조은혜, 박지훈"; e.currentTarget.classList.toggle("instagram"); }} style={{ paddingLeft: "5px", paddingRight: "10px", backgroundColor: "#00b5ad", fontWeight: "bolder", borderRadius: "5px", color: "white", boxShadow: "none", border: "none" }} > &copy; 요건 다 내꺼</button>}

      </div>

      <div style={{ marginTop: "10px" }} onScroll={e => console.log(e)}>
        {children}
      </div>



      <div style={{ height: "5vh" }}></div>
      <footer style={{
        marginTop: "10px",
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        alignContent: "flex",
        alignItems: "stretch",
        height: "5vh",
        width: "100vw",
        position: "fixed",
        top: "94vh"
      }} >

        <MiniButton href="/recipe">
          Recipe
        </MiniButton>


        <MiniButton href="diary">
          Diary
        </MiniButton>


        <MiniButton href="recipe">
          Challenge
        </MiniButton>

        <MiniButton href="/">
          User
        </MiniButton>


      </footer>


    </ >
  )
}

export default Layout
