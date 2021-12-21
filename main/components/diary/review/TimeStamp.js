import React, { useState} from 'react'

function TimeStamp () {
    const [currentTime, setCurrentTime] = useState("00:00");

    const CurrentTimer = () => {
        const date = new Date();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");    
        // const seconds = String(date.getSeconds()).padStart(2, "0");
        setCurrentTime(`${hours}:${minutes}`)
    }

    const startTimer = () => {
        setInterval(CurrentTimer, 1000)
    }

    startTimer()
        
    return (
        <div>
            {timer}
        </div>
    )
}

export default TimeStamp
