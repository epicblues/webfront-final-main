import React, { useState } from "react"
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css";

// import getYear from "date-fns/getYear";
// import getMonth from "date-fns/getMonth";

const Example = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker selected={startDate}
                onChange={(date) => setStartDate(date)} />
  );
};

export default Date
