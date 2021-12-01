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
      display: 'flex', flexDirection: 'column', alignItems: "stretch",
      // border: "solid 2px lightgray",
      // borderRadius: "5px",
      padding: "16px",
      justifyContent: "space-between"
    }}>
      <Form  >
        <h2 ref={message}>회원 정보 수정</h2>
        <Form.Field>
          <h3>닉네임</h3>
          <input type="text" ref={name} placeholder="이름" />

        </Form.Field>



        <Bmr userBmr={userBmr} setUserBmr={setUserBmr} />
      </Form>
      <button style={{ alignSelf: "center", marginTop: "10px" }} className="ui button" onClick={handleClick}>제출</button>


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
