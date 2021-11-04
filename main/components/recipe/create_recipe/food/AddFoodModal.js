import React, { useState} from 'react';
import axios from 'axios';
import modalStyles from '../../../../styles/Modal.module.css';

const AddFoodModal = ({ setIsModalVisible }) => {
    //  검색필터
    const [filteredData, setFilteredData] = useState([]);
    const [selectedData, setSelectedData] = useState([]);
    const [isDataSelected, setIsDataSelected] = useState(false);
    const handleSearch = async (event) => {
      const value = event.target.value;
      const { data } = await axios.get("/api/food/" + value);
      console.log(data);
      setFilteredData(data);
    }
    const onSubmitBtn = () => {
        setIsModalVisible(false);
    }
    const onCancelBtn = () => {
        setIsModalVisible(false);
    }
    const onSelectBtn = (data) => {
        setSelectedData(data)        
        setIsDataSelected(true)
    }

    return (
        <div className={modalStyles.modal}>
            <div>
                <h3>재료 검색하기</h3>
                <input 
                    type='text' 
                    placeholder='음식/제품명 검색하기'
                    onChange={(event) => handleSearch(event)}
                />
                {!isDataSelected &&
                <div>
                    {filteredData.map((value, index) => {
                        return (
                            //  검색 리스트 출력
                            <div 
                                key={index}
                                className={modalStyles.products}
                            >
                                <div>
                                    {value.name} / 
                                    {value.mfr}
                                    <button 
                                        type='button'
                                        onClick={() => onSelectBtn(value)}
                                    >
                                        선택
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                }
            </div>
            <div>
                {isDataSelected &&
                    <>                    
                        <h4>선택한 음식</h4>
                        <div>
                            {/* {selectedData.map((value, index) => {
                                return (
                                    <div key={index}>
                                        {value.name}
                                    </div>
                                );
                            })} */}
                        </div>
                        <input 
                            type='text'
                        />
                    </>
                }
            </div>
            <div>
                <button onClick={() => onSubmitBtn(false)}>확인</button>
                <button onClick={() => onCancelBtn(false)}>취소</button>
            </div>
        </div>
    )
}


export default AddFoodModal