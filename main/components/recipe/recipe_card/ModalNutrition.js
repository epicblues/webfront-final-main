import React, {useState} from 'react'

const ModalNutrition = ({setIsModalVisible, ingredients}) => {
    const onModalBtn = (val) => {
        setIsModalVisible(val)
        console.log(ingredients)
    }

    const forEachNutrition = () => {
        ingredients.forEach((value, index) => {
            return(
                console.log(value)
            );
        })
        let summarizeNutrition = {
            kcal: '',
            carbs: '',
            sugars: '',
            prot: '',
            fat: '',
            stdfat: '',
            trnfat: '',
            chole: '',
            sodium: ''
        }
    }

    
    const [totalNutrition, setTotalNutrition] = useState()
    return (
        <div>
            식품정보 Modal
            <button
                type='button'
                onClick={() => onModalBtn(false), forEachNutrition()}
            >
                X
            </button>
            <div>
                <ul>
                    <li>칼로리: </li>
                    <li>탄수화물: </li>
                    <li> 당류: </li>
                    <li>단백질: </li>
                    <li>지방: </li>
                    <li> 포화지방: </li>
                    <li> 트랜스지방: </li>
                    <li>콜레스테롤</li>
                    <li>나트륨: </li>
                </ul>
            </div>
        </div>
    )
}

export default ModalNutrition
