import React from 'react'
import modalStyles from '../../../../styles/Modal.module.css'

const MeasuringModal = ({setIsMeasuringModalVisible}) => {
    const onXBtn = () => {
        setIsMeasuringModalVisible(false)
    }
    return (
        <div className={modalStyles.modal}>
            <button type='button' onClick={() => onXBtn(false)}>X</button>
            <h3>계량 팁</h3>
            <p>한 눈으로 살펴보는 간단한 계량팁을 준비했어요~ <br/>
               요리를 하려는데 계량 기구가 없다면<br />
               다른 도구를 사용하거나 사진 속 분량을 보고 눈대중으로 헤아려서 할 수 있어요!
            </p>
            <h4>밥숟가락 계량</h4>
            <p>테이블스푼(T)과 티스푼(t)은 어느 정도일까요?</p>
            <p>- 성인용 밥숟가락으로 계량해 볼 수 있어요.</p>
            <p>(계량 예시 이미지 1)</p>
            <p>1 테이블스푼 (1T) = 15ml</p>
            <p>밥숟가락 1 큰술 정도의 양</p>
            <p>(계량 예시 이미지 2)</p>
            <p>1 티스푼 (1t) = 5ml</p>
            <p>밥숟가락 1/3 큰술 정도의 양</p>
            <br />
            <h4>종이컵 계량</h4>
            <p>밥숟가락 단위보다 더 많은 양은 어떻게 계량해야 할까요?</p>
            <p>- 소형 종이컵에 한 컵 가득 담은 양을 참고하여 가늠해볼 수 있어요.</p>
            <p>(계량 예시 이미지 3)</p>
            <p>액체 가득 1 컵 = 약 180ml</p>
            <p>(계량 예시 이미지 4)</p>
            <p>윗면을 깎아낸 밀가루 1 컵 = 약 100g</p>
            <br />
            <h4>재료별 분량</h4>
            <p>자주 쓰는 재료들의 무게가 궁금해요!</p>
            <p>- 사진에 담긴 재료의 양을 참고하여 눈대중으로 분량을 재어봅시다.</p>
            {/* 각 재료 윗 부분에 재료 사진 삽입 */}
            <span>양파(1/4개=50g),</span>
            <span>마늘(1쪽=5g),</span>
            <span>생강(1톨 = 약 15g),</span>
            <span>생강(1톨 = 약 15g),</span>
            <br/>
            <span>당근(1/2개=약100g),</span>
            <span>무(1토막=약150g),</span>
            <span>애호박(1/2개=약150g),</span>
            <span>돼지고기(1토막=약200g)</span>
            <br/>
            <br/>
            <button type='button' onClick={() => onXBtn(false)}>네, 알겠어요</button>
        </div>
    )
}

export default MeasuringModal
