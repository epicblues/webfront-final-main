const { MongoClient } = require("mongodb");

const client = new MongoClient(
  "mongodb+srv://epicblue:v2OvTJiTodfg5XQO@cluster0.bopwr.mongodb.net/webfront?retryWrites=true&w=majority",
  {}
);

const diarySample = {
  user_email: "epicblue@hanmail.net",
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
