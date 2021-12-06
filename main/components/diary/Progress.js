import React from "react";
import { PieChart } from "react-minimal-pie-chart";

// ICON
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire} from "@fortawesome/free-solid-svg-icons";

const Progress = ({ done, max }) => {
  const percent = `${((done / max) * 100).toFixed(0)}`;
  return (
    <div className='progress'>
    <FontAwesomeIcon icon={faFire} className='icon' />
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
