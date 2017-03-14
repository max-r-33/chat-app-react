import React from 'react';

import {addUser} from '../ducks/userDuck.js';
import {addRoom} from '../ducks/roomDuck.js';
import {connect} from 'react-redux';

class setupInputs extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        document.getElementById('name').focus();
    }

    handleRoomNameSubmit(e){
        e.preventDefault();

        let roomName = document.getElementById('name').value;
        this.props.dispatch(addRoom(roomName));

        //transitions background
        document.getElementById('2').style.opacity = 1;
        document.getElementById('1').style.opacity = 0;

        //hides room name input, shows username input and sets focus
        document.getElementById('name').style.display = 'none';
        document.getElementById('username').style.display = 'inline';
        document.getElementById('messageUser').focus();

        //sets roomname
        this.props.setRoomName(roomName);
    }

    handleUsernameSubmit(e){
        e.preventDefault();

        //gets username and saves it to store
        let username = document.getElementById('messageUser').value;
        this.props.dispatch(addUser(username));

        //transitions background
        document.getElementById('3').style.opacity = 1;
        document.getElementById('2').style.opacity = 0;

        //hides username input and shows message view
        document.getElementById('username').style.display = 'none';
        document.getElementById('msgView').style.opacity = 1;

        //focuses messagBox
        document.getElementById('messageBox').focus();
    }

    render(){
        return (
            <section>
                <form onSubmit={event => this.handleRoomNameSubmit(event)} className='roomNameContainer'>
                    <input autoComplete='off' type='text' id='name' placeholder='chat room name' />
                </form>
                <form onSubmit={event => this.handleUsernameSubmit(event)} className='usernameContainer' id='username'>
                    <input autoComplete="off" id='messageUser' type='text' placeholder='username' />
                </form>
            </section>
        )
    }
}

export default connect(state => ({user: state.user, room: state.room}))(setupInputs);
