import React from 'react';
import ReactDOM from 'react-dom';

import BackgroundLayers from './backgroundLayers';
import SetupInputs from './setupInputs';
import Header from './header';

import config from '../../config';

import io from 'socket.io-client'
let socket = io(config.socketURL);

import reset from '../styles/reset.scss';
import style from '../styles/styles.scss';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomName: '',
            username: ''
        }
    }

    setRoomName(name) {
        this.setState({roomName: name})
        socket.emit('room creation', name);
    }

    setUsername(uname) {
        this.setState({username: uname})
    }

    sendMessage(event, messageText){
        event.preventDefault();
        alert(messageText)
        socket.emit('chat message', {
            user: this.state.username,
            message: messageText,
            room: this.state.roomName
        });
    }

    componentDidMount(){
        socket.on('connect', function() {
            console.log('connected');
        })
    }
    
    render() {
        return (
            <div>
                <Header roomName={this.state.roomName}/>
                <BackgroundLayers/>
                <SetupInputs setRoomName={this.setRoomName.bind(this)}
                             setUsername={this.setUsername.bind(this)}
                             sendMessage={this.sendMessage.bind(this)}/>
            </div>
        )
    }
}

ReactDOM.render(
    <App/>, document.getElementById('app'));
