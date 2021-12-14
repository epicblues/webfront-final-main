import React, { LegacyRef, MutableRefObject, useRef, useState } from 'react'
import Link from 'next/link';
import { checkValid } from '../../util/auth';
import { useRouter } from 'next/dist/client/router';
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react';
import Intro from '../../components/user/Intro';
import { GetServerSideProps } from 'next';
import Loading from '../../components/main/Loading';
import { BiEnvelope, BiLockAlt } from 'react-icons/bi';
import logInStyles from '../../../styles/main/logIn.module.css';

const Login = ({ introSkip }: { introSkip: boolean }) => {

  const email = useRef() as MutableRefObject<HTMLInputElement>;
  const password = useRef() as MutableRefObject<HTMLInputElement>;
  const head = useRef() as MutableRefObject<HTMLHeadingElement>;
  const router = useRouter();
  const [loginMode, setLoginMode] = useState(introSkip)


  const handleClick = async () => {

    if (!/^[a-zA-Z0-9]+@[a-z]+(\.[a-z]{2,4})+$/.test(email.current.value)) {
      head.current.innerHTML = "이메일 형식이 잘못되었습니다.";
      email.current.focus();
      return;
    }

    if (!checkValid(email.current.value, password.current.value)) {
      head.current.innerHTML = "모든 항목을 작성해야 합니다."
      email.current.focus();
      return;
    };

    try {
      const { data } = await axios.post("/api/user/login", {
        email: email.current.value,
        password: password.current.value,

      })
      if (data.status !== "OK") throw new Error(data.status)
      router.push('/')

    } catch (error: any) {
      if (error.message === "이메일 인증") {
        await axios.post("/api/user/verify", { email: email.current.value })
        head.current.innerHTML = "이메일 인증을 완료해야 합니다. 메일함을 확인해보세요!"
      } else {
        head.current.innerHTML = error.message
      }

      email.current.value = '';
      password.current.value = '';

    }


  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: "stretch", padding: "1rem", height: '80vh', transition: "all 0.3s", transform: loginMode ? "translateX(0%)" : "translateX(100%)" }}>

        <img src='/static/logos/logo06.png' alt='요건 다 내꺼' style={{ width: '12rem', margin: '0 auto' }} /><br />
        <div ref={head} style={{ alignSelf: "center", font: "normal 600 1.2rem 'Noto Sans KR'", marginBottom: '1rem' }}></div>
        <Form>
          <div style={{ position: 'relative', marginBottom: '1rem' }}>
            <input type="email" placeholder="이메일" ref={email} style={{ paddingLeft: '3rem', height: '3rem', borderRadius: '10px' }} />
            <BiEnvelope size='1.2rem' style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'rgba(34,36,38,.15)' }} />
          </div>
          <div style={{ position: 'relative' }}>
            <input type="password" placeholder="비밀번호" ref={password} style={{ paddingLeft: '3rem', height: '3rem', borderRadius: '10px' }} />
            <BiLockAlt size='1.2rem' style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'rgba(34,36,38,.15)' }} />
          </div>
        </Form>
        <br />
        <button className="ui button" onClick={handleClick} style={{ backgroundColor: '#ff5656', color: '#fff', border: 'solid 1px #ff5656', borderRadius: '20px', lineHeight: '1.3rem' }}>
          로그인
        </button>
        <div className="ui horizontal divider" style={{ margin: '1.5rem 0' }}>
          Or
        </div>
        <Link passHref href="/user/join">
          <button className="ui button" style={{ backgroundColor: '#fff', border: 'solid 1px rgba(34,36,38,.15)', borderRadius: '20px', marginBottom: '1rem', lineHeight: '1.3rem' }}>
            <img src='/static/logos/transLogo.png' alt='로그인' style={{ width: '1.3rem', height: '1.3rem', float: 'left' }} />
            <span style={{ marginRight: '1rem' }}>회원가입</span>
          </button>
        </Link>
        <Link passHref href="/user/oauth/login/google">
          <button className="ui button" style={{ backgroundColor: '#eee', border: 'solid 1px #eee', boxSizing: 'border-box', borderRadius: '20px', marginBottom: '1rem', lineHeight: '1.3rem' }}>
            <img src='/google.png' alt='구글 로그인' style={{ width: '1.3rem', height: '1.3rem', float: 'left' }} />
            <span style={{ marginRight: '1rem' }}>구글 로그인</span>
          </button>
        </Link>

        <Link passHref href="/user/oauth/login/kakao">
          <button className="ui button" style={{ backgroundColor: '#f9e000', border: 'solid 1px #f9e000', borderRadius: '20px', lineHeight: '1.3rem' }}>
            <img src='/kakao.png' alt='카카오 로그인' style={{ width: '1.3rem', height: '1.3rem', float: 'left' }} />
            <span style={{ marginRight: '1rem' }}>카카오 로그인</span>
          </button>
        </Link>

      </div>  <Intro handleClick={() => { setLoginMode(true) }} loginMode={loginMode} />
      {!loginMode && <Loading />}
    </>

  )

}

export const getServerSideProps: GetServerSideProps<any> = async (ctx) => {
  const introSkip = ctx.query.skip

  return { props: { introSkip: introSkip ? true : false } }
}



export default Login
