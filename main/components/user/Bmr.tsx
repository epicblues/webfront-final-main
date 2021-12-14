import React, { ChangeEventHandler, FunctionComponent, useRef } from "react";
import { Icon, Popup } from 'semantic-ui-react';
import { BACKGROUND_COLOR, MAIN_COLOR, MIDDLE_COLOR } from '../../constants';
import { UserBmr } from '../../models';





const Bmr: React.FC<{ userBmr: UserBmr, setUserBmr: React.Dispatch<any> }> = ({ userBmr, setUserBmr }) => {
  const calculateBMR = () => {
    const { age, weight, heightFeet, gender, } = userBmr;

    // Error Message 
    if (!(age && weight && gender !== "" && heightFeet))
      return setUserBmr({ ...userBmr, error: "모든 값을 입력해야 합니다." });

    let bmrCalc = 0;

    if (gender === "1") {
      // 여자
      bmrCalc = Math.round(655 + 9.563 * weight + 1.85 * heightFeet - 4.676 * age);
    } else if (gender === "2") {
      // 남자
      bmrCalc = Math.round(66.5 + 13.75 * weight + 5.003 * heightFeet - 6.755 * age);
    }
    setUserBmr({ ...userBmr, bmr: bmrCalc, flag: true, error: "" })
  }

  const calculateAct = () => {
    const { bmr, activity } = userBmr

    setUserBmr({ ...userBmr, activity: Math.round(+bmr * +activity) })

  }

  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (event) => {
    const name = event.currentTarget.name;
    setUserBmr({ ...userBmr, [name]: event.currentTarget.value })
  }


  const error = (<div className="error" style={{ color: "red", marginBottom: "1rem" }}>
    {userBmr.error}
    <i className="frown outline icon"></i>
  </div>)

  const result = <div className="result">{userBmr.bmr ? userBmr.bmr : "?"}</div>
  const resultAct = <div className="result">{userBmr.activity < 5 ? 0 : userBmr.activity}</div>;
  const activityButton = useRef<HTMLButtonElement>() as React.MutableRefObject<HTMLButtonElement>;

  return (
    <div
      id="bmrcalc"
      style={{
        padding: "20px",
        backgroundColor: BACKGROUND_COLOR,
        // height: "70vh",


      }}
    >
      <div className="ui form">
        <h2 style={{ textAlign: 'left', marginBottom: "20px" }}>
          나의 기초대사량과 <br />하루 권장 칼로리는 몇일까요?
        </h2>
        <h3 style={{ textAlign: "center" }}>
          {userBmr.error && error}

        </h3>
        <div className="inputwrap inline fields">
          <label className="label">성별</label>
          <label>
            <input
              type="radio"
              checked={userBmr.gender === '1'}
              onChange={handleChange}
              className="genderF ui radio checkbox"
              name="gender"
              value={1}
            />
            여성
          </label>
          <label>
            <input
              type="radio"
              checked={userBmr.gender === '2'}
              onChange={handleChange}
              className="genderM ui radio checkbox"
              name="gender"
              value={2}
            />
            남성
          </label>
        </div>

        <div
          className="three fields"
          style={{
            display: "flex",
            justifyContent: "space-between",
            textAlign: "left",
            fontSize: "1.3em"
          }}
        >

          <div className="inputwrap field" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>

            {/* <label className="label">나이</label> */}
            <input
              type="number"
              value={userBmr.age}
              onChange={handleChange}
              className="age"
              name="age"
              min="0"
              max="120"
              placeholder="나이"
              style={{height: '3rem', borderRadius: '10px'}}
            />
          </div>
          <div className="inputwrap field">
            {/* <label className="label">신장(cm)</label> */}
            <input
              type="number"
              value={userBmr.heightFeet}
              onChange={handleChange}
              name="heightFeet"
              className="heightFeet"
              min="0"
              max="999"
              placeholder="신장(cm)"
              style={{height: '3rem', borderRadius: '10px'}}
            />
          </div>
          <div className="inputwrap field">
            {/* <label className="label">체중(kg)</label> */}
            <input
              type="number"
              value={userBmr.weight}
              onChange={handleChange}
              name="weight"
              className="weight"
              min="0"
              max="999"
              placeholder="체중(kg)"
              style={{height: '3rem', borderRadius: '10px'}}
            />
          </div>

        </div>
        <button
          type="button"
          onClick={calculateBMR}
          className="ui teal fluid button"
          style={{ marginBottom: 16, backgroundColor: MAIN_COLOR, borderRadius: '20px', lineHeight: '1.3rem' }}
        >
          기초 대사량 계산하기
        </button>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontWeight: 700, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Popup
              trigger={
                <Icon name="circle outline" size="large" style={{color:"#ff5656"}} />
              }
              header="기초대사량"
              content="우리의 심장이 뛰고, 호흡을 하고, 체온을 유지하며, 뇌가 활동을 하는데 필요한 생명 유지를 위한 최소한의 에너지"
            />
            <p>나의 기초대사량은?</p>
          </div>
          <div style={{ color: "#ff5656", fontSize: "1.2em", fontWeight: 700 }}>{result}</div>
        </div>
        {userBmr.flag && (
          <div className="workout">
            <div className="inputwrap" style={{ marginTop: "16px" }}>
              <select
                className="activity"
                value={userBmr.activity}
                onChange={(event) => { handleChange(event); activityButton.current.disabled = false }}
                name="activity"
                style={
                  { fontSize: "1rem", fontWeight: 700, padding: "5px", height: '3rem', borderRadius: "10px" }
                }
              >
                <option value="">활동 수준을 선택하세요</option>
                <option value="1.2">
                  운동을 거의 또는 전혀 하지 않고 사무직
                </option>
                <option value="1.375">주 1~3일 가벼운 운동</option>
                <option value="1.55">주 3~5일 적당한 운동</option>
                <option value="1.725">주 6~7일 과중한 운동</option>
                <option value="1.9">
                  매우 격렬한 운동 및 육체 노동, 하루에 여러 번 운동
                </option>
              </select>
            </div>
            <button
              type="button"
              ref={activityButton}
              onClick={(event) => { calculateAct(); event.currentTarget.disabled = true }}
              className="ui teal fluid button"
              style={{ margin: "16px 0 16px 0", background: MAIN_COLOR,  borderRadius: '20px', lineHeight: '1.3rem' }}
            >
              하루 권장 칼로리 계산하기
            </button>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
              <div style={{ fontWeight: 700, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Popup
                  trigger={
                    <Icon name="circle outline" size="large" style={{color:"#ff5656"}} />
                  }
                  header="하루 권장 칼로리"
                  content="일반적으로 성인의 경우 남자 2700kcal, 여자 2000kcal 정도로 개개인마다 활동량, 체중, 성별, 건강 상태 등에 따라 하루 권장 섭취량이 달라진다"
                />
                <p>나의 하루에 필요한 에너지량은?</p>
              </div>
              <div style={{ color: "#ff5656", fontSize: "1.2rem", fontWeight: 700}}>{resultAct}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

}

export default Bmr