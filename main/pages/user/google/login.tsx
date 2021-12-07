import { GetServerSideProps } from 'next'
import React from 'react'

const Login = () => {
  return (
    <div>
      구글 로그인 페이지
    </div>
  )
}


export const getServerSideProps: GetServerSideProps<any> = async (ctx) => {
  ctx.res.writeHead(302, {
    Location: `https://accounts.google.com/o/oauth2/auth?approval_prompt=force&client_id=${process.env.GOOGLE_OAUTH_CLIENT_ID}&redirect_uri=http://localhost:3000/api/user/oauth/check&access_type=offline&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&response_type=code&`,
  });
  ctx.res.end();

  return {
    props: { "google": "login" }
  }
}



export default Login
