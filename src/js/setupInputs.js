import React from 'react';

export default class setupInputs extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        document.getElementById('name').focus();
        console.log(this.props);
    }

    handleRoomNameSubmit(e){
        e.preventDefault();
        let roomName = document.getElementById('name').value;

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

        let username = document.getElementById('messageUser').value;

        //transitions background
        document.getElementById('3').style.opacity = 1;
        document.getElementById('2').style.opacity = 0;

        //hides username input and shows message view
        document.getElementById('username').style.display = 'none';
        document.getElementById('msgView').style.opacity = 1;

        //focuses messagBox
        document.getElementById('messageBox').focus();

        //sets username
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
            </section>
        )
    }
}
