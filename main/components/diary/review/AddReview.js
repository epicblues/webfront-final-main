import { useState } from 'react'

const AddReview = ({ onAdd }) => {
    const [text, setText] = useState('')
    const [reminder, setReminder] = useState(false)
    
    const onSubmit = (e) => {
        e.preventDefault()

        if(!text) {
            alert('Please add a review')
            return
        }
        onAdd({ text, reminder })

        setText('')
        setReminder(false)
    }
        
    return (
        <form className='ui form' onSubmit={onSubmit}>
            <div className='field'>
                <label>오늘의 일기
                    <i className='pencil alternate icon'></i>
                </label>
                <textarea type='text'
                        placeholder='Add Review'
                        value={text}
                        onChange={(e) => setText(e.target.value)} />
            </div>

            <div className='ui checkbox'>
                <label>Set Reminder</label>
                <input type='checkbox' name='example'
                    checked={reminder}
                    value={reminder}
                    onChange={(e) => setReminder(e.currentTarget.checked)} />
            </div>

            <button type='submit'
                    className='ui button'>작성완료</button>

            
        </form>
    )
}

export default AddReview
