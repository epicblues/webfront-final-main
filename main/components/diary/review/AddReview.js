import { useState } from "react";
import PickDate from "../PickDate";
import MultiBtn from "../meal/MultiBtn";

const AddReview = ({ onAdd, showAdd, multiBtn, setWritingMode }) => {
  const [text, setText] = useState("");
  const [reminder, setReminder] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert("Please add a review");
      return;
    }
    onAdd({ text, reminder });

    setText("");
    setReminder(false);
  };

  return (
    <>
      <div
          style={{padding: '0 1rem 1rem 1rem'}}
          className="AddReview"
          onClick={(e) => {
            e.preventDefault();
            setWritingMode();
          }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "16px",
            height: '24px'
          }}
        >
          <MultiBtn
            color={showAdd ? "#a0a0a0" : "#02b0b0"}
            text={showAdd ? "취소" : "완료"}
            onClick={multiBtn}
            type="submit"
          />
          날짜 데이터
          {/* <PickDate /> */}
        </div>

        <form className="ui form" onSubmit={onSubmit}>
        
          <textarea
            type="text"
            placeholder="Add Review"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button
            type="submit"
            className="fluid ui button teal"
            style={{ margin: "1rem 0 1rem 0" }}
          >
            작성완료
          </button>
        </form>
      </div>
     </>
  );
};

export default AddReview;
