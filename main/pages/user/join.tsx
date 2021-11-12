import React, { LegacyRef, MutableRefObject, useRef, useState } from 'react'
import { checkValid } from '../../util/auth';
import Bmr, { UserBmr } from '../../components/user/Bmr'
import axios from 'axios';
import { Button, Form, Header, Input, Label } from 'semantic-ui-react';



const join = () => {

  const email = useRef() as MutableRefObject<HTMLInputElement>;
  const password = useRef() as MutableRefObject<HTMLInputElement>;
  const confirmPassword = useRef() as MutableRefObject<HTMLInputElement>;

  const name = useRef() as MutableRefObject<HTMLInputElement>;
  const message = useRef() as MutableRefObject<HTMLHeadingElement>;
  const [userBmr, setUserBmr] = useState({
    gender: "1",
    weight: 0,
    age: 0,
    activity: 0,
    bmr: 0,
    error: "",
    flag: false,
    system: "",
    heightFeet: 0
  })

  const handleClick = async () => {
    const bmrToSend: Partial<UserBmr> = { ...userBmr, error: '', flag: false, system: "" };

    if (!(checkValid(email.current.value, password.current.value, name.current.value))) {
      message.current.textContent = "전부 입력해야 합니다."
      message.current.style.color = "red";
      email.current.focus();
      return;
    }

    if (bmrToSend.activity as number < 5) {
      setUserBmr({ ...userBmr, error: "기초 대사량 작성 완료해주세요!" })
      return;
    }

    if (password.current.value !== confirmPassword.current.value) {
      message.current.textContent = "비밀 번호가 일치하지 않습니다."
      message.current.style.color = "red";
      password.current.focus();
      return
    }

    const { data: result } = await axios.post("/api/user/join",

      {
        email: email.current?.value,
        password: password.current?.value,
        name: name.current?.value,
        bmr: bmrToSend
      }
    )
    if (result.status === "OK") location.href = "login"
    else {
      const status = JSON.parse(result.status);
      message.current.innerHTML = status.index === 0 ? "중복되는 이메일입니다" : "잘못 입력하셨습니다"
      email.current.value = '';
      password.current.value = '';
      name.current.value = '';
    }
  }

  return (

    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: "stretch",
      border: "solid 2px lightgray",
      borderRadius: "5px",
      padding: "16px",
    }}>
      <Form  >
        <h2 ref={message}>회원 가입</h2>
        <Form.Field>
          <h3>이름</h3>
          <input type="text" ref={name} placeholder="이름" />

        </Form.Field>

        <Form.Field>

          <h3>이메일</h3>
          <input type="email" ref={email} placeholder="이메일" />
        </Form.Field>
        <Form.Field>
          <h3>비밀번호</h3>
          <input type="password" ref={password} placeholder="비밀번호" /></Form.Field>
        <Form.Field>
          <h3>비밀번호 확인</h3>
          <input type="password" ref={confirmPassword} placeholder="비밀번호 확인" /></Form.Field>
        <Bmr userBmr={userBmr} setUserBmr={setUserBmr} />
        <button className="ui button" onClick={handleClick}>제출</button>
      </Form>


    </div>

  )
}

export default join
