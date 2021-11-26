import React, { LegacyRef, MutableRefObject, useRef, useState } from 'react'
import Link from 'next/link';
import { checkValid } from '../../util/auth';
import { useRouter } from 'next/dist/client/router';
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react';
import Intro from '../../components/user/Intro';

const Login = () => {

  const email = useRef() as MutableRefObject<HTMLInputElement>;
  const password = useRef() as MutableRefObject<HTMLInputElement>;
  const head = useRef() as MutableRefObject<HTMLHeadingElement>;
  const router = useRouter();
  const [loginMode, setLoginMode] = useState(false)


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
      const result = await data
      if (result.status === "OK") router.push('/');

    } catch (error) {

      head.current.innerHTML = "이메일 혹은 비밀번호를 잘못 입력하셨습니다."
      email.current.value = '';
      password.current.value = '';

    }


  }

  return (
    <>
      {loginMode ? <div style={{ display: 'flex', flexDirection: 'column', alignItems: "stretch", justifyContent: "space-evenly", height: "40vh", borderRadius: "5px", minHeight: "450px", padding: "20px", }}>

        <h2 ref={head} style={{ alignSelf: "center" }}>Login</h2>
        <Form>
          <h3>Email</h3> <input type="email" ref={email} />
          <h3>Password</h3> <input type="password" ref={password} />
        </Form>
        <br />
        <Button onClick={handleClick}>제출</Button>
        <Link passHref href="/user/join">
          <Button>회원가입</Button>
        </Link>


      </div> : <Intro handleClick={() => { setLoginMode(true) }} />}
    </>

  )

}


export default Login
