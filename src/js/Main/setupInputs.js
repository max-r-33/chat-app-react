import React from 'react';
import anime from 'animejs';
import ProgressBar from './ProgressBar/progressBar';

import {addUser} from '../ducks/userDuck.js';
import {addRoom} from '../ducks/roomDuck.js';
import {connect} from 'react-redux';

class setupInputs extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        document.getElementById('roomName').focus();
    }

    onError(element){
        anime({
            targets:element,
            translateX: {
                value: '+=1000px',
                elasticity:500,
            },
            duration:30,
            loop:2,
            direction: 'alternate'
        });
    }

    handleRoomNameSubmit(e){
        e.preventDefault();
        let roomName = document.getElementById('roomName').value;
        if(roomName){
            this.refs.progressBar.advance();
            this.props.dispatch(addRoom(roomName));

            //transitions background
            document.getElementById('2').style.opacity = 1;
            document.getElementById('1').style.opacity = 0;

            //hides room name input, shows username input and sets focus
            document.getElementById('roomName').style.display = 'none';
            document.getElementById('username').style.display = 'inline';
            document.getElementById('messageUser').focus();
        }else{
            this.onError('#roomName')
        }
    }

    handleUsernameSubmit(e){
        e.preventDefault();
        let username = document.getElementById('messageUser').value;
        if(username){
            this.refs.progressBar.advance();

            document.getElementById('username').style.display = 'none';

            //gets username and saves it to store
            this.props.dispatch(addUser(username));
            this.props.setUpRoom(this.props.room.name, username);
            document.getElementById('3').style.opacity = 1;
            document.getElementById('2').style.opacity = 0;
            setTimeout(() => {
                //transitions background
                document.getElementsByClassName('progressBar')[0].style.display = 'none';

                //hides username input and shows message view
                document.getElementById('msgView').style.opacity = 1;

                //focuses messagBox
                document.getElementById('messageBox').focus();
            },1000);
        }else{
            this.onError('#messageUser')
        }
    }

    render(){
        return (
            <section>
                <form onSubmit={event => this.handleRoomNameSubmit(event)} className='roomNameContainer'>
                    <input autoCorrect='off' autoCapitalize='none' autoComplete='off' type='text' id='roomName' placeholder='chat room name' />
                </form>
                <form onSubmit={event => this.handleUsernameSubmit(event)} className='usernameContainer' id='username'>
                    <input autoCorrect='off' autoCapitalize='none' autoComplete="off" id='messageUser' type='text' placeholder='username' />
                </form>
                <ProgressBar labelText={['Room Name', 'Username', 'Creating room']} ref='progressBar'/>
            </section>
        )
    }
}

export default connect(state => ({user: state.user, room: state.room}))(setupInputs);
