import React, { useState } from "react"
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css";

const SelectDate = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (e) => {
    setStartDate(e);
  };

  const handleClick = (e) => {
    e.preventDefault(); // 확인: 새로고침 방지(submit은 작동됨)
    setIsOpen(!isOpen); // 취소: 버튼 클릭 시 setIsOpen 함수를 호출 -> 상태를 false 로 바꾸어 주어 모달창이 닫힘
    setStartDate(new Date());
  };

  const onSaveDay = () => {
    // axios.post(api 주소)
    // .then((res) => {
    //   if(res.data.ok) {
    //     setIsOpen(!isOpen);
    //     TransformStream.success(`날짜가 저장되었습니다`, {autoClose: 3000, position: toast.POSITION.TOP_RIGHT });
    //   } else {
    //     toast.error(res.data.error, {autoClose: 3000, position: toast.POSITION.TOP_RIGHT});
    //   }
    // })
    // .catch((err) =>
    //   console.log(err)
    // );
  }

  const formatDate = (d) => { // 달력 년, 월, 일 header
    const date = new Date(d);
    const monthIndex = date.getMonth() + 1;
    const year = date.getFullYear();
    
    return `${year}년 ${`0${monthIndex}`.slice(-2)}월`;
  };

  return (
    // tailwind CSS
    <div className={"fixed bottom-16 left-0 z-10 w-full flex-shrink-0 transition-all transform duration-300" + (isOpen ? " " : " translate-y-full" )}>
      <div className='boxshadow relative p-4 bg-white rounded-t-3xl shadow-inner text-center'>
        <div className='text-gray-600 mb-4'>
          <h1 className='text-lg font-bold mb-2'>선택일</h1>
        </div>

        <DatePicker
          selected={startDate}
          onChange={handleChange}
          disabledKeyboardNavigation // 다른 월의 같은 날짜시 자동 selected되는 현상 방지
          locale="ko" // 한국어로 설정
          inline // 팝업이 아닌 inline
          maxDate={new Date()}
          popperModifiers={{ // 화면을 벗어나지 않도록 하는 설정
            preventOverflow: { enbled: true }
            }}
          popperPlacement="auto" // 화면 중앙에 팝업이 출현
          renderCustomHeader={({ date, decreaseMonth, increaseMonth })=> ( // header 커스텀 설정 
          
          <div className="datepickerHeader">
            <div onClick={decreaseMonth}>
              <p>&lt;</p>
            </div>
            <div>{formatDate(date)}</div>
            <div onClick={increaseMonth}>
              <p>&gt;</p>
            </div>
          </div>
          )}
        />

        <div className='flex justify-between items-center pt-4 px-10 gap-4'>
          <button onClick={handleClick} className='w-1/2 bg-gray-point py-2 rounded=md text-white'>
            취소
          </button>
          <button onClick={onSaveDay} className='w-1/2 bg-yellow-point py-2 rounded=md text-gray-600'>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectDate
