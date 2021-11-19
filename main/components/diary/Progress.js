import React, { useEffect } from 'react'
import { useState } from 'react';

const Progress = ({ done, max }) => {
    
    const percent = `${(done/max * 100).toFixed(0)}%`

    return (
        <div className='progress'>
            
            <div className='progress-done' style={{opacity:1, width: percent}}>
                
            </div>
        </div>
    )
}

export default Progress
