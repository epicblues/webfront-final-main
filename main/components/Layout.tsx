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
import { BiDish, BiEditAlt, BiTrophy, BiUser } from "react-icons/bi";
import { LoadingProps, useLoading } from '../hooks'

const Layout: FunctionComponent<{ pageProps: any }> = ({ children, pageProps }) => {
  const [menuModal, setMenuModal] = useState(false)
  const [loading, setLoading, LoadingCircle] = pageProps.loadingProps as LoadingProps;



  return (
    // 모든 페이지에 적용될 레이아웃 디자인 (Header Or Footer)
    <>
      <div style={{ marginTop: '3vh', paddingBottom: '70px', }} >
        {children}
      </div>

      <footer className={footerNavStyles.footerWrap} style={!pageProps.user ? { boxShadow: "0px 0px 0px 0px" } : undefined}>
        {pageProps.user ?
          <div className={footerNavStyles.navWrap}>
            <MiniButton href="/recipe" onClick={() => { setLoading(true); setMenuModal(false) }}>
              <BiDish size='1.5rem' />
              <p>레시피</p>
            </MiniButton>

            <MiniButton href="/diary" onClick={() => { setLoading(true); setMenuModal(false) }}>
              <BiEditAlt size='1.5rem' />
              <p>다이어리</p>
            </MiniButton>

            <ModalButton onClick={() => { setMenuModal(!menuModal) }}>
              <div className={footerNavStyles.menuBtn}>
                <div className={footerNavStyles.imgContainer}>
                  <Image src={AppIcon} layout="responsive" objectFit="contain" alt="Main Icon"></Image>

                </div>
                {/* <p>메뉴</p> */}
              </div>
            </ModalButton>

            <MiniButton href="/challenge" onClick={() => { setLoading(true); setMenuModal(false) }}>
              <BiTrophy size='1.5rem' />
              <p>챌린지</p>
            </MiniButton>

            <MiniButton href="/" onClick={() => { setLoading(true); setMenuModal(false) }}>
              <BiUser size='1.5rem' />
              <p>리포트</p>
            </MiniButton>
          </div>
          : (<div className={footerNavStyles.navWrap} style={{ background: "white", height: "6vh" }} />
          )}
      </footer>
      <MenuModal setLoading={setLoading} hidden={!menuModal} onExit={() => { setMenuModal(false) }} />

      <LoadingCircle style={{
        position: "fixed",
        top: "40vh",
        left: "45vw",
      }} />


    </ >
  )
}

export default Layout
