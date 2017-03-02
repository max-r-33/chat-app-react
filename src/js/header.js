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
                    <div className='alwaysVisible'>
                        <p className='roomName'>{this.props.roomName}</p>
                        <p className='peopleCount'>{`${this.props.userCount} ${this.props.userCount > 1 ? 'users' : 'user'} in the room`}</p>
                    </div>
                    <p className='userTyping'>{this.props.typingStatus}</p>
                    <p onClick={event => this.handleCloseClick(event)} className='leave'>x</p>
                </header>
                <div className='messageContainer'>
                    {this.props.messages}
                </div>
            </div>
        )
    }
}
