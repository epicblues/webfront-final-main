import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, } from 'react-router-dom';

import AddButton from "../AddButton";


function Dinner() {
    return(
        <Link to = "/AddFood">
            <AddButton />
        </Link>
    )
}

export default Dinner