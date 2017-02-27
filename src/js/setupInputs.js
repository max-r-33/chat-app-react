import React from 'react';

export default class setupInputs extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        document.getElementById('name').focus();
    }

    handleRoomNameSubmit(e){
        e.preventDefault();
        let roomName = document.getElementById('name').value;
        document.getElementById('2').style.opacity = 1;
        document.getElementById('1').style.opacity = 0;
        document.getElementById('name').style.display = 'none';
        document.getElementById('username').style.display = 'inline';
        document.getElementById('messageUser').focus();
        this.props.setRoomName(roomName);
    }

    handleUsernameSubmit(e){
        e.preventDefault();
        let username = document.getElementById('messageUser').value;
        document.getElementById('3').style.opacity = 1;
        document.getElementById('2').style.opacity = 0;
        document.getElementById('username').style.display = 'none';
        document.getElementById('messageContainer').style.display = 'inline';
        document.getElementById('messages').style.display = 'inline';
        document.getElementById('messageBox').focus();
        this.props.setUsername(username);
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
                <form onSubmit={event => this.props.sendMessage(event, document.getElementById('messageBox').value)}className='messageSendContainer' id='messageContainer'>
                        <input autoComplete="off" id='messageBox' type='text' placeholder='message' />
                </form>
            </section>
        )
    }
}
