import 'semantic-ui-css/semantic.min.css';

const Review = ({ review, onDelete, onToggle }) => {
    return (
        <div className={`review ${review.reminder ? 'reminder' : ''}`}
            onDoubleClick={() => onToggle(review.id)}>
            <h3>
                {review.text}{''}
                <button className="ui button"
                        onClick={() => onDelete(review.id)}
                >
                    삭제
                </button>
            </h3>
            <p>{review.day}</p>            
        </div>
    )
}

export default Review
