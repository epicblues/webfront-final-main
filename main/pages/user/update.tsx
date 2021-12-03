import React, { CSSProperties, LegacyRef, MouseEventHandler, MutableRefObject, useEffect, useRef, useState } from 'react'
import { checkValid, getUserOrRedirect } from '../../util/auth';
import Bmr, { UserBmr } from '../../components/user/Bmr'
import axios from 'axios';
import { Button, Form, Header, Input, Label } from 'semantic-ui-react';
import { GetServerSideProps } from 'next';
import clientPromise from '../../util/mongodb';
import formStyle from '../../styles/user/form.module.css'


const Join = ({ user, bmr }: { user: any, bmr: UserBmr }) => {

  const [pageTranslate, setPageTranslate] = useState(0)

  useEffect(() => {
    name.current.value = user.name
  }, [user.name])

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

  const buttonStyle: CSSProperties = { marginTop: "10px", border: "0", background: "#00b5ad", padding: "10px", borderRadius: "10px", fontWeight: 700, color: "whitesmoke" }

  const name = useRef() as MutableRefObject<HTMLInputElement>;
  const message = useRef() as MutableRefObject<HTMLHeadingElement>;
  const password = useRef() as MutableRefObject<HTMLInputElement>;
  const confirmPassword = useRef() as MutableRefObject<HTMLInputElement>;
  const [userBmr, setUserBmr] = useState(
    bmr ? bmr : {
      gender: "1",
      weight: 0,
      age: 0,
      activity: 0,
      bmr: 0,
      error: "",
      flag: false,
      system: "",
      heightFeet: 0
    }
  )

  const handleNickname: MouseEventHandler<HTMLButtonElement> = async (event) => {
    const $button = event.currentTarget
    if (name.current.disabled) {
      name.current.disabled = false;
      $button.textContent = "닉네임 중복 확인"
      name.current.focus();
    } else {
      if (!/^[가-힣a-zA-Z]{2,12}$/.test(name.current.value)) {
        changeButtonStyle($button, "닉네임을 잘못 입력하셨습니다. 숫자, 특수문자 입력 불가(2~12자)")
        name.current.focus();
        return;
      }
      const { data } = await axios.post('/api/user/name', { name: name.current.value });
      if (data.message) {
        name.current.disabled = true;
        name.current.style.backgroundColor = "white"
        $button.textContent = "사용 가능한 닉네임입니다."
        $button.style.backgroundColor = "lightgreen"
        name.current.style.border = "0"
        name.current.style.color = "black"
        name.current.style.fontWeight = "700"
        name.current.style.fontSize = "1.3em"

      } else {
        // event 변수는 이 함수가 끝나면 사라진다. 따라서 추가적으로 button의 주소를 묶어둬야 한다?
        changeButtonStyle($button, "이미 존재하는 닉네임입니다");
        ($button.previousElementSibling as HTMLInputElement).focus();
      }
    }
  }

  const handlePassword: MouseEventHandler<HTMLButtonElement> = async (event) => {
    const $button = event.currentTarget
    if (password.current.hidden) {

      password.current.disabled = false;
      confirmPassword.current.disabled = false;
      password.current.hidden = false;
      confirmPassword.current.hidden = false;
      (confirmPassword.current.previousElementSibling as HTMLElement).hidden = false;
      $button.textContent = "비밀번호 확인"
      password.current.focus();
    } else {
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

      password.current.disabled = true;
      $button.textContent = "사용 가능한 비밀번호입니다."
      $button.style.backgroundColor = "lightgreen"
      password.current.style.borderColor = "green"
      password.current.style.color = "black"
      confirmPassword.current.hidden = true;
      (confirmPassword.current.previousElementSibling as HTMLElement).hidden = true;
      password.current.hidden = true;
      $button.disabled = true;
    }
  }

  const handleClick = async () => {
    const bmrToSend: Partial<UserBmr> = { ...userBmr, error: '', flag: false, system: "" };

    if (!(checkValid(name.current.value))) {
      message.current.textContent = "전부 입력해야 합니다."
      message.current.style.color = "red";

      return;
    }
    if (bmrToSend.activity as number < 5) {
      setUserBmr({ ...userBmr, error: "기초 대사량 작성 완료해주세요!" })
      return;
    }

    const { data: result } = await axios.post("/api/user/update",

      {
        email: user.email,
        password: password.current?.value,
        name: name.current?.value,
        bmr: bmrToSend
      }
    )
    if (result.status === "OK") location.href = "login"
    else {
      const status = JSON.parse(result.status);
      message.current.innerHTML = "잘못 입력하셨습니다."
      name.current.value = '';
    }
  }

  return (

    <div style={{
      display: 'flex', alignItems: "stretch",
      // border: "solid 2px lightgray",
      // borderRadius: "5px",
      // padding: "16px",
      justifyContent: "space-between",
      width: "200vw",
      transition: "0.5s transform", transform: `translateX(${pageTranslate}vw)`,

    }}>
      <div className={formStyle.form} >
        <div style={{ display: 'flex', justifyContent: "space-between", padding: "0px 5px" }} ref={message}>
          <span>회원 정보 수정</span>
          <span onClick={() => { setPageTranslate(-100) }}>다음 &gt;</span>
        </div>
        <div className={formStyle["form-field"]}>
          <h3>닉네임</h3>
          <input type="text" ref={name} placeholder="이름" disabled />
          <button style={buttonStyle} onClick={handleNickname}>닉네임 변경</button>

        </div>
        <div className={formStyle["form-field"]}>
          <h3>비밀번호</h3>
          <input type="password" ref={password} placeholder="비밀번호" disabled hidden />
        </div>
        <div className={formStyle["form-field"]}>
          <h3 hidden>비밀번호 확인</h3>
          <input type="password" ref={confirmPassword} placeholder="비밀번호 확인" disabled hidden />
          <button style={buttonStyle} onClick={handlePassword}>비밀번호를 변경하시겠습니까?</button>
        </div>

      </div>
      <div style={{ width: "100vw", padding: "16px", display: "flex", flexDirection: "column", height: "70vh" }}>
        <span style={{
          fontSize: "1.7em",
          fontWeight: 700,
          marginBottom: "20px"
        }} onClick={() => { setPageTranslate(0) }}>&lt; 이전</span>

        <br />
        <Bmr userBmr={userBmr} setUserBmr={setUserBmr} />
        <button style={{ alignSelf: "center", marginTop: "10px" }} className="ui button facebook" onClick={handleClick}>제출</button>
      </div>


    </div >

  )
}

export const getServerSideProps: GetServerSideProps<any> = async (ctx) => {
  // 유저 인증 로직
  const user = await getUserOrRedirect(ctx);
  const client = await clientPromise;
  const extraUser = await client.db('webfront').collection('user').findOne({ _id: user.id })

  console.log("user:", user);
  return { props: { user, bmr: extraUser?.bmr ? extraUser.bmr : null } };

}


export default Join
