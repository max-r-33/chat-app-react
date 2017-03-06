import React from 'react';

import Header from './header';

export default class messageView extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className='messageView' id='msgView'>

                {/* room header */}
                <Header roomName={this.props.roomName}
                        userCount={this.props.userCount}
                        typingStatus={this.props.typingStatus}/>

                {/* message display */}
                <div className='messagesDisplay'>
                    <div ref='msg'>
                        {this.props.messages}
                    </div>
                </div>

                {/* message input box */}
                <form onChange={event => this.props.typingNotif(event)}
                      onSubmit={event => this.props.sendMessage(event, document.getElementById('messageBox').value)}
                      className='messageSendContainer'>
                      <input autoComplete="off"
                             id='messageBox'
                             type='text'
                             placeholder='message' />
                </form>
            </div>
        )
    }
}
