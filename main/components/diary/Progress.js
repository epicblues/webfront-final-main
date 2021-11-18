import React from 'react'
import { useState } from 'react';

const Progress = ({ done }) => {
    const [style, setStyle] = useState({});

    setTimeout(() => {
        const newStyle = {
            opacity: 1,
            width:`${done}`,
            background: 'linear-gradient(to left, #F2709C, #FF9472)',
            boxShadow: '0 3px 3px -5px #F2709C, 0 2px 5px #F2709C',
            borderRadius:'20px',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: 0,
            opacity: 0,
            transition: '1s ease 0.3s'
        }
        setStyle(newStyle);
    }, 1000);

    return (
        <div className='progress'
            style={{backgroundColor: '#d8d8d8',
                    borderRadius: '20px',
                    position: 'relative',
                    margin: '15px 0',
                    height: '30px',
                    width: '300px'
                }}>
            <div className='progress-done' style={style}>
                {done}
            </div>
        </div>
    )
}

export default Progress
