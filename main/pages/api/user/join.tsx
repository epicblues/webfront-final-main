import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../util/mongodb';
import { verify, sign } from 'jsonwebtoken';
import { hash } from 'bcrypt';

const join: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const userForm = req.body;
  const password = await hash(userForm.password, 10);


  try {
    const result = await (await clientPromise)
      .db("webfront")
      .collection("user")
      .insertOne({ ...userForm, password });
    console.log(result);
    res.status(200).json(result.insertedId ? { status: "OK" } : { status: "Failed" });

  } catch (err) {
    console.log(err);
    res.status(200).json({ status: JSON.stringify(err) });
  }


}

export default join
