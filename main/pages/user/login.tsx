import React, { LegacyRef, MutableRefObject, useRef } from 'react'
import Link from 'next/link';
import { checkValid } from '../../util/auth';
import { useRouter } from 'next/dist/client/router';
import axios from 'axios';

const Login = () => {

  const email = useRef() as MutableRefObject<HTMLInputElement>;
  const password = useRef() as MutableRefObject<HTMLInputElement>;
  const head = useRef() as MutableRefObject<HTMLHeadingElement>;
  const router = useRouter()


  const handleClick = async () => {

    if (!checkValid(email.current.value, password.current.value)) {
      head.current.innerHTML = "모든 항목을 작성하셔야 합니다."
      email.current.focus();
      return;
    };


    const { data } = await axios.post("/api/user/login", {
      email: email.current.value,
      password: password.current.value,

    })
    const result = await data
    if (result.status === "OK") router.push('/');
    else {
      head.current.innerHTML = "이메일 혹은 비밀번호를 잘못 입력하셨습니다."
      email.current.value = '';
      password.current.value = '';

    }
  }

  return (

    <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
      <div>
        <h3 ref={head}>Login</h3>
        Email : <input type="email" ref={email} /> <br />
        password : <input type="password" ref={password} /> <br />
        <button onClick={handleClick}>제출</button>
        <Link passHref href="join">
          <button>회원가입</button>
        </Link>
      </div>

    </div>

  )
}

export default Login
