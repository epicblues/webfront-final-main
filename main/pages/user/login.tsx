import React, { LegacyRef, MutableRefObject, useRef } from 'react'



const join = () => {

  const email = useRef() as MutableRefObject<HTMLInputElement>;
  const password = useRef() as MutableRefObject<HTMLInputElement>;


  const handleClick = async () => {
    const res = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        email: email.current.value,
        password: password.current.value,

      })
    })
    const result = await res.json();
    if (result.status === "OK") location.href = "/";
    else {
      email.current.value = '';
      password.current.value = '';

    }
  }

  return (

    <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
      <div>

        Email : <input type="email" ref={email} /> <br />
        password : <input type="password" ref={password} /> <br />
        <button onClick={handleClick}>제출</button>
      </div>

    </div>

  )
}

export default join
