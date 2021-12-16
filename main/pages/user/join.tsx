import React, { CSSProperties, LegacyRef, MouseEventHandler, MutableRefObject, useRef, useState } from 'react'
import { checkValid } from '../../util/auth';
import Bmr from '../../components/user/Bmr'
import axios from 'axios';
import { Button, Form, Header, Input, Label } from 'semantic-ui-react';
import { BiUser, BiEnvelope, BiLockOpenAlt, BiLockAlt, BiEditAlt, BiBarChartAlt, BiHappyAlt } from 'react-icons/bi';
import { NextRouter, useRouter } from 'next/router';
import FinishPage from '../../components/user/FinishPage';
import { UserBmr } from '../../models';
import { MIDDLE_COLOR } from '../../constants';
import joinStyles from '../../../styles/main/join.module.css';

const Join = () => {
  const router = useRouter();
  const email = useRef() as MutableRefObject<HTMLInputElement>;
  const password = useRef() as MutableRefObject<HTMLInputElement>;
  const confirmPassword = useRef() as MutableRefObject<HTMLInputElement>;

  const name = useRef() as MutableRefObject<HTMLInputElement>;
  const message = useRef() as MutableRefObject<HTMLHeadingElement>;
  const [userBmr, setUserBmr] = useState<UserBmr>(new UserBmr)
  const [joinFinished, setJoinFinished] = useState(false);

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

  const [bmrMode, setBmrMode] = useState(false);

  const toggleJoinForm: MouseEventHandler<HTMLButtonElement> = (event) => {
    const $button = event.currentTarget;

    if (!(email.current.disabled && name.current.disabled)) {
      changeButtonStyle($button, "상단의 정보를 모두 입력해야 합니다.")
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

      setJoinFinished(true);
      setTimeout(() => {
        router.push('/user/login')
      }, 3000)
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
      changeButtonStyle($button, "이미 가입된 이메일입니다.");
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

  const contentsWrap: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: "stretch",
    padding: "1rem",
    width: "100vw",
    transition: "all 500ms",
    transform: bmrMode ? "translate(-100vw,0)" : "none",
  }

  const title: CSSProperties = {
    alignSelf: "center",
    font: "normal 600 2rem 'Noto Sans KR'",
    marginBottom: '1rem'
  }

  const subTitle: CSSProperties = {
    alignSelf: "center",
    marginBottom: '1rem',
    font: "normal 400 1.2rem 'Noto Sans KR'",
    color: 'red'
  }

  const leftBox: CSSProperties = {
    borderTopLeftRadius: '10px',
    borderBottomLeftRadius: '10px'
  }

  const rightBox: CSSProperties = {
    borderTopRightRadius: '10px',
    borderBottomRightRadius: '10px'
  }

  const input: CSSProperties = {
    paddingLeft: '3rem',
    height: '3rem',
    borderRadius: '10px'
  }

  const inputIcon: CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '1rem',
    transform: 'translateY(-50%)',
    color: 'rgba(34,36,38,.15)',
    fontSize: '1.2rem'
  }

  const button: CSSProperties = {
    backgroundColor: "#ff5656",
    borderRadius: "20px",
    color: "white",
    border: "none",
    alignSelf: "stretch",
    height: "2.8rem",
    fontWeight: 400,
    fontSize: "1.2rem",
  }

  return (

    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: "stretch",
      width: "300vw",
      fontFamily: "-moz-initial",
      WebkitOverflowScrolling: "unset"
    }}
    >
      <div style={contentsWrap}>
        <div style={title}>회원가입</div>
        <Form>
          <div className="ui mini unstackable steps" style={{ margin: '0 auto 1rem', borderRadius: '10px', width: '100%' }}>
            <div className="active step" style={leftBox}>
              <BiEditAlt size='2rem' style={{ marginRight: '0.25rem' }} />
              <div className="content">
                <div className="title">작성</div>
              </div>
            </div>
            <div className="disabled step">
              <BiBarChartAlt size='2rem' style={{ marginRight: '0.25rem' }} />
              <div className="content">
                <div className="title">BMR</div>
              </div>
            </div>
            <div className="disabled step" style={rightBox}>
              <BiHappyAlt size='2rem' style={{ marginRight: '0.25rem' }} />
              <div className="content">
                <div className="title">완료</div>
              </div>
            </div>
          </div>

          <Form.Field style={{ margin: '0' }}>
            <div className="ui action input" style={{ position: 'relative', marginBottom: '1rem' }}>
              <input type="text" ref={name} placeholder="닉네임" style={input} />
              <button className="ui button" onClick={nameCheck} style={{ borderTopRightRadius: '10px', borderBottomRightRadius: '10px' }}>중복 확인</button>
              <BiUser size='1.2rem' style={inputIcon} />
            </div>
          </Form.Field>

          <Form.Field style={{ margin: '0' }}>
            <div className="ui action input" style={{ position: 'relative', marginBottom: '1rem' }}>
              <input type="email" ref={email} placeholder="이메일" style={input} />
              <button className="ui button" onClick={emailCheck} style={{ borderTopRightRadius: '10px', borderBottomRightRadius: '10px' }}>중복 확인</button>
              <BiEnvelope size='1.2rem' style={inputIcon} />
            </div>
          </Form.Field>

          <Form.Field>
            <div style={{ position: 'relative', marginBottom: '1rem' }}>
              <input type="password" ref={password} placeholder="비밀번호" style={input} />
              <BiLockOpenAlt size='1.2rem' style={inputIcon} />
            </div>
          </Form.Field>

          <Form.Field>
            <div style={{ position: 'relative', marginBottom: '1rem' }}>
              <input type="password" ref={confirmPassword} placeholder="비밀번호 확인" style={input} />
              <BiLockAlt size='1.2rem' style={inputIcon} />
            </div>
          </Form.Field>
        </Form>

        <button onClick={toggleJoinForm} style={button}>
          다음 단계로 가기
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: 'column', width: "100vw", padding: "5vw", transition: "all 500ms", transform: bmrMode ? "translate(-100vw,0)" : "none" }}>
        <Bmr userBmr={userBmr} setUserBmr={setUserBmr} />
        {userBmr.activity > 1000 &&
          <button style={{ alignSelf: "center", marginTop: "10px" }} className="ui button facebook" onClick={handleClick}>제출</button>
        }
      </div>
      <div style={{ width: "100vw", padding: "5vw", transition: "all 500ms", transform: joinFinished ? "translate(-200vw,0)" : "none" }}>

        <FinishPage email={email.current?.value || ""} />
      </div>
    </div>

  )
}

export default Join
