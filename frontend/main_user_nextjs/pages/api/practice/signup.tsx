import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { hash } from 'bcrypt';

const signup: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body.email, req.body.password);

  const name = String(req.body.email).split('@')[0];
  const password = await hash(req.body.password, 10)
  const resp = await fetch("http://localhost:5000/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email: req.body.email,
      password
    })
  })
  const data = await resp.json();
  res.status(200).json(data);



}

export default signup
