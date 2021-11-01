const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI, {});

const diarySample = {
  user_email: "blueha1023@naver.com",
  upload_date: new Date(),
  calorie_target: 1000,
  calorie_total: 0,
  success: false,
  review: "2021-10-29 이것 저것 먹었음",
};

async function insertDiary(diary) {
  const result = await (await client.connect())
    .db("webfront")
    .collection("diary")
    .insertOne(diary);
  console.log(result);
}

insertDiary(diarySample);
