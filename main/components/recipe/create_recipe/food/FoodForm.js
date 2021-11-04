import React from 'react'
import AddFoodModal from './AddFoodModal'

const FoodForm = ({ isModalVisible, setIsModalVisible }) => {
    const onModalBtn = (active) => {
        setIsModalVisible(active)
    }
    return (
        <div>
            <div>재료 창</div>
            <button onClick={() => onModalBtn(true)}>
                재료추가하기
            </button>
            <div>
                {isModalVisible &&
                (
                    <AddFoodModal
                        setIsModalVisible={setIsModalVisible}
                    />
                )}
            </div>
        </div>
    )
}

export default FoodForm
