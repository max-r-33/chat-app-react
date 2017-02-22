import React from 'react';

export default class header extends React.Component {
    constructor(props){
        super(props);
    }
    handleCloseClick(e){
        if(confirm('Are you sure you want to leave the chat room?')){
            window.location.href='/';
        }
    }
    render() {
        return (
            <div id='messages'>
                <header>
                    <p className='roomName'>{this.props.roomName}</p>
                    <p className='peopleCount'></p>
                    <p id='userTyping'></p>
                </header>
                <p onClick={event => this.handleCloseClick(event)} className='leave'>x</p>
            </div>
        )
    }
}
