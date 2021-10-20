//  data NutritionData.js
//  재료 정보 받아와서 총 영양정보 저장하는 Data 혹은 Function
//  단위 세부적으로 설명적어줄 것 (carbonHydrate 단위 : g, sodium 단위 : mg 등 ..)
let NtrData =
[
    {
        Igr_no: 1,  //  PK(IngredientData에서 받아오면 될 듯)
        ntr_carbonHydrate: 10,
        ntr_fat: 10,
        ntr_sodium: 5,
    }
]

//  NtrData 각 객체의 칼로리 합산하여 저장하는 Data
let CalData = 120 //  (NtrData[0].ntr_carbonHydrate * 4) + (NtrData[0].ntr_fat * 9) ... + (NtrData[10].ntr_fat * 9) + ... 
export default {NtrData, CalData};