import React, { MutableRefObject, useEffect, useRef } from 'react'
import { BiChat } from 'react-icons/bi'
import { Socket } from 'socket.io-client'
import { LiveData } from '../../models'
import mainStyle from '../../styles/main/Main.module.css'
import { debounce } from '../../util/axios'
interface ChatProps {
  liveData: LiveData[];
  name: string;
  largeMode: boolean;
  setLargeMode: Function
}
const MiniChat: React.FC<ChatProps> = ({ liveData, name, largeMode, setLargeMode }) => {
  const notice = useRef() as MutableRefObject<HTMLDivElement>
  useEffect(() => {
    if (largeMode) return;
    if (liveData.length !== 0) {
      const newData = liveData[liveData.length - 1];
      notice.current.innerHTML = `<div>${newData.name}</div> &nbsp; ${newData.message}`;
      notice.current.style.opacity = '1';
      debounce(() => {
        setTimeout(() => {
          if (!notice.current) return;
          notice.current.style.opacity = '0'

        })
      }, 6000)()
    }
  }, [liveData, largeMode])
  return (


    <div className={mainStyle.miniChat}>
      <div ref={notice} style={{ opacity: largeMode ? "0" : undefined }}>

      </div>
      <div onClick={() => { setLargeMode(!largeMode) }}>
        <BiChat size={"5vh"} />
      </div>
    </div>


  )

}

export default MiniChat
