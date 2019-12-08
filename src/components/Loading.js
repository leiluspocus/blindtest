import React, { Component } from 'react';

class Loading extends Component {

    constructor(props) {
        super(props);
        console.log('constructor loading');   
    }

    render() {
        return <div>
            Loading !
            <svg width="100" height="100">
            <circle cx="50" cy="50" r="40" stroke="green" strokeWidth="1" fill="red" />
            Sorry, your browser does not support inline SVG.
            </svg> 
        </div>
    }
}

export default Loading;