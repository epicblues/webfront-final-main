import React from 'react';
import Link from 'next/link'

import 'semantic-ui-css/semantic.min.css';


function Snack() {
    return(
        <Link href="/AddFood">
            <div className='mealBox'
                    style={{ width: '100%', flex: '50%',
                            boxShadow: '0 0 0 1px black', marginBottom: 10 }}>
                <a>
                    <i className='plus icon'></i>
                </a>
            </div>
        </Link>
    )
}

export default Snack