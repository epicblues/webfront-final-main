import { FaTimes } from 'react-icons/fa'

const Review = ({ review, onDelete, onToggle }) => {
    return (
        <div className={`review ${review.reminder ? 'reminder' : ''}`}
            onDoubleClick={() => onToggle(review.id)}>
            <h3>
                {review.text}{''}
                <FaTimes style={{ color: 'red', cursor: 'Pointer' }}
                        onClick={() => onDelete(review.id)}
                />
            </h3>
            <p>{review.day}</p>            
        </div>
    )
}

export default Review
