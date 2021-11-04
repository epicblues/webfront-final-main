import React from 'react'
import AddFoodModal from './AddFoodModal'

const FoodForm = ({ handleSetIsModalVisible, isModalVisible, setIsModalVisible }) => {
    return (
        <div>
            <div>재료 창</div>
            <button onClick={() => handleSetIsModalVisible(true)}>
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
