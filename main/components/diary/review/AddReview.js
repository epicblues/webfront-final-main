import { useState } from "react";

const AddReview = ({ onAdd }) => {
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
    <form className="ui form" onSubmit={onSubmit}>
      
        <textarea
          type="text"
          placeholder="Add Review"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

      <button
        type="submit"
        className="fluid ui button"
        style={{ margin: "1rem 0 1rem 0" }}
      >
        작성완료
      </button>
    </form>
  );
};

export default AddReview;
