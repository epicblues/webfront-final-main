// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.url);

  res.status(200).json({ name: "John Doe", class: "baka", age: 64 });
};
export default handler;
