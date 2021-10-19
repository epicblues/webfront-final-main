import React from 'react'
import articleStyle from "../../styles/Article.module.css";

const login = () => {
  return (
    <div className={articleStyle.card}>
      <form id="join" action="/api/practice" method="post" >
        <input type="text" name="email" />
        <input type="password" name="password" />
        <input type="submit" value="join" />
      </form>
    </div>

  )
}

export default login
