import PropTypes from 'prop-types'
import Button from './Button'

import 'semantic-ui-css/semantic.min.css';

const ReviewHeader = ({ title, onAdd, showAdd }) => {
    return (
        <header className='ui header'
                style={{marginTop: 20}}>
            <h1 className="ui Large header" style={{display: 'inline-block'}}>{title}</h1>
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

export default ReviewHeader
