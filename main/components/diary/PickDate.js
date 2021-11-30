import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";
registerLocale("ko", { ...ko, options: { ...ko.options, weekStartsOn: 1 } }); // 주시작일 - 일요일:0 월요일:1
import "react-datepicker/dist/react-datepicker.css";

import { getDateId, returnIdToDate } from "../../util/date";
import axios from "axios";
import { useRouter } from "next/router";

const PickDate = ({ diary, setDiary, isOpen, setIsOpen }) => {
  // Portal Version
  const dateId = diary.upload_date;
  const router = useRouter();
  const [startDate, setStartDate] = useState(returnIdToDate(dateId));

  const CustomInput = ({ value, onClick }) => (
    <div className='customInput' onClick={onClick}>
      {/* {value} */}
      <i className='calendar alternate outline icon'></i>
    </div>
  );

  const dateChangeHandler = async (date) => {
    const dateId = getDateId(date);
    try {
      const { data } = await axios.get("/api/diary/" + dateId);
      setDiary(data.newDiary);
      setStartDate(date);
    } catch (error) {
      const status = Number(error.message.substr(error.message.length - 3));
      if (status === 404) {
        alert("해당 날짜에 저장된 일지가 없습니다.");
      } else if (status === 401) {
        router.push("/user/login");
      }
    }
  };

  const formatDate = (d) => {
    // 달력 년, 월, 일 header
    const date = new Date(d);
    const monthIndex = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${year}년 ${`0${monthIndex}`.slice(-2)}월`;
  };

  return (
    <div>
        <DatePicker
          withPortal
          dateFormat="MM/yyyy"
          selected={startDate}
          onChange={dateChangeHandler}
          maxDate={new Date()}
          disabledKeyboardNavigation // 다른 월의 같은 날짜시 자동 selected되는 현상 방지
          locale="ko" // 한국어로 설정
          popperModifiers={{
            preventOverflow: { enbled: true } // 화면을 벗어나지 않도록 하는 설정
          }}
          //inline
          popperPlacement="auto" // 화면 중앙에 팝업이 출현
          customInput={<CustomInput />}
          renderCustomHeader={({
            // header 커스텀 설정
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div style={{ margin: "10px", display: "flex", justifyContent: "space-between" }}>
              <div onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                <i className="large grey angle left icon"></i>
              </div>
              <div style={{font: 'normal bold 1.2rem/100% "Montserrat"'}}>
                {formatDate(date)}
              </div>
              <div onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                <i className="large grey angle right icon"></i>
              </div>
            </div>
          )}
        />
    </div>
  );
};

export default PickDate;
