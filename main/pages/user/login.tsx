import React, { LegacyRef, MutableRefObject, useEffect, useRef, useState, CSSProperties } from 'react'
import Link from 'next/link';
import { checkValid } from '../../util/auth';
import { useRouter } from 'next/dist/client/router';
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react';
import Intro from '../../components/user/Intro';
import { GetServerSideProps } from 'next';
import Loading from '../../components/main/Loading';
import { BiErrorCircle, BiEnvelope, BiLockAlt } from 'react-icons/bi';
import logInStyles from '../../../styles/main/logIn.module.css';
import { LoadingProps } from '../../hooks';

const Login = ({ introSkip, loadingProps }: { introSkip: boolean, loadingProps: LoadingProps }) => {
  const [loading, setLoading, LoadingCircle] = loadingProps;
  const email = useRef() as MutableRefObject<HTMLInputElement>;
  const password = useRef() as MutableRefObject<HTMLInputElement>;
  const head = useRef() as MutableRefObject<HTMLHeadingElement>;
  const router = useRouter();
  const [loginMode, setLoginMode] = useState(introSkip)
  const container = useRef() as MutableRefObject<HTMLDivElement>
  useEffect(() => {
    setTimeout(() => {
      container.current.style.display = 'flex'
    }, 500)
  }, [])

  const handleClick = async () => {

    if (!/^[a-zA-Z0-9]+@[a-z]+(\.[a-z]{2,4})+$/.test(email.current.value)) {
      head.current.innerHTML = "이메일 형식이 잘못되었습니다.";
      setLoading(false);
      email.current.focus();
      return;
    }

    if (!checkValid(email.current.value, password.current.value)) {
      head.current.innerHTML = "모든 항목을 작성해야 합니다."
      email.current.focus();
      setLoading(false);
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
        setLoading(false);
      } else {
        head.current.innerHTML = error.message
        setLoading(false);
      }

      email.current.value = '';
      password.current.value = '';

    }
  }

  const contentsWrap: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: "stretch",
    padding: "1rem",
    width: "100vw",
    transition: "all 0.3s",
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
    fontSize: "1.2rem"
  }

  const join: CSSProperties = {
    backgroundColor: "#fff",
    borderRadius: "20px",
    // color: "white",
    border: 'solid 1px rgba(34,36,38,.15)',
    alignSelf: "stretch",
    height: "2.8rem",
    fontWeight: 400,
    fontSize: "1.2rem",
    padding: '0 1rem',
    marginBottom: '1rem',
  }

  const google: CSSProperties = {
    backgroundColor: "#eee",
    borderRadius: "20px",
    // color: "white",
    border: 'solid 1px #eee',
    alignSelf: "stretch",
    height: "2.8rem",
    fontWeight: 400,
    fontSize: "1.2rem",
    padding: '0 1rem',
    marginBottom: '1rem',
    boxSizing: 'border-box',
  }

  const kakao: CSSProperties = {
    backgroundColor: "#f9e000",
    borderRadius: "20px",
    // color: "white",
    border: 'solid 1px #f9e000',
    alignSelf: "stretch",
    height: "2.8rem",
    fontWeight: 400,
    fontSize: "1.2rem",
    padding: '0 1rem',
    marginBottom: '1rem',
  }

  const buttonImg: CSSProperties = {
    width: '1.3rem',
    height: '1.3rem',
    float: 'left'
  }

  return (
    <>
      <div style={{ display: "none", width: "200vw", transform: !loginMode ? "translateX(0)" : "translateX(-100vw)", transition: "all 0.5s", }} ref={container}>
        <Intro handleClick={() => { setLoginMode(true) }} loginMode={loginMode} />

        <div style={contentsWrap}>
          <div style={title}>로그인</div>
          <div ref={head} style={subTitle}></div>
          <Form>
            <div style={{ position: 'relative', marginBottom: '1rem' }}>
              <input type="email" placeholder="이메일" ref={email} style={input} />
              <BiEnvelope style={inputIcon} />
            </div>
            <div style={{ position: 'relative' }}>
              <input type="password" placeholder="비밀번호" ref={password} style={input} />
              <BiLockAlt style={inputIcon} />
            </div>
          </Form>
          <br />
          <button onClick={(e) => { setLoading(true); handleClick(); }} style={button}>
            로그인
          </button>
          <div className="ui horizontal divider" style={{ margin: '1.5rem 0' }}>
            Or
          </div>
          <Link passHref href="/user/join">
            <button style={join} onClick={() => { setLoading(true) }}>
              <img src='/static/logos/transLogo.png' alt='회원가입' style={buttonImg} />
              <span style={{ marginRight: '1rem' }}>회원가입</span>
            </button>
          </Link>
          <Link passHref href="/user/oauth/login/google">
            <button style={google} onClick={() => { setLoading(true) }}>
              <img src='/google.png' alt='구글 로그인' style={buttonImg} />
              <span style={{ marginRight: '1rem' }}>구글 로그인</span>
            </button>
          </Link>

          <Link passHref href="/user/oauth/login/kakao">
            <button style={kakao} onClick={() => { setLoading(true) }}>
              <img src='/kakao.png' alt='카카오 로그인' style={buttonImg} />
              <span style={{ marginRight: '1rem' }}>카카오 로그인</span>
            </button>
          </Link>

        </div>
      </div>

      {!loginMode && <Loading />}

    </>

  )

}

export const getServerSideProps: GetServerSideProps<any> = async (ctx) => {
  const introSkip = ctx.query.skip

  return { props: { introSkip: introSkip ? true : false } }
}



export default Login
