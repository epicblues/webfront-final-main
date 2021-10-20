import { NextPageContext } from 'next';
import Router from 'next/router'



// User의 로그인 여부를 알려주는 함수.
const getUser = async (url, ctx: NextPageContext) => {
  const resp = await fetch(`${url}/api/practice`, {
    headers: {
      cookie: ctx.req?.headers.cookie
    }
  });

  if (resp.status === 401 && !ctx.req) { // 클라이언트 사이드 (일반적인 리액트 라우팅, 뒤로가기)
    Router.replace(`${url}/user/login`);
    return;
  }

  if (resp.status === 401 && ctx.req) { // 서버 사이드
    ctx.res.writeHead(302, {
      Location: `${url}/user/login`
    })
    ctx.res.end();
    return;
  }

  return await resp.json();
}

export default getUser;