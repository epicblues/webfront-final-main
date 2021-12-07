import React, { CSSProperties, LegacyRef, MouseEventHandler, MutableRefObject, useRef, useState } from 'react'
import { checkValid } from '../../util/auth';
import Bmr, { UserBmr } from '../../components/user/Bmr'
import axios from 'axios';
import { Button, Form, Header, Input, Label } from 'semantic-ui-react';
import { NextRouter, useRouter } from 'next/router';
import FinishPage from '../../components/user/FinishPage';




const Join = () => {
  const router = useRouter();
  const email = useRef() as MutableRefObject<HTMLInputElement>;
  const password = useRef() as MutableRefObject<HTMLInputElement>;
  const confirmPassword = useRef() as MutableRefObject<HTMLInputElement>;

  const name = useRef() as MutableRefObject<HTMLInputElement>;
  const message = useRef() as MutableRefObject<HTMLHeadingElement>;
  const [userBmr, setUserBmr] = useState<UserBmr>({
    gender: "1",
    weight: "",
    age: "",
    activity: "",
    bmr: "",
    error: "",
    flag: false,
    system: "",
    heightFeet: ""
  })
  const [joinFinished, setJoinFinished] = useState(false);

  const changeButtonStyle = (button: HTMLButtonElement, message: string) => {
    const originalBtnText = button.textContent;
    button.textContent = message
    button.style.backgroundColor = "red"
    button.disabled = true;

    setTimeout((target: HTMLButtonElement, text: string) => {
      target.textContent = text
      target.style.backgroundColor = "#00b5ad"
      target.disabled = false;

    }, 2000, button, originalBtnText);
  }

  const [bmrMode, setBmrMode] = useState(false);

  const toggleJoinForm: MouseEventHandler<HTMLButtonElement> = (event) => {
    const $button = event.currentTarget;

    if (!(email.current.disabled && name.current.disabled)) {
      changeButtonStyle($button, "전부 입력해야 합니다.")
      name.current.focus();
      return;
    }

    if (!/^.{6,}$/.test(password.current.value)) {
      changeButtonStyle($button, "비밀번호는 최소 6글자 이상이어야 합니다.")
      password.current.focus();
      return;
    }

    if (password.current.value !== confirmPassword.current.value) {
      changeButtonStyle($button, "비밀번호가 일치하지 않습니다.")
      confirmPassword.current.focus();
      return
    }

    setBmrMode(true);
  }
  const buttonStyle: CSSProperties = { alignSelf: "stretch", marginTop: "10px", border: "0", background: "#00b5ad", padding: "10px", borderRadius: "10px", fontWeight: 700, color: "whitesmoke", transition: "all 300ms" }

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (event) => {

    const bmrToSend: Partial<UserBmr> = { ...userBmr, error: '', flag: false, system: "" };

    if (bmrToSend.activity as number < 5) {
      setUserBmr({ ...userBmr, error: "기초 대사량 작성 완료해주세요!" })
      return;
    }
    const { data: result } = await axios.post("/api/user/join",
      {
        email: email.current?.value,
        password: password.current?.value,
        name: name.current?.value,
        bmr: bmrToSend,
        type: 'normal'
      }
    )
    if (result.status === "OK") {
      setTimeout((router: NextRouter) => {
        router.push('/user/login')
      }, 5000, router)
      setJoinFinished(true);
    }
    else {
      const status = JSON.parse(result.status);
      email.current.value = '';
      password.current.value = '';
      name.current.value = '';
    }
  }

  const emailCheck: MouseEventHandler<HTMLButtonElement> = async (event) => {
    const $button = event.currentTarget

    if (!/^[A-Za-z0-9]{3,}@([a-z0-9]+\.)+[a-z]{2,4}$/.test(email.current.value)) {
      changeButtonStyle($button, "이메일 주소를 잘못 입력하셨습니다.")
      email.current.focus();
      return;
    }
    const { data } = await axios.post('/api/user/email', { email: email.current.value });
    if (data.message) {
      email.current.disabled = true;
      $button.textContent = "사용 가능한 이메일입니다."
      $button.style.backgroundColor = "lightgreen"
      email.current.style.borderColor = "green"
      email.current.style.color = "black"
    } else {
      // event 변수는 이 함수가 끝나면 사라진다. 따라서 추가적으로 button의 주소를 묶어둬야 한다?
      changeButtonStyle($button, "이미 가입된 이메일입니다");
    }



  }
  const nameCheck: MouseEventHandler<HTMLButtonElement> = async (event) => {
    const $button = event.currentTarget

    if (!/^[가-힣a-zA-Z]{2,12}$/.test(name.current.value)) {
      changeButtonStyle($button, "숫자, 특수문자 입력 불가(12자 이내)")
      name.current.focus();
      return;
    }
    const { data } = await axios.post('/api/user/name', { name: name.current.value });
    if (data.message) {
      name.current.disabled = true;
      $button.textContent = "사용 가능한 닉네임입니다."
      $button.style.backgroundColor = "lightgreen"
      name.current.style.borderColor = "green"
      name.current.style.color = "black"
    } else {
      // event 변수는 이 함수가 끝나면 사라진다. 따라서 추가적으로 button의 주소를 묶어둬야 한다?
      changeButtonStyle($button, "이미 존재하는 닉네임입니다");
    }

  }

  return (

    <div style={{
      display: 'flex', flexDirection: 'row', alignItems: "stretch", width: "300vw",
      // border: "solid 2px lightgray",
      // borderRadius: "5px",

      fontFamily: "-moz-initial",


    }}>
      <div style={{ display: "flex", flexDirection: 'column', transition: "all 500ms", transform: bmrMode ? "translate(-100vw,0)" : "none", width: "100vw", padding: "5vw" }}>
        <Form  >
          <h2 ref={message} style={{ textAlign: "center" }}>회원 가입</h2>
          <Form.Field>
            <h3>닉네임</h3>
            <input type="text" ref={name} placeholder="이름" />
            <button style={buttonStyle} onClick={nameCheck}>이름 중복 확인</button>
          </Form.Field>

          <Form.Field>
            <h3>이메일</h3>
            <input type="email" ref={email} placeholder="이메일" />
            <button style={buttonStyle} onClick={emailCheck}>이메일 중복 확인</button>
          </Form.Field>

          <Form.Field>
            <h3>비밀번호</h3>
            <input type="password" ref={password} placeholder="비밀번호" />
          </Form.Field>

          <Form.Field>
            <h3>비밀번호 확인</h3>
            <input type="password" ref={confirmPassword} placeholder="비밀번호 확인" />
          </Form.Field>
        </Form>
        <button style={buttonStyle} onClick={toggleJoinForm}>BMR 작성하기</button>
      </div>
      <div style={{ display: "flex", flexDirection: 'column', width: "100vw", padding: "5vw", transition: "all 500ms", transform: bmrMode ? "translate(-100vw,0)" : "none" }}>
        <Bmr userBmr={userBmr} setUserBmr={setUserBmr} />
        <button style={buttonStyle} onClick={handleClick}>제출</button>
      </div>
      <div style={{ width: "100vw", padding: "5vw", transition: "all 500ms", transform: joinFinished ? "translate(-200vw,0)" : "none" }}>

        <FinishPage email={email.current?.value || ""} />
      </div>
    </div>

  )
}

export default Join
