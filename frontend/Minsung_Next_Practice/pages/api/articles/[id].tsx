import { NextApiHandler } from 'next/dist/shared/lib/utils';
import { articles } from "../../../data";


const handler: NextApiHandler = (req, res) => {

  const index = articles.findIndex((article) => { return article.id === req.query.id });
  console.log(req.query);
  res.status(200).json(index === -1 ? { "status": `article ${req.query.id} not found` } : articles[index]);
}

export default handler;