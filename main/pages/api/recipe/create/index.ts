import type { NextApiRequest, NextApiResponse, NextConfig } from "next";
import { Recipe } from "../../../../models";
import clientPromise from "../../../../util/mongodb";
import { authenticated } from "../../auth";
import multiparty from "multiparty";
import multer from "multer";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Partial<Recipe>>
) {
  const { email } = JSON.parse(req.headers.authorization as string);
  const form = new multiparty.Form();

  await form.parse(req, (err, fields, files) => {
    console.log(fields, "files:", files);
  });
  // (await clientPromise).db('webfront').collection('recipe')
  res.status(200).json({ user_id: email });
}

export default authenticated(handler);

export const config: NextConfig = {
  api: {
    bodyParser: false,
  },
};
// 자동 body 분석을 막아서 formData를 활용할 수 있게 끔
