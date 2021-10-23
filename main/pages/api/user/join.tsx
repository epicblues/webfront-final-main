import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../util/mongodb';
import { verify, sign } from 'jsonwebtoken';
import { hash } from 'bcrypt';





const join: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const userForm = req.body;
  const password = await hash(userForm.password, 10);


  const result = await (await clientPromise)
    .db("webfront")
    .collection("user")
    .insertOne({ ...userForm, password, _id: { abc: "dfef" } })



  res.status(200).json(result.insertedId ? { status: "OK" } : { status: "Failed" });
}

export default join
