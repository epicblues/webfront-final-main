// react-icons
import { BiX } from "react-icons/bi";

const Review = ({ review, onDelete, onToggle }) => {
  return (
      <div className={`review`}
            style={{
              borderRadius: '10px',
              padding: '1rem 1rem 0 1rem',
              marginBottom: '1rem',
              display: 'grid',
              gridTemplateColumns: '9.75fr 0.25fr',
              gridAutoRows: 'minmax(4rem, auto)',
              textAlign: 'left',
              font: 'normal 400 1rem "Noto Sans KR"',
              boxShadow: '1px 1px 3px 1px #dadce0'
            }}
      >
        <p>
          {review.text}
          {""}
        </p>
        <BiX onClick={() => onDelete(review.id)} size='1.6rem' />
      </div>
  );
};

export default Review;
