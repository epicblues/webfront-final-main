import { NextApiHandler } from 'next/dist/shared/lib/utils';
import { articles } from "../../../data";


const handler: NextApiHandler = (req, res) => {
  res.status(200).json(articles);
}

export default handler;