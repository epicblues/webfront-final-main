import React, { CSSProperties, LegacyRef, MouseEventHandler, MutableRefObject, useEffect, useRef, useState } from 'react'
import { checkValid, getUserOrRedirect } from '../../util/auth';
import Bmr from '../../components/user/Bmr'
import axios from 'axios';
import { Button, Form, Header, Input, Label } from 'semantic-ui-react';
import { BiUser, BiEnvelope, BiLockOpenAlt, BiLockAlt, BiChevronRight, BiChevronsLeft } from 'react-icons/bi';

import { GetServerSideProps } from 'next';
import clientPromise from '../../util/mongodb';
import formStyle from '../../styles/user/form.module.css'
import { UserBmr } from '../../models';
import { BACKGROUND_COLOR, MAIN_COLOR, MIDDLE_COLOR } from '../../constants';
import { useRouter } from 'next/router';


const Join = ({ user, bmr, type }: { user: any, bmr: UserBmr, type: string }) => {

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
      target.style.backgroundColor = MIDDLE_COLOR
      target.disabled = false;

    }, 2000, button, originalBtnText);
  }

  const buttonStyle: CSSProperties = { border: "none", background: MAIN_COLOR, borderRadius: "20px", width: '100%', fontWeight: 400, color: "#fff", alignSelf: "stretch", height: "2.8rem", fontSize: "1.2rem" }
  const router = useRouter()
  const name = useRef() as MutableRefObject<HTMLInputElement>;
  const message = useRef() as MutableRefObject<HTMLHeadingElement>;
  const password = useRef() as MutableRefObject<HTMLInputElement>;
  const confirmPassword = useRef() as MutableRefObject<HTMLInputElement>;
  const [userBmr, setUserBmr] = useState(
    bmr ? bmr : new UserBmr()
  )

  const handleNickname: MouseEventHandler<HTMLButtonElement> = async (event) => {
    const $button = event.currentTarget
    if (name.current.disabled) {
      name.current.disabled = false;
      $button.textContent = "닉네임 중복 확인하기"
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
        name.current.style.backgroundColor = BACKGROUND_COLOR
        $button.textContent = "사용 가능한 닉네임입니다."
        $button.disabled = true;
        $button.style.backgroundColor = "lightgreen"
        name.current.style.border = "0"
        name.current.style.color = "black"
        name.current.style.fontWeight = "700"
        // name.current.style.fontSize = "1.3em"

      } else {
        // event 변수는 이 함수가 끝나면 사라진다. 따라서 추가적으로 button의 주소를 묶어둬야 한다?
        changeButtonStyle($button, "이미 존재하는 닉네임입니다.");
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
      // (confirmPassword.current.previousElementSibling as HTMLElement).hidden = false;
      $button.textContent = "비밀번호 일치 확인하기"
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
      // (confirmPassword.current.previousElementSibling as HTMLElement).hidden = true;
      password.current.hidden = true;
      $button.disabled = true;
    }
  }

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const bmrToSend: Partial<UserBmr> = { ...userBmr, error: '', flag: false, system: "" };
    const $btn = e.currentTarget;
    if (!name.current.disabled) {
      $btn.textContent = "닉네임 중복 확인을 해야 합니다."
      $btn.style.backgroundColor = "red";
      setTimeout(() => {
        $btn.style.backgroundColor = MAIN_COLOR;
        $btn.textContent = "제출"
      }, 3000)
      return;
    }
    if (bmrToSend.activity as number < 5) {
      setUserBmr({ ...userBmr, error: "기초 대사량 작성 완료해주세요." })
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
    if (result.status === "OK") {
      await axios.post("/api/user/logout")
      router.push("login?skip=true")
    }
    else {
      const status = JSON.parse(result.status);
      message.current.innerHTML = "잘못 입력하셨습니다."
      name.current.value = '';
    }
  }

  const inputIcon: CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '1rem',
    transform: 'translateY(-50%)',
    color: 'rgba(34,36,38,3)',
    fontSize: '1.7rem'
  }

  return (

    <div style={{
      display: 'flex', alignItems: "stretch",
      justifyContent: "space-between",
      width: "300vw",
      transition: "0.5s transform", transform: `translateX(${pageTranslate}vw)`,

    }}>
      <div className={formStyle.form} >
        <div style={{ display: 'flex', justifyContent: "space-between", alignItems: 'center' }} ref={message}>
          <span>닉네임</span>
          <BiChevronRight size='2rem' onClick={() => { type === "normal" ? setPageTranslate(-100) : setPageTranslate(-200) }} />
        </div>
        <div className={formStyle["form-field"]}>
          <p style={{ font: "normal 300 1.3rem 'Noto Sans KR'" }}>닉네임을 변경하시겠습니까?</p>
          <input type="text" ref={name} placeholder="이름" disabled />
          <button style={buttonStyle} onClick={handleNickname}>네, 변경할래요.</button>
        </div>
      </div>

      <div className={formStyle.form}>
        <div style={{ display: 'flex', justifyContent: "space-between", alignItems: 'center' }} ref={message}>
          <span>비밀번호</span>
          {type === "normal" && <BiChevronRight size='2rem' onClick={() => { setPageTranslate(-200) }} />}
        </div>

        <div className={formStyle["form-field"]}>
          {type === "normal" && <p style={{ font: "normal 300 1.3rem 'Noto Sans KR'" }}>비밀번호를 변경하시겠습니까?</p>}
          <input type="password" ref={password} placeholder="새 비밀번호" disabled hidden />
        </div>
        <div className={formStyle["form-field"]}>
          {/* <p hidden style={{ font: "normal 300 1.3rem 'Noto Sans KR'"}}>새 비밀번호를 확인해주세요.</p> */}
          <input type="password" ref={confirmPassword} placeholder="새 비밀번호 확인" disabled hidden />
          {type === "normal" && <button style={buttonStyle} onClick={handlePassword}>네, 변경할래요.</button>}
        </div>
      </div>

      <div style={{ width: "100vw", padding: "1rem", display: "flex", flexDirection: "column", background: BACKGROUND_COLOR }}>
        <BiChevronsLeft size='2rem' onClick={() => { setPageTranslate(0) }} />

        <Bmr userBmr={userBmr} setUserBmr={setUserBmr} />
        {userBmr.activity > 1000 &&
          <button style={buttonStyle} onClick={handleClick}>변경하기</button>

        }
      </div>


    </div >

  )
}

export const getServerSideProps: GetServerSideProps<any> = async (ctx) => {
  // 유저 인증 로직
  const user = await getUserOrRedirect(ctx);
  const client = await clientPromise;
  const extraUser = await client.db('webfront').collection('user').findOne({ _id: user.id })

  return { props: { user, bmr: extraUser?.bmr ? extraUser.bmr : null, type: extraUser?.type } };

}


export default Join
