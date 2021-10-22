import { MongoClient } from 'mongodb';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { env } from '../../../mongo.config';

const client = new MongoClient(env.MONGO_URL);

console.log(env.MONGO_URL);


const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await client.connect();
  // 반드시 connect()를 통해 db에 접속시켜야 한다.
  const db = await client.db('webfront');
  const collection = db.collection('food')
  const data = await collection.findOne({ "NO": 50000 });

  res.status(200).json({ "hello": data });
  client.close();
}

export default handler