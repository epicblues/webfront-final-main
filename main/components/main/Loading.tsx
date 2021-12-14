import React, { MutableRefObject, useEffect, useRef } from 'react'
import Image from 'next/dist/client/image'
import image from '../../public/static/logos/main_02.jpg'
import mainStyle from '../../styles/main/Main.module.css';


const Loading = () => {
  useEffect(() => {
    const timer1 = setTimeout(() => {
      loadingTheme.current.style.opacity = "0"
      const timer2 = setTimeout(() => {
        if (loadingTheme.current)
          loadingTheme.current.style.display = "none"
      }, 1300)
    }, 2000)

    return () => {
      clearTimeout(timer1)
    }
  }, [])

  const loadingTheme = useRef() as MutableRefObject<HTMLDivElement>
  return (
    <div className={mainStyle.loadingTheme} ref={loadingTheme}>
      <div className={mainStyle.loadingDots}></div>
      <div className={mainStyle.loadingDots}></div>
      <div className={mainStyle.loadingDots}></div>

      <Image src={image} alt="loading-theme" />

    </div>

  )
}

export default Loading
