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
            username: '',
            messages: []
        }
    }

    //sets room name
    setRoomName(name) {
        this.setState({roomName: name})
        socket.emit('room creation', name);
    }

    //sets username
    setUsername(uname) {
        this.setState({username: uname})
    }

    //emits send message event
    //appends message to window
    sendMessage(event, messageText){
        event.preventDefault();
        //emits message
        socket.emit('chat message', {
            user: this.state.username,
            message: messageText,
            room: this.state.roomName
        });
        let newMsgs = this.state.messages;
        newMsgs.push(<div key={this.state.messages.length+1} className='user message'>{messageText}</div>);
        this.setState({messages: newMsgs});
    }

    //handles all socket events
    componentDidMount(){
        socket.on('connect', function() {
            socket.on('chat message', function(msg) {
                // if(msg.user !== state.username){
                    // this.createMessage();
                // }
            });
        })
    }

    render() {
        return (
            <div>
                <Header roomName={this.state.roomName}
                        messages={this.state.messages}/>
                <BackgroundLayers/>
                <SetupInputs setRoomName={this.setRoomName.bind(this)}
                             setUsername={this.setUsername.bind(this)}
                             sendMessage={this.sendMessage.bind(this)}/>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
