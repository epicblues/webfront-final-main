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
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>오늘의 일기</label>
                <textarea type='text' placeholder='Add Review' style={{ width: '440px', height: '220px' }}
                    value={text} onChange={(e) => setText(e.target.value)} />
            </div>

            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input type='checkbox'
                    checked={reminder}
                    value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)} />
            </div>

            <input type='submit' value='작성완료'
                    className='btn btn-block' />
            
        </form>
    )
}

export default AddReview
