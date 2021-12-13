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
      back.current.style.opacity = '0'
      nav.current.style.display = 'none'
    }, 2500)
  }, [])
  return (
    <>
      <div className={mainStyle.shortNav} ref={nav}>
        버튼을 클릭해서 컨텐츠를 작성해보세요!
      </div>
      <div className={mainStyle.shortBack} ref={back} />

    </>
  )
}

export default ShortNav
