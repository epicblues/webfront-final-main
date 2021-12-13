import axios from 'axios';
import { GetServerSideProps } from 'next'
import { NextRouter, useRouter } from 'next/router';
import React, { CSSProperties, MouseEventHandler, MutableRefObject, useRef, useState } from 'react'
import Bmr from '../../../components/user/Bmr'
import { FLEXBOX_NORMAL, MAIN_COLOR, MIDDLE_COLOR } from '../../../constants';
import { UserBmr } from '../../../models';

const Join = ({ email, type }: { email: string, type: string }) => {
  const router = useRouter()
  const name = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>
  const [bmrMode, setBmrMode] = useState(false);
  const [userBmr, setUserBmr] = useState<UserBmr>(new UserBmr())
  const handleClick: MouseEventHandler<HTMLButtonElement> = async (event) => {
    const $button = event.currentTarget
    const bmrToSend: Partial<UserBmr> = { ...userBmr, error: '', flag: false, system: "" };

    if (bmrToSend.activity as number < 5) {
      setUserBmr({ ...userBmr, error: "기초 대사량 작성 완료해주세요!" })
      return;
    }
    const { data: result } = await axios.post("/api/user/join",
      {
        email,
        name: name.current?.value,
        type,
        bmr: bmrToSend
      }
    )
    if (result.status === "OK") {
      changeButtonStyle($button, "성공! 메인 페이지로 이동합니다!");
      router.push('/user/oauth/temp')

    }

  }
  const buttonStyle: CSSProperties = { marginTop: "10px", border: "0", background: MIDDLE_COLOR, padding: "10px", borderRadius: "10px", fontWeight: 700, color: "whitesmoke" }
  const changeButtonStyle = (button: HTMLButtonElement, message: string) => {
    const originalBtnText = button.textContent;
    button.textContent = message
    button.style.backgroundColor = MAIN_COLOR
    button.disabled = true;

    setTimeout((target: HTMLButtonElement, text: string) => {
      target.textContent = text
      target.style.backgroundColor = MIDDLE_COLOR
      target.disabled = false;

    }, 2000, button, originalBtnText);
  }

  const nameCheck: MouseEventHandler<HTMLButtonElement> = async (event) => {
    const $button = event.currentTarget

    if (!/^[가-힣a-zA-Z]{2,12}$/.test(name.current.value)) {
      changeButtonStyle($button, "숫자 특수문자 공백 X")
      name.current.focus();
      return;
    }
    const { data } = await axios.post('/api/user/name', { name: name.current.value });
    if (data.message) {
      name.current.disabled = true;
      $button.textContent = "사용 가능한 닉네임입니다."
      $button.style.backgroundColor = "lightgreen"
      name.current.style.color = "white"
      name.current.style.textAlign = "center"
      name.current.style.borderStyle = "hidden"
      name.current.style.background = "lightgreen"
      name.current.style.fontWeight = "700"
      setTimeout(() => {
        setBmrMode(true);
      }, 1500)
    } else {
      // event 변수는 이 함수가 끝나면 사라진다. 따라서 추가적으로 button의 주소를 묶어둬야 한다?
      changeButtonStyle($button, "이미 존재하는 닉네임입니다");
    }

  }
  return (
    <div style={{ ...FLEXBOX_NORMAL, width: "200vw", transition: "all 500ms", transform: bmrMode ? "translateX(-100vw)" : "translateX(0)", justifyContent: "space-between" }}>
      <form onSubmit={(e) => { e.preventDefault() }} style={{ width: "100vw", padding: "10px", fontSize: "1.7em", paddingTop: "20vh", display: "flex", flexDirection: "column", justifyContent: 'space-between', alignItems: "center" }}>
        <div>닉네임을 입력해주세요</div>
        <input type="text" style={{ padding: "10px 15px", borderRadius: "20px", borderStyle: "hidden", background: MIDDLE_COLOR, textAlign: 'center', color: "white" }} ref={name} />
        <button style={{ ...buttonStyle, padding: "10px 40px", transition: "all 500ms" }} onClick={nameCheck}>확인</button>
      </form>
      <div style={{ width: "100vw", paddingTop: "5vw", display: 'flex', flexDirection: "column" }}>
        <Bmr userBmr={userBmr} setUserBmr={setUserBmr} />
        {userBmr.activity > 1000 &&
          <button style={{ ...buttonStyle, padding: "10px 40px", transition: "all 500ms" }} onClick={handleClick} >제출</button>

        }
      </div>
    </div>
  )
}


export const getServerSideProps: GetServerSideProps<any> = async (ctx) => {
  console.log(ctx.query)
  if (!ctx.req.cookies || !ctx.query.type || !ctx.query.email) ctx.res.writeHead(302, {
    Location: "/user/login",
  }).end(); // Oauth 검증을 받은 cookie를 들고 있지 않을 경우;(Google의 경우 remember-me)




  return { props: { email: ctx.query.email, type: ctx.query.type } }
}


export default Join
