import { useRouter } from 'next/dist/client/router'
import React, { FunctionComponent, LegacyRef, UIEventHandler, useRef, useState } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { TextArea } from 'semantic-ui-react'
import MenuModal from './main/MenuModal'
import ModalButton from './main/ModalButton'

import Image from "next/dist/client/image";
import AppIcon from '../public/static/logos/logo04.png'

import MiniButton from './main/NavButton'

import footerNavStyles from '../styles/main/FooterNav.module.css';
import mainStyles from '../styles/main/Main.module.css'

import { BiDish, BiEditAlt, BiTrophy, BiUser } from "react-icons/bi";

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

      <div style={{ marginTop: '3vh', paddingBottom: '70px', }} onScroll={e => console.log(e)}>
        {children}
      </div>

      <footer className={footerNavStyles.footerWrap} style={!pageProps.user ? { boxShadow: "0px 0px 0px 0px" } : undefined}>
        {pageProps.user ?
          <div className={footerNavStyles.navWrap}>
            <MiniButton href="/recipe">
              <BiDish size='1.5rem' />
              <p>레시피</p>
            </MiniButton>

            <MiniButton href="/diary">
              <BiEditAlt size='1.5rem' />
              <p>다이어리</p>
            </MiniButton>

            <ModalButton onClick={() => { setMenuModal(!menuModal) }}>
              <div className={footerNavStyles.menuBtn}>
                <div className={footerNavStyles.imgContainer}>
                  <Image src={AppIcon} layout="responsive" objectFit="contain"></Image>

                </div>
                {/* <p>메뉴</p> */}
              </div>
            </ModalButton>

            <MiniButton href="/challenge" >
              <BiTrophy size='1.5rem' />
              <p>챌린지</p>
            </MiniButton>

            <MiniButton href="/">
              <BiUser size='1.5rem' />
              <p>리포트</p>
            </MiniButton>
          </div>
          : (<div className={footerNavStyles.navWrap} style={{ background: "white", height: "6vh" }}>

          </div>
          )}

      </footer>
      <MenuModal hidden={!menuModal} onExit={() => { setMenuModal(false) }} />



    </ >
  )
}

export default Layout
