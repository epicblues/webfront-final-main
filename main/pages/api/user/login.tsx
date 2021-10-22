import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../util/mongodb';
import { verify, sign } from 'jsonwebtoken';
import { hash, compareSync, compare } from 'bcrypt';
import { Document } from 'bson';





const login: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const userForm = req.body;
  const password = req.body.password;

  const result = await (await clientPromise)
    .db("webfront")
    .collection("user")
    .findOne({ email: userForm.email }) as Document
  console.log(result);
  const isValidPW = await compare(password, result.password);
  console.log(isValidPW);
  res.status(200).json(isValidPW ? { status: "OK" } : { status: "Failed" });
}

export default login