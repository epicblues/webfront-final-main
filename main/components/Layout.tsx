import { useRouter } from 'next/dist/client/router'
import React, { FunctionComponent, LegacyRef, UIEventHandler, useRef, useState } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { TextArea } from 'semantic-ui-react'
import MenuModal from './main/MenuModal'
import ModalButton from './main/ModalButton'


import MiniButton from './main/NavButton'




const Layout: FunctionComponent<{ pageProps: any }> = ({ children, pageProps }) => {
  const [menuModal, setMenuModal] = useState(false)

  return (
    // 모든 페이지에 적용될 레이아웃 디자인 (Header Or Footer)
    <>

      {/* <div style={{ height: "40px", display: "flex", justifyContent: "space-between", background: "#fff", padding: '0 0 6px 0', boxShadow: '1px 1px 3px 1px #dadce0' }}>
        {pageProps.user
          ?
          (<>
            <button onClick={(e) => { e.currentTarget.innerHTML = "&copy; 강래헌, 김민성, 조은혜, 박지훈"; e.currentTarget.classList.toggle("instagram"); }} style={{ paddingLeft: "5px", paddingRight: "10px", backgroundColor: "#00b5ad", fontWeight: "bolder", borderRadius: "5px", color: "white", boxShadow: "none", border: "none" }} > &copy;요건 다 내꺼</button>
            <button className="ui button facebook" onClick={clickHandler}>Logout</button>
          </>)
          :
          <button onClick={(e) => { e.currentTarget.innerHTML = "강래헌, 김민성, 조은혜, 박지훈"; e.currentTarget.classList.toggle("instagram"); }} style={{ paddingLeft: "5px", paddingRight: "10px", backgroundColor: "#00b5ad", fontWeight: "bolder", borderRadius: "5px", color: "white", boxShadow: "none", border: "none" }} > &copy; 요건 다 내꺼</button>}

      </div> */}

      <div style={{ marginTop: '3vh', paddingBottom: '70px' }} onScroll={e => console.log(e)}>
        {children}
      </div>

      <footer style={{

        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "space-around",
        width: "100vw",
        position: "fixed",
        left: "0",
        bottom: "0",
        textAlign: 'center',
        padding: '6px 0 0 0',
        boxShadow: '1px 1px 3px 1px #dadce0',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        zIndex: 20
      }} >
        {pageProps.user &&
          <>
            <MiniButton href="/recipe">
              <i className='book icon'></i>
              <p>Recipe</p>
            </MiniButton>
            <MiniButton href="/diary">
              <i className='utensils icon'></i>
              <p>Diary</p>
            </MiniButton>
            <ModalButton onClick={() => { setMenuModal(!menuModal) }}>
              <i className='dot circle icon'></i>
              <p>Menu</p>
            </ModalButton>
            <MiniButton href="/challenge" >
              <i className='thumbs up icon'></i>
              <p>Challenge</p>
            </MiniButton>
            <MiniButton href="/">
              <i className='user icon'></i>
              <p>User</p>
            </MiniButton>
          </>
        }
      </footer>
      {menuModal &&
        <MenuModal onExit={() => { setMenuModal(false) }} />
      }

    </ >
  )
}

export default Layout
