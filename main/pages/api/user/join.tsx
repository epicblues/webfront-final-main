import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../util/mongodb';


const join: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const userForm = req.body;



  const result = await (await clientPromise)
    .db("webfront")
    .collection("user")
    .insertOne({ ...userForm })



  res.status(200).json(result.insertedId ? { status: "OK" } : { status: "Failed" });
}

export default join
