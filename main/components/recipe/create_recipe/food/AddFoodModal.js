import React, { useState} from 'react';
import axios from 'axios';
import modalStyles from '../../../../styles/Modal.module.css';

const AddFoodModal = ({ setIsModalVisible }) => {
    //  검색필터
    const [allData, setAllData] = useState([]);
    const [filteredData, setFilteredData] = useState(allData);
    const handleSearch = async (event) => {
      const value = event.target.value;
      const { data } = await axios.get("/api/food/" + value);
      console.log(data);
      setFilteredData(data);
    }
    //  확인버튼
    const onSubmitBtn = () => {
        setIsModalVisible(false);
    }
    //  취소버튼
    const onCancelBtn = () => {
        setIsModalVisible(false);
    }
    return (
        <div className={modalStyles.modal}>
            <div>
                <h3>재료 추가하기</h3>
                <input 
                    type='text' 
                    placeholder='음식/제품명 검색하기'
                    onChange={(event) => handleSearch(event)}
                />
                <div>
                    {filteredData.map((value, index) => {
                        return (
                            //  검색 리스트 출력
                            <div key={value.id}>
                                <div>
                                    {value.name}
                                    {value.mfr}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div>
                <button onClick={() => onSubmitBtn()}>확인</button>
                <button onClick={() => onCancelBtn()}>취소</button>
            </div>
        </div>
    )
}


export default AddFoodModal