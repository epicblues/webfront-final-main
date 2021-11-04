import type { NextApiRequest, NextApiResponse, NextConfig } from "next";
import { ImageFile, Recipe } from "../../../../models";
import clientPromise, { getNextSequence } from "../../../../util/mongodb";
import { authenticated } from "../../auth";
import multiparty from "multiparty";
import fs from "fs";
import path from "path";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id: user_id } = JSON.parse(req.headers.authorization as string);
  const form = new multiparty.Form();

  await form.parse(req, async (err, fields, files) => {
    console.log(fields, "files:", files);

    const stepNames = fields.stepData[0].split(",");
    // step Name과 file을 순서대로 맞춰서 steps 배열에 삽입
    // 이미지 파일 이름 예상 : postId_순서
    const steps = stepNames.map((desc: string) => {
      return {
        desc,
        image_url: null,
      };
    });

    // igr_array => split "," => split "/" 시켜야함.

    // recipe의 경우 복수의 이미지 등록을 위한 로직
    for (let fileIndex in files) {
      const imageMetaData: ImageFile = files[fileIndex][0];
      const tempPath = imageMetaData.path;
      // const imageBinary = fs.readFileSync(tempPath);
      fs.copyFileSync(
        tempPath,
        path.join(
          path.resolve("./"),
          `public/static/recipe/${user_id}_${imageMetaData.fieldName}.${
            imageMetaData.originalFilename.split(".")[1]
          }`
        )
      );
    }

    const client = await clientPromise;
    const recipeId = await getNextSequence("recipe", client);
    const createResult = await client
      .db("webfront")
      .collection("recipe")
      .insertOne({
        _id: recipeId,
        user_id,
        upload_date: new Date(),
        title: fields.title[0],
        desc: fields.desc[0],
        hit: 0,
        category: fields.category[0],
        qtt: Number(fields.qtt[0]),
        duration: fields.duration[0],
        igr_array: fields.igr_array[0].split(","),
        steps: fields.stepData[0].split, // image_url과 desc 탑재
      });
  });

  res.status(200).json({ status: "Success" });
}

export default authenticated(handler);

export const config: NextConfig = {
  api: {
    bodyParser: false,
  },
};
// 자동 body 분석을 막아서 formData를 활용할 수 있게 끔
