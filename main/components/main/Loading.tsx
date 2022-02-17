import React, { MutableRefObject, useEffect, useLayoutEffect, useRef } from 'react'
import Image from 'next/dist/client/image'
import image from '../../public/static/logos/main_03.jpg'
import mainStyle from '../../styles/main/Main.module.css';

const comments = ["간식 참는 중", "야채 사러 가는 중", "라면 다시 집어 넣는 중"]

const addDots = async (textArea: Element, numberOfDots: number, ms: number) => {
  if (numberOfDots === 0) return;
  setTimeout(() => {
    if (!textArea) throw new Error("no element")
    textArea.textContent += ".";
    addDots(textArea, numberOfDots - 1, ms);

  }, ms)

}

const Loading = () => {
  const comment = comments[Math.floor(Math.random() * comments.length)];
  useEffect(() => {
    const textArea = loadingTheme.current!.children[1]
    addDots(textArea, 6, 150)

    const timer1 = setTimeout(() => {
      loadingTheme.current!.style.opacity = "0"
      setTimeout(() => {
        if (loadingTheme.current)
          loadingTheme.current.style.display = "none"
      }, 1300)
    }, 2000)

    return () => {
      clearTimeout(timer1)
    }
  }, [])

  const loadingTheme = useRef<HTMLDivElement>(null)
  return (
    <div className={mainStyle.loadingTheme} ref={loadingTheme}>
      <div className={mainStyle.loadingCircle} />
      <div className={mainStyle.loadingComment}>{comment}</div>
      <Image src={image} alt="loading-theme" />

    </div>

  )
}

export default Loading
