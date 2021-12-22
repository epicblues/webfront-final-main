import React, { useState} from 'react'

function TimeStamp () {
    const [currentTime, setCurrentTime] = useState("yyyy.mm.dd.00:00");

    const CurrentTimer = () => {
        const date = new Date();
        
        const year = String(date.getFullYear()).padStart(4, "0");
        const month = String(date.getMonth()).padStart(2, "0");
        const day = String(date.getDay()).padStart(2, "0");

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
