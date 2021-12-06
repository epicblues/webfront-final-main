import React from "react";
import { useState } from "react";
import Dropdown from "./Dropdown";
import Progress from "./Progress";

const FinalTotalSum = ({ diary, user, }) => {
  function getTotalNutrients() {
    const result = { kcal: 0, carbs: 0, fat: 0, prot: 0 };
    const toNumberCheck = (input) => {
      return input === "-" ? 0 : input;
    };
    diary.meals.forEach((meal) => {
      meal.foods.forEach((food) => {
        const isRecipe = typeof food._id === "number";
        console.log(food);
        result.kcal +=
          (isRecipe ? food.nutrition.kcal : toNumberCheck(food.kcal)) *
          food.quantity;
        result.carbs +=
          (isRecipe ? food.nutrition.carbs : toNumberCheck(food.carbs)) *
          food.quantity;
        result.fat +=
          (isRecipe ? food.nutrition.fat : toNumberCheck(food.fat)) *
          food.quantity;
        result.prot +=
          (isRecipe ? food.nutrition.prot : toNumberCheck(food.prot)) *
          food.quantity;
      });
    });
    Object.keys(result).forEach((key) => {
      result[key] = result[key].toFixed(0);
    });
    return result;
  }
  const finalTotalSum = getTotalNutrients();

  // -----select option-----
  // 탄수화물: 총 섭취 탄수화물 / 4kcal (탄수화물 1g당 칼로리)
  // 지방: 총 섭취 지방 / 9kcal (지방 1g당 칼로리)
  // 단백질: 총 섭취 단백질 / 4kcal (단백질 1g당 칼로리)

  // 유지: 하루 권장kcal
  // 비율: 탄수화물 50%, 지방20%, 단백질30%
  function managingDiet_M() {
    const result = {
      kcal: user.activity,
      carbs: (user.activity * 0.5) / 4,
      fat: (user.activity * 0.2) / 9,
      prot: (user.activity * 0.3) / 4,
    };
    return result;
  }
  const maintenance = managingDiet_M();

  // 컷팅: 하루 권장kcal - 500kcal
  // 비율: 탄수화물 30%, 지방30%, 단백질40%
  function managingDiet_C() {
    const result = {
      kcal: user.activity - 500,
      carbs: ((user.activity - 500) * 0.3) / 4,
      fat: ((user.activity - 500) * 0.4) / 9,
      prot: ((user.activity - 500) * 0.3) / 4,
    };
    return result;
  }
  const cutting = managingDiet_C();

  // 벌크업: 하루 권장kcal + 500kcal
  // 비율: 탄수화물 40%, 지방20%, 단백질40%
  function managingDiet_B() {
    const result = {
      kcal: user.activity + 500,
      carbs: ((user.activity + 500) * 0.4) / 4,
      fat: ((user.activity + 500) * 0.2) / 9,
      prot: ((user.activity + 500) * 0.4) / 4,
    };
    return result;
  }
  const bulking = managingDiet_B();

  // Dropdown data 불러오기
  const [selected, setSelected] = useState(0);
  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const managingDatas = [maintenance, cutting, bulking].map((value) => {
    for (const key in value) {
      value[key] = value[key].toFixed(0);
    }
    return value;
  });

  return (
    <div className='final-total-wrap'>
        <Dropdown
                  selected={selected}
                  setSelected={setSelected}
        />
        <Progress
                  done={finalTotalSum.kcal}
                  max={managingDatas[selected].kcal}
        />

        <div className='final-nutrition-total'>
          <div>
            <div>탄수화물</div>
            <div>
              <span>{finalTotalSum.carbs}</span> / {managingDatas[selected].carbs} g
            </div>
          </div>

          <div>
            <div>단백질</div>
            <div>
              <span>{finalTotalSum.prot}</span> / {managingDatas[selected].prot} g
            </div>
          </div>

          <div>
            <div>지방</div>
            <div>
              <span>{finalTotalSum.fat}</span> / {managingDatas[selected].fat} g
            </div>
          </div>
        </div>
    </div>
  );
};

export default FinalTotalSum;
