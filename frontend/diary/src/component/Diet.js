import React, { Component } from 'react'

export class Diet extends Component {

    constructor(props) {
        super(props);
        

    }
    
    render() {
        return (
            <div>
                this is diet {this.props.title}
                {this.props.number}
            </div>
        )
    }
}

export default Diet
