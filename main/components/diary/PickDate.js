import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";
registerLocale("ko", ko);
import "react-datepicker/dist/react-datepicker.css";

// CSS
import "semantic-ui-css/semantic.min.css";
import { getDateId, returnIdToDate } from "../../util/date";
import axios from "axios";
import { useRouter } from "next/router";

const PickDate = ({ diary, setDiary }) => {
  // Portal Version
  const dateId = diary.upload_date;
  const router = useRouter();
  const [startDate, setStartDate] = useState(returnIdToDate(dateId));
  const [isOpen, setIsOpen] = useState(false);

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
      <i className="calendar alternate outline icon"></i>

      <DatePicker
        withPortal
        dateFormat="yyyy.MM.dd(eee)"
        selected={startDate}
        onChange={dateChangeHandler}
        maxDate={new Date()}
        disabledKeyboardNavigation // 다른 월의 같은 날짜시 자동 selected되는 현상 방지
        locale="ko" // 한국어로 설정
        fixedHeight // calendar의 height 값을 고정시키면 핸재달의 비어있는 칸에 지난달과 다음달의 날짜가 자동 표시
        popperModifiers={{
          // 화면을 벗어나지 않도록 하는 설정
          preventOverflow: { enbled: true },
        }}
        popperPlacement="auto" // 화면 중앙에 팝업이 출현
        renderCustomHeader={({
          // header 커스텀 설정
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div
            style={{ margin: 10, display: "flex", justifyContent: "center" }}
          >
            <div onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              <i className="angle left icon"></i>
            </div>
            <div>{formatDate(date)}</div>
            <div onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              <i className="angle right icon"></i>
            </div>
          </div>
        )}
      >
        {/* <div style={{display: "flex", justifyContent: 'between', alignItems: 'center'}}>
            <button onClick={handleClick} className='ui button'>
              취소
            </button>
            <button onClick={onSaveDay} className='ui button'>
              확인
            </button>
        </div> */}
      </DatePicker>
    </div>
  );
};

export default PickDate;
