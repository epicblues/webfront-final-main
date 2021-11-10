import React, {useState} from 'react'
import Image from "next/image";
import clientPromise from "../../../../util/mongodb";
import { getUserOrRedirect } from "../../../api/auth";

import ModalNutrition from '../../../../components/recipe/recipe_card/ModalNutrition'

const index = ({user, recipe}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSetIsModalVisible = (val) => {
    setIsModalVisible(val);
  }

  function renderSwitch(param) {
    switch(param) {
      case '1' :
        return '10분 이내'
      case '2' :
        return '10분 ~ 30분'
      case '3' :
        return '30분 ~ 1시간'
      case '4' :
        return '1시간 ~ 2시간'
      case '5' :
        return '2시간 이상' 
      default :
        return '몰라용'
    }
  }
  return (
    <div>
      <div>
        <Image 
          src={user.url + recipe.steps.slice(-1)[0].image_url}
          width={500}
          height={300}
          alt='main image'
        />
        <p>카테고리: {recipe.category}</p>
        <h2>{recipe.title}</h2>
        <p>{recipe.desc}</p>
        <p>기준: {recipe.qtt}인분</p>
        <p>소요시간: {renderSwitch(recipe.duration)}</p>
        <p>등록일: {recipe.upload_date}</p>
        {/* <p>작성자 : {recipe.</p> */}
        <p>조회수: {recipe.hit}</p>
      </div>
      <div>
        <h3>레시피 재료</h3>
        {recipe.ingredients.map((value,index) => {
                        return (
                            <div key={Math.random()}>
                                <span>
                                    {value.food.name}
                                    {" "}
                                </span>
                                <span>
                                    (제조사: {value.food.mfr})
                                    {" "}
                                </span>
                                <span>
                                    {value.quantity}
                                </span>
                                <span>
                                    {value.food.unit}
                                </span>
                            </div>
                        );
                    })
                }
        
      </div>
      <div>
        <button 
          type='button'
          onClick={() => handleSetIsModalVisible(true)}
        >
          영양정보 보기
        </button>
        {isModalVisible && 
        (
          <ModalNutrition 
            setIsModalVisible={setIsModalVisible}
            nutritionData={recipe.nutrition}
          />
        )}
      </div>
      <div>
        <h3>만드는 방법</h3>
        {recipe.steps.map((value, index) => {
          return (
            <div key={Math.random()}>
              <p>Step {index + 1}.</p>
              <p>{value.desc}</p>
              <Image 
                src={user.url + value.image_url}
                width={500}
                height={300}
                alt='main image'
              />
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  // 유저 인증 로직
  const client = await clientPromise;
  const user = await getUserOrRedirect(ctx);
  const hitResult = await client.db("webfront").collection("recipe").findOneAndUpdate({_id : Number(ctx.query.post_no) }, {$inc : {hit : 1}});
  console.log(hitResult);
  const recipe = await client
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
