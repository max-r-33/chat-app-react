import React from 'react';

export default class setupInputs extends React.Component{
    handleRoomNameSubmit(e){
        e.preventDefault();
        let roomName = document.getElementById('name').value;
        document.getElementById('2').style.opacity = 1;
        document.getElementById('1').style.opacity = 0;
        document.getElementById('name').style.display = 'none';
        document.getElementById('username').style.display = 'inline';
    }
    handleUsernameSubmit(e){
        e.preventDefault();
        let username = document.getElementById('messageUser').value;
        document.getElementById('3').style.opacity = 1;
        document.getElementById('2').style.opacity = 0;
        document.getElementById('username').style.display = 'none';
        document.getElementById('messageContainer').style.display = 'inline';
    }
    handleChange(e){
        console.log(e.target.value);
    }
    render(){
        return (
            <section>
                <form onSubmit={event => this.handleRoomNameSubmit(event)} className='roomNameContainer'>
                    <input onChange={event => this.handleChange(event)} autoComplete='off' type='text' id='name' placeholder='chat room name' />
                </form>
                <form onSubmit={event => this.handleUsernameSubmit(event)} className='usernameContainer' id='username'>
                    <input autoComplete="off" id='messageUser' type='text' placeholder='username' />
                </form>
                <form className='messageSendContainer' id='messageContainer'>
                        <input autoComplete="off" id='messageBox' type='text' placeholder='message' />
                </form>
            </section>
        )
    }
}
