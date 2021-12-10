import React from "react";
import { PieChart } from "react-minimal-pie-chart";
// import { VscFlame } from "react-icons/vsc";
import { AiOutlineFire } from "react-icons/ai";

const Progress = ({ done, max }) => {
  const percent = `${((done / max) * 100).toFixed(0)}`;
  return (
    <div className='progress'>
    {/* <VscFlame className='icon'/> */}
    <AiOutlineFire className='icon' />
    <PieChart
      className='donut-chart'
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
        fontSize: '1rem',
        fontWeight: '600',
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
