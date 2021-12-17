import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io-client';
import { BACKGROUND_COLOR, FLEXBOX_NORMAL, MAIN_COLOR, MIDDLE_COLOR } from '../../constants';
import { LiveData } from '../../models';

const Chat = ({ liveData, socket, name, largeMode, setLargeMode }: { liveData: LiveData[], socket: Socket, name: string, largeMode: boolean, setLargeMode: Function }) => {
  const chatRoom = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>

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
      <form onSubmit={(e) => { e.preventDefault() }} style={{ border: "2px solid", borderRadius: "20px", borderColor: MIDDLE_COLOR, padding: "6px", }} >
        <div style={{ display: 'flex', flexDirection: "column", overflowY: "scroll", height: largeMode ? "16vh" : "40px", fontSize: '0.85em', transition: "all 500ms" }} ref={chatRoom} >
          {liveData.map((data, index) =>
          (<div style={{ display: 'flex', justifyContent: "space-between", transition: "all 500ms", color: "black" }} key={index}>
            <span style={{ fontWeight: data.name === "Admin" ? 700 : 400, borderRadius: "5px", padding: "0px 2px" }}>{data.name} : {data.message}</span>
          </div>)
          )}
        </div>
        <div style={{ ...FLEXBOX_NORMAL, justifyContent: "space-around", padding: "5px", display: largeMode ? "flex" : "none", }}>
          <input type="text" placeholder="메시지 입력!" style={{ borderColor: MIDDLE_COLOR, height: "2em", borderRadius: "10px", padding: "5px" }} />
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

          }} style={{ border: 0, background: MAIN_COLOR, borderRadius: "10px", padding: "5px 10px", fontWeight: 700, color: "whitesmoke" }}>전송</button>
        </div>

      </form >



    </>
  )
}

export default Chat
