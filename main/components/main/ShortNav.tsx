import { MutableRefObject, useEffect, useRef } from 'react'
import mainStyle from '../../styles/main/Main.module.css'
interface Props {
  show?: boolean
}

const ShortNav: React.FC<Props> = () => {
  const nav = useRef() as MutableRefObject<HTMLDivElement>
  const back = useRef() as MutableRefObject<HTMLDivElement>

  useEffect(() => {
    setTimeout(() => {
      if (!back.current || !nav.current) return;
      back.current.style.opacity = '0'
      nav.current.style.display = 'none'
      back.current.style.zIndex = '-100'
    }, 2500)
  }, [])

  return (
    <>
      <div className={mainStyle.shortNav} ref={nav}>
        <p>버튼을 클릭해서<br/>컨텐츠를 작성해보세요!</p>        
        <div className={mainStyle.pulse}></div>
        <div className={mainStyle.tab}></div>
      </div>
      <div className={mainStyle.shortBack} ref={back} />
    </>
  )
}

export default ShortNav
