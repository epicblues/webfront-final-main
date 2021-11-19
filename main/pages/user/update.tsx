import React, { LegacyRef, MutableRefObject, useEffect, useRef, useState } from 'react'
import { checkValid, getUserOrRedirect } from '../../util/auth';
import Bmr, { UserBmr } from '../../components/user/Bmr'
import axios from 'axios';
import { Button, Form, Header, Input, Label } from 'semantic-ui-react';
import { GetServerSideProps } from 'next';
import clientPromise from '../../util/mongodb';



const Join = ({ user, bmr }: { user: any, bmr: UserBmr }) => {


  useEffect(() => {
    name.current.value = user.name
  }, [user.name])

  const password = useRef() as MutableRefObject<HTMLInputElement>;
  const confirmPassword = useRef() as MutableRefObject<HTMLInputElement>;

  const name = useRef() as MutableRefObject<HTMLInputElement>;
  const message = useRef() as MutableRefObject<HTMLHeadingElement>;
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

  const handleClick = async () => {
    const bmrToSend: Partial<UserBmr> = { ...userBmr, error: '', flag: false, system: "" };

    if (!(checkValid(password.current.value, name.current.value))) {
      message.current.textContent = "전부 입력해야 합니다."
      message.current.style.color = "red";

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
        <h2 ref={message}>회원 정보 수정</h2>
        <Form.Field>
          <h3>이름</h3>
          <input type="text" ref={name} placeholder="이름" />

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

export const getServerSideProps: GetServerSideProps<any> = async (ctx) => {
  // 유저 인증 로직
  const user = await getUserOrRedirect(ctx);
  const client = await clientPromise;
  const extraUser = await client.db('webfront').collection('user').findOne({ _id: user.id })

  console.log("user:", user);
  return { props: { user, bmr: extraUser?.bmr ? extraUser.bmr : null } };

}


export default Join
