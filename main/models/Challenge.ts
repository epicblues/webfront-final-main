import { MongoClient, Document, Db } from "mongodb";

export class Challenge {
  _id?: number;
  title?: string;

  constructor() {}

  static async validateRecipe(
    challenge: any,
    client: MongoClient,
    userId: number
  ) {
    const result = await client
      .db("webfront")
      .collection("recipe")
      .find({
        category: challenge.recipe.category,
        $and: [
          { upload_date: { $gte: new Date(challenge.startDate) } },
          { upload_date: { $lte: new Date(challenge.endDate) } },
        ],
        user_id: userId,
      })
      .sort({ upload_date: 1 })
      .toArray();
    console.log(result);
    if (result.length >= +challenge.recipe.uploadCount) {
      // 레시피 챌린지 성공
      const updateResult = await client
        .db("webfront")
        .collection("challenge")
        .findOneAndUpdate(
          {
            _id: challenge._id,
          },
          {
            $push: { winners: userId } as Document,
          },
          {
            returnDocument: "after",
          }
        );
      return { message: "success", result: updateResult.value };
    } else {
      return { message: "failed", result: result };
    }
  }

  static async validateDiary(
    challenge: any,
    client: MongoClient,
    userId: number
  ) {
    const result: Document[] = await client
      .db("webfront")
      .collection("diary")
      .aggregate([
        {
          $match: {
            user_id: userId,
            $and: [
              { date: { $gte: new Date(challenge.startDate) } },
              { date: { $lte: new Date(challenge.endDate) } },
            ],
          },
        },
        {
          $project: {
            _id: 1,
            user_id: 1,
            date: 1,
            meals: 1,
          },
        },
      ])
      .toArray();

    result.forEach((diary) => {
      diary.total = diary.meals.reduce(
        (prevMeal: any, currMeal: any) => {
          return {
            calories: prevMeal.calories + currMeal.calories,
            fat: prevMeal.fat + currMeal.fat,
            protein: prevMeal.protein + currMeal.protein,
            carbs: prevMeal.carbs + currMeal.carbs,
          };
        },
        { calories: 0, fat: 0, protein: 0, carbs: 0 }
      );
    });

    const category = challenge.diet.kind; // plusKcal vs minusKcal
    const targetCalorie = +challenge.diet.dailyCalorie; //  목표칼로리
    const condition = +challenge.diet.condition; // 조건 일 수
    console.log("필터링 이전 : ", result);
    // 해당 일의 다이어리 4개 식사가 완성되어 있어야 한다. (칼로리가 있어야 한다.)
    const filteredDiary = result.filter((diary) => {
      return (
        diary.meals.every((meal: { calories: number }) => {
          return meal.calories > 0;
        }) &&
        (category === "plusKcal"
          ? diary.total.calories >= targetCalorie
          : diary.total.calories <= targetCalorie)
      );
    });

    console.log("필터링 이후 : ", filteredDiary);

    if (filteredDiary.length >= condition) {
      // db에 성공했으니 winners로 push 해야함
      const updatedChallenge = await client
        .db("webfront")
        .collection("challenge")
        .findOneAndUpdate(
          {
            _id: challenge._id,
          },
          {
            $push: {
              winners: userId,
            } as Document,
          },
          {
            returnDocument: "after",
          }
        );

      return { message: "success", result: updatedChallenge.value };
    } else {
      return { message: "failed", result: filteredDiary };
    }
  }
}
