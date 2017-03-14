import React from 'react';
import scrollToComponent from 'react-scroll-to-component';

import {connect} from 'react-redux';
import {removeUser} from '../../ducks/userDuck';

class header extends React.Component {
    constructor(props){
        super(props);
    }

    handleCloseClick(e){
        if(confirm('Are you sure you want to leave the chat room?')){
            this.props.dispatch(removeUser(username));
            window.location.href='/';
        }
    }

    componentDidUpdate(){
        scrollToComponent(this.refs.msg,{
            offset: 1000,
            duration:100
        });
    }

    render() {
        return (
            <header>
                <p className='roomName'>{this.props.roomName}</p>
                <p className='peopleCount'>{`${this.props.userCount} ${this.props.userCount > 1 ? 'users' : 'user'} in the room`}</p>
                <p className='userTyping'>{this.props.typingStatus}</p>
                <p onClick={event => this.handleCloseClick(event)} className='leave'>x</p>
            </header>
        )
    }
}

export default connect(state => ({storeUser : state.storeUser}))(header);
