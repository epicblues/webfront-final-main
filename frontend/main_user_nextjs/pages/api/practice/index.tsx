import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { hash, compare } from 'bcrypt'
import { sign } from 'jsonwebtoken';
import { secret } from '../secret'; // 환경 변수 처럼 활용

const index: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const keyPW = await hash("1234", 10);
  const comparedResult = await compare(req.body.password, keyPW);

  if (req.method === "POST" && comparedResult) {
    const claims = { sub: req.body.email, data: "muyaho", name: "KMS" }
    const jwt = sign(claims, secret, { expiresIn: '1h' })

    // claims => 집어 넣을 객체 , secret => 암호화 방식(UUID generator 사용), {expiresIn :'1h'}한시간 뒤에 만료 
    res.status(200).json({
      authToken: jwt
    })
  } else if (!comparedResult) {
    res.status(404).json({ "status": "wrong password" })
  }
}

export default index
