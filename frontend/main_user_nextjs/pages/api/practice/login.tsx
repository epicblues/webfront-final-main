
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { hash, compare } from 'bcrypt'
import { sign } from 'jsonwebtoken';
import { secret } from '../secret'; // 환경 변수 처럼 활용
import { send } from 'micro';
import { verify } from 'jsonwebtoken';
import cookie from 'cookie';


const login: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

  const resp = await fetch('http://localhost:5000/user/email=' + req.body.email)
  const searchedUser = await resp.json();
  console.log(searchedUser);

  const keyPW = await hash(req.body.password, 10);

  const comparedResult = await compare(searchedUser.password, keyPW);

  if (req.method === "POST" && comparedResult) {
    const claims = { sub: req.body.email, data: "muyaho", name: searchedUser.name }
    const jwt = sign(claims, secret, { expiresIn: '1h' })

    // claims => 집어 넣을 객체 , secret => 암호화 방식(UUID generator 사용), {expiresIn :'1h'}한시간 뒤에 만료 
    res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
      httpOnly: true, // 자바스크립트카 쿠키를 가져갈 수 없도록 한다.
      secure: process.env.NODE_ENV !== 'development', // https를 통해서 전송할지 여부. 단 노드 실행 환경이 development일 경우에는 false로 설정
      sameSite: 'strict',
      maxAge: 3600, // 1hour동안만 보관하도록 웹 브라우저에게 명령
      path: '/' // 모든 path에 적용되는 Cookie 적용 특정 path를 입력할 경우 그 path에서만 웹 브라우저가 이 쿠키를 전송한다.
    }))
    res.status(200).json({
      message: 'Welcome Back to the app!'
    })
  } else if (!comparedResult) {
    res.status(404).json({ "status": "wrong password" })
  }
}

export default login;