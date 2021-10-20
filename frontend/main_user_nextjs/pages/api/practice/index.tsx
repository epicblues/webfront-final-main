import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { hash, compare } from 'bcrypt'
import { sign } from 'jsonwebtoken';
import { secret } from '../secret'; // 환경 변수 처럼 활용
import { send } from 'micro';
import { verify } from 'jsonwebtoken';
import { getCookieParser } from 'next/dist/server/api-utils';
import { parse } from 'cookie';



const authenticated = (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {

  verify(req.cookies.auth, secret, async (err, decoded) => {
    // 에러 없음(secret 일치) decoded된 객체로 실제 데이터 비교
    // decoded 객체의 인증 데이터 email => db에 email이 일치하는 테이블 요청, 실제 값 비교!
    console.log(decoded);
    if (!err && decoded) {
      return await fn(req, res); // 다음 함수를 실행한다.
    }
    // 에러 발생(secret 일치)
    res.status(401).json({ message: 'Sorry you are not authenticated' });


  })




}
// 함수를 감싼다.

const index: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ "status": "authenticated", "welcome": parse(req.cookies.auth).name })
}

export default authenticated(index) // error를 핸들링하는 미들웨어가 탑재된 index 함수.
