import React from 'react'
import modalStyles from '../../../../styles/Modal.module.css'

const AddFoodModal = ({ setIsModalVisible }) => {
    const onSubmitBtn = () => {
        setIsModalVisible(false);
    }
    const onCancelBtn = () => {
        setIsModalVisible(false);
    }
    return (
        <div className={modalStyles.modal}>
            <div>
                모달
            </div>
            <div>
                <button onClick={() => onSubmitBtn()}>확인</button>
                <button onClick={() => onCancelBtn()}>취소</button>
            </div>
        </div>
    )
}


export default AddFoodModal