import React from 'react'
import modalBlackoutStyles from '../../../../styles/ModalBlackout.module.css'

const MeasuringModalBlackout = ({ handleSetIsMeasuringModalVisible }) => {
    return (
        <div
            className={modalBlackoutStyles.blackout}
            onClick = {() => handleSetIsMeasuringModalVisible(false)}
        >
        </div>
    )
}

export default MeasuringModalBlackout