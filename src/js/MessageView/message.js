import React from 'react';

export default class Message extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div data-aos={this.props.sender === 'user' ? 'slide-left' : 'slide-right'}
                 data-aos-duration='220'
                 data-aos-once='true'
                 data-aos-offset='-10'>
                <span className={`${this.props.sender} message`}>
                    {this.props.message}
                </span>
            </div>
        )
    }
}
