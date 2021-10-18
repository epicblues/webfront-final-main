import PropTypes from 'prop-types'
import Button from './Button'
import '../../../src/index.css'

const ReviewHeader = ({ title, onAdd, showAdd }) => {
    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button color={showAdd ? 'red' : 'green'}
                    text={showAdd ? '취소' : '작성'}
                    onClick={onAdd} />
        </header>
    )
}

ReviewHeader.defaultProps = {
    title: '오늘의 일기',
}

ReviewHeader.propTypes = {
    title: PropTypes.string.isRequired,
}

// CSS in JS
// const headingStyle = {
//     color:'red',
//     backgroundColor: 'black'
// }

export default ReviewHeader
