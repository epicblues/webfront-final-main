import React from "react";
import Head from "next/head";
import homeStyle from "../styles/Home.module.css";
function about(props) {
  console.log(props);
  return (
    <div className={homeStyle.container}>
      <Head>
        <title>about age</title>
        <meta name="about" content="about page" />
      </Head>
      <h1>About</h1>
    </div>
  );
}

export default about;
