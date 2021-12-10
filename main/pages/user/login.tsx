import React, { LegacyRef, MutableRefObject, useRef, useState } from 'react'
import Link from 'next/link';
import { checkValid } from '../../util/auth';
import { useRouter } from 'next/dist/client/router';
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react';
import Intro from '../../components/user/Intro';
import { GetServerSideProps } from 'next';

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
      head.current.innerHTML = "모든 항목을 작성하셔야 합니다."
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
        head.current.innerHTML = "이메일 인증을 완료하셔야 합니다. 메일함을 확인해보세요!"
      } else {
        head.current.innerHTML = error.message
      }

      email.current.value = '';
      password.current.value = '';

    }


  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: "stretch", justifyContent: "space-between", height: "60vh", borderRadius: "5px", minHeight: "450px", padding: "20px", transition: "all 0.3s", transform: loginMode ? "translateX(0%)" : "translateX(100%)" }}>

        <div ref={head} style={{ alignSelf: "center", fontSize: "2em", fontWeight: 700 }}>Login</div>
        <Form>
          <h3>Email</h3> <input type="email" ref={email} />
          <h3>Password</h3> <input type="password" ref={password} />
        </Form>
        <br />
        <button className="ui button facebook" onClick={handleClick}>제출</button>
        <Link passHref href="/user/join">
          <button className="ui button teal">회원가입</button>
        </Link>
        <Link passHref href="/user/oauth/login/google">
          <button className="ui button google">구글 로그인</button>
        </Link>

        <Link passHref href="/user/oauth/login/kakao">
          <button className="ui button yellow">카카오 로그인</button>
        </Link>

      </div>  <Intro handleClick={() => { setLoginMode(true) }} loginMode={loginMode} />
    </>

  )

}

export const getServerSideProps: GetServerSideProps<any> = async (ctx) => {
  const introSkip = ctx.query.skip

  return { props: { introSkip: introSkip ? true : false } }
}



export default Login
