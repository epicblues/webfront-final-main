import React from "react";
import Head from "next/head";

function about(props) {
  console.log(props);
  return (
    <div>
      <Head>
        <title>about age</title>
        <meta name="about" content="about page" />
      </Head>
      about
    </div>
  );
}

export default about;
