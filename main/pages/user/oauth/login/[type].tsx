import { GetServerSideProps } from 'next'
import React from 'react'

const Login = ({ type }: { type: string }) => {
  return (
    <div>
      {type} Login Temp Page
    </div>
  )
}

export default Login


export const getServerSideProps: GetServerSideProps<any> = async (ctx) => {
  const type = ctx.query.type;

  switch (type) {
    case 'google':
      ctx.res.writeHead(302, {
        Location: `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.GOOGLE_OAUTH_CLIENT_ID}&redirect_uri=${process.env.NEXT_HOSTNAME}/api/user/oauth/google&access_type=offline&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&response_type=code&`,
      });
      ctx.res.end();
      break;
    case 'kakao':
      ctx.res.writeHead(302, {
        Location: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_OAUTH_CLIENT_ID}&redirect_uri=${process.env.NEXT_HOSTNAME}/api/user/oauth/kakao&response_type=code`,
      });
      ctx.res.end();


      break;
    default:
      return {
        props: { type: "Wrong" }
      }
  }
  // 


  return {
    props: { type }
  }
}
