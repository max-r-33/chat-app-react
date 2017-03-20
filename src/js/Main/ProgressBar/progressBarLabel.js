import React from 'react';

export default class progressBarLabel extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className={`progressLabel ${this.props.active === this.props.elemNumber ? 'active' : ''}`}>{this.props.text}</div>
        );
    }
}
