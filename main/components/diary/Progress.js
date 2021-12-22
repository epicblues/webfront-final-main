import React from "react";
// react-minimal-pie-chart
import { PieChart } from "react-minimal-pie-chart";
// react-icons
import { AiOutlineFire } from "react-icons/ai";
// css
import MainStyles from '../../styles/diary/Main.module.css';

const Progress = ({ done, max }) => {
  const percent = `${((done / max) * 100).toFixed(0)}`;
  return (
    <div className={MainStyles.progress}>
    <AiOutlineFire className={MainStyles.icon} />
    <PieChart
      className={MainStyles.donutChart}
      data={[
        {
          value: done,
          color: "#fff"
        }
      ]}
      totalValue={max}
      reveal={done}
      lineWidth={18}
      background="rgba(255, 255, 255, 0.5)"
      lengthAngle={360}
      rounded
      animate
      label={({ dataEntry }) => dataEntry.value + "/" + max}
      labelStyle={{
        font: 'normal 800 1rem "NanumSquare"',
        fill: '#fff',
      }}
      labelPosition={0}
      />
      <p>
        kcal
      </p>
    </div>
  );
};

export default Progress;
