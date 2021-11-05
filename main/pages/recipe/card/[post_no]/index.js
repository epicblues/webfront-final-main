import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import clientPromise from "../../../../util/mongodb";
import { getUserOrRedirect } from "../../../api/auth";

const index = ({user, recipe}) => {
  console.log(recipe);
  return (
    <div>
      <div>
        <img src={recipe.steps[0].image_url} />
        <h2>{recipe.title}</h2>
        <p>{recipe.desc}</p>
        <p>등록일: {recipe.upload_date}</p>
      </div>
      <div>
        <h3>레시피 재료</h3>
        
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  // 유저 인증 로직

  const user = await getUserOrRedirect(ctx);

  const recipe = await (
    await clientPromise
  )
    .db("webfront")
    .collection("recipe")
    .aggregate([
      {
        $lookup: {
          from: "food",
          localField: "ingredients.food_id",
          foreignField: "no",
          as: "ingredients_data",
        },
      },
    ])
    .match({
      _id: Number(ctx.query.post_no),
    })
    .toArray();
  // .findOne({ _id: Number(ctx.query.post_no) });
  const newRecipe = JSON.parse(JSON.stringify(recipe[0]));
  newRecipe.ingredients.forEach((ingredient, index) => {
    ingredient.food = newRecipe.ingredients_data[index];
  });
  return { props: { user, recipe: newRecipe } };
};
export default index;
