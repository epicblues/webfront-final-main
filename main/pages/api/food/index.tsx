// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from 'bson';
import type { NextApiRequest, NextApiResponse } from "next";

// {
//   "_id" : ObjectId("617791f7c953814a11d94ecb"),
//     NO : no
//   식품명: name
//   지역 / 제조사 : mfr
//   1회제공량: serve
//   내용량_단위: unit
//   에너지(kcal) : kcal
//   단백질: prot
//   지방: fat
//   탄수화물: carbs
//   총당류: sugars
//   나트륨: sodium
//   콜레스테롤(mg) : chole
//     총 포화 지방산(g) : stdfat
//     트랜스 지방산(g) : trnfat
// }



export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.status(200).json({ name: "John Doe" });
}
