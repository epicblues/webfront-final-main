import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { hash } from 'bcrypt'

const index: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {


  if (req.method === "GET") {
    const hashedPW = await hash(String(req.query.pw), 10);
    res.status(200).json({ "hello": hashedPW })
  } else {
    res.status(404).json({ "status": "wrong" })
  }
}

export default index
