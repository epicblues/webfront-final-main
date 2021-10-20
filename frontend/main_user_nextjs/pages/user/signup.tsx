import React, { useRef, useState } from 'react'
import articleStyle from "../../styles/Article.module.css";

const login = () => {

  const emailRef = useRef<HTMLInputElement>();
  const passRef = useRef<HTMLInputElement>();
  const [message, setMessage] = useState<any>(null);


  const handleSignup = async () => {
    console.log(emailRef.current?.value, passRef.current?.value);
    try {
      const res = await fetch("/api/practice/signup", {
        method: "post",
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passRef.current.value
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8"
        }
      })
      const data = await res.json();
      console.log(data);
      if (data) {
        emailRef.current.value = '';
        passRef.current.value = '';
      }
      setMessage(data.message)
      window.location.href = "http://" + window.location.host + "/user/login";
      // Login Page로 Redirect
    } catch (err) {
      console.log(err);
    }

  }

  return (
    <div className={articleStyle.card}>
      <h3>{message ? message : "SignUp Please"}</h3>
      <input type="email" name="email" id="email" ref={emailRef} />
      <input type="password" name="password" id="password" ref={passRef} />
      <button onClick={handleSignup}>Signup</button>

    </div>

  )
}

export default login
