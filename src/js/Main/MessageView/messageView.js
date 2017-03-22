import React from 'react';
import Header from './header';
import scrollToComponent from 'react-scroll-to-component';
import {connect} from 'react-redux';


class messageView extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidUpdate(){
        scrollToComponent(this.refs.msg, {
            offset: 2000,
            duration:100
        });
    }

    render(){
        return (
            <div className='messageView' id='msgView'>

                {/* room header */}
                <Header userCount={this.props.userCount}
                        typingStatus={this.props.typingStatus}/>

                {/* message display */}
                <div className='messagesDisplay' id='msgDisplay'>
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

export default connect(state => ({user : state.user}))(messageView);
