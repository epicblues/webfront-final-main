import React from 'react'

const FinalTotalSum = ({
  getTotalSum,
  diary,
  user,
}) => {
    function getTotalNutrients() {
        const result = { kcal: 0, carbs: 0, fat: 0, prot: 0 };
        const toNumberCheck = (input) => {
            return input === "-" ? 0 : input;
          };
        diary.meals.forEach((meal) => {
          meal.foods.forEach((food) => {
            const isRecipe = typeof food._id === "number";
            console.log(food)
            result.kcal +=(isRecipe? food.nutrition.kcal  : toNumberCheck(food.kcal)) * food.quantity;
            result.carbs +=isRecipe? food.nutrition.carbs : toNumberCheck(food.carbs)* food.quantity;
            result.fat +=isRecipe? food.nutrition.fat : toNumberCheck(food.fat)* food.quantity;
            result.prot +=isRecipe? food.nutrition.prot : toNumberCheck(food.prot)* food.quantity;
          });
        });
        Object.keys(result).forEach(key => {
            result[key] = result[key].toFixed(0);
        })
        return result;
      }
    const finalTotalSum = getTotalNutrients();

    
    // 이상적인 비율-> 탄수화물35: 단백질30: 지방35
    // 탄수화물: 총 섭취 탄수화물 / 4kcal (탄수화물 1g당 칼로리) = g
    // 단백질: 총 섭취 단백질 / 4kcal (단백질 1g당 칼로리) = g
    // 지방: 총 섭취 지방 / 9kcal (지방 1g당 칼로리) = g

    // 유지: 권장kcal
    const maintenance = () => {
        finalTotalSum
        
        return
    }
    
    // 컷팅: 권장kcal - 500kcal
    const cutting = () => {
        finalTotalSum - 500
        
        return
    }

    // 벌크업 살찌우기: 권장kcal + 500kcal
    const bulking = () => {
        finalTotalSum + 500
        
        return
    }

    return (
        <div>

            <div className="ui header">
                <i className='utensil spoon icon'></i>
                <div className="content">
                    <div className="ui inline dropdown">
                        <div className="text">Maintenance</div>
                        <i class="dropdown icon"></i>

                        <div class="menu">
                            <div class="header">영양관리 타입 선택</div>
                            <div class="active item" data-text="maintenance">Maintenance</div>
                            <div class="item" data-text="cutting">Cutting</div>
                            <div class="item" data-text="bulking">Bulking</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='ui segments'>
                <div className="ui segment">
                    <div>총 섭취 칼로리</div>
                    <div className="header">{finalTotalSum.kcal}kcal</div>
                </div>

                <div className='ui horizontal segments'>
                    <div className="ui segment">
                        <div>탄수화물</div>
                        <div className="header">{finalTotalSum.carbs}g</div>
                    </div>

                    <div className="ui segment">
                        <div>단백질</div>
                        <div className="header">{finalTotalSum.prot}g</div>
                    </div>

                    <div className="ui segment">
                        <div>지방</div>
                        <div className="header">{finalTotalSum.fat}g</div>
                    </div>
                </div>    
            </div>

        </div>
    )
}

export default FinalTotalSum
