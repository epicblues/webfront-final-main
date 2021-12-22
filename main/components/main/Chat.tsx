import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io-client';
import { BACKGROUND_COLOR, FLEXBOX_NORMAL, MAIN_COLOR, MIDDLE_COLOR } from '../../constants';
import { useLoading } from '../../hooks';
import { LiveData } from '../../models';
import mainStyle from '../../styles/main/Main.module.css';

interface ChatProps {
  liveData: LiveData[];
  socket: Socket;
  name: string;
  largeMode: boolean;
  setLargeMode: Function
}


const Chat = ({ liveData, socket, name, largeMode, setLargeMode }: ChatProps) => {
  const chatRoom = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>
  // component did update 느낌으로 사용해볼까?
  const [loading, setLoading, LoadingCircle] = useLoading(liveData);
  // liveData가 fetch를 통해 state를 변화하면(비동기) setLoading(false)작동

  useEffect(() => {
    setLoading(true);
  }, [])
  // 동기적으로 component가 mount 됐을 때만 작동하는 loading

  useEffect(() => {
    const chatRoomCur = chatRoom.current
    chatRoomCur.scroll({ top: 10000 });// 컴포넌트가 state/props로 변화되고 '나서' 특정 element를 제어할 수 있다.
    const lastLine = (chatRoomCur.lastElementChild as HTMLDivElement) // 처음 렌더링될 때는 socket 연결 전이라 child가 없다.
    if (lastLine) {
      lastLine.style.color = "red"
      setTimeout((lastLine) => {
        lastLine.style.color = "black"
      }, 5000, lastLine)
    }
    if (!largeMode) setTimeout(() => chatRoomCur.scroll({ top: 10000 }), 500) // 축소 애니메이션이 끝난 뒤에 채팅창 스크롤을 최대한 아래로
  })

  return (
    <>
      <form onSubmit={(e) => { e.preventDefault() }} style={{ padding: "0 0 1rem 1rem", width: '100vw'}} >
        <div style={{ display: 'flex', flexDirection: "column", height: "60vh", overflowY: "scroll", overflowX: "hidden" }} ref={chatRoom} >
          {liveData.map((data, index) =>
          (<div style={{ display: 'flex', justifyContent: "space-between", transition: "all 500ms", color: "black" }} key={index}>
            <span style={{ fontWeight: data.name === "Admin" ? 700 : 400, width: "100%" }}>{data.name} : {data.message}</span>
          </div>)
          )}
        </div>
        {/* <LoadingCircle style={{ position: "relative", left: "40%" }} /> */}

        {/* 입력 컴포넌트 */}
        <div className={mainStyle.sendWrap} >
          <input type="text" placeholder="메시지를 입력하세요." className={mainStyle.sendInput} maxLength={30} />
          <button onClick={(event) => {
            const $btn = event.currentTarget;
            const $input = $btn.previousElementSibling as HTMLInputElement;
            if ($input.value.trim().length === 0) {
              $input.placeholder = "공백입력 불가"
              $input.focus()
              return;
            }
            if (/\<script\>/.test($input.value.trim())) {
              $input.placeholder = "<script> 입력 불가";
              $input.focus();
              $input.value = '';
              return;
            }
            socket?.emit('chat', { name, message: $input.value });
            $input.value = '';

          }}
          className={mainStyle.sendButton}
          >전송</button>
        </div>

      </form >
    </>
  )
}

export default Chat
