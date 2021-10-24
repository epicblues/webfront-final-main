
import { GetServerSidePropsContext, NextPage } from 'next'
import { MutableRefObject, useRef } from 'react'


import styles from '../styles/Home.module.css'


const sample: NextPage<any> = () => {

  const paragraphRef = useRef() as MutableRefObject<HTMLParagraphElement>

  const handleClick = async () => {
    const res = await fetch('/api/sample');
    const data = await res.json(); // res.json() 을 통해 {food : 음식 데이터}라는 객체를 얻는다.

    paragraphRef.current.innerHTML = data.food["식품명"];
  }

  return (
    <div className={styles.container}>
      <p ref={paragraphRef}>버튼을 클릭하세요!</p>
      <button onClick={handleClick}>음식 정보 가져오기</button>
    </div>
  )
}




export default sample
