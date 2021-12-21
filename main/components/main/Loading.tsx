import React, { MutableRefObject, useEffect, useLayoutEffect, useRef } from 'react'
import Image from 'next/dist/client/image'
import image from '../../public/static/logos/main_03.jpg'
import mainStyle from '../../styles/main/Main.module.css';

const comments = ["간식 참는 중", "야채 사러 가는 중", "라면 다시 집어 넣는 중"]

const addDots = (textArea: HTMLDivElement) =>
  new Promise<HTMLDivElement>((resolve, reject) => {
    setTimeout(() => {
      if (!textArea) reject(new Error("no element"))
      textArea.textContent += ".";
      resolve(textArea);
    }, 150)
  })

const Loading = () => {
  const comment = comments[Math.floor(Math.random() * comments.length)];
  useEffect(() => {
    const textArea = loadingTheme.current.children[1] as HTMLDivElement;
    addDots(textArea)
      .then(addDots)
      .then(addDots)
      .then(addDots)
      .then(addDots)
      .then(addDots)
      .catch();
    const timer1 = setTimeout(() => {
      loadingTheme.current.style.opacity = "0"
      setTimeout(() => {
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
      <div className={mainStyle.loadingCircle} />
      <div className={mainStyle.loadingComment}>{comment}</div>
      <Image src={image} alt="loading-theme" />

    </div>

  )
}

export default Loading
