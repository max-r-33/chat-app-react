import React from 'react';
import ReactDOM from 'react-dom';

import BackgroundLayers from './backgroundLayers';
import SetupInputs from './setupInputs';
import Message from './MessageView/message';
import MessageView from './MessageView/messageView';

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
            messages: [],
            userCount: 0,
            typingStatus: ''
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
        if(messageText){
            //emits message
            socket.emit('chat message', {
                user: this.state.username,
                message: messageText,
                room: this.state.roomName
            });
            document.getElementById('messageBox').value ='';
        }
    }

    //emits the user typing event
    handleTyping(event){
        socket.emit('user typing', this.state.username);
    }

    //handles all socket events
    componentDidMount(){
        socket.on('connect', () => {
            socket.on('chat message', msg => {
                let {messages} = this.state;
                let senderClass = msg.user === this.state.username ? 'user' : 'other';
                let newMessage = <Message key={this.state.messages.length+1} sender={senderClass} message={msg.message} />;
                let newMessages = [...messages, newMessage];
                this.setState({messages: newMessages});
            });

            socket.on('user join', userCount => {
                this.setState({userCount});
            });

            socket.on('user disconnect', userCount => {
                this.setState({userCount});
            });

            socket.on('user typing', user => {
                if(user !== this.state.username){
                    this.setState({typingStatus : `${user} is typing`});
                }
                setTimeout(()=>{
                    this.setState({typingStatus:''});
                }, 1000)
            })
        });
    }

    render() {
        return (
            <div>
                <MessageView messages={this.state.messages}
                             roomName={this.state.roomName}
                             userCount={this.state.userCount}
                             typingStatus={this.state.typingStatus}
                             sendMessage={this.sendMessage.bind(this)}
                             typingNotif={_.debounce(this.handleTyping.bind(this), 1000, true)}/>
                <BackgroundLayers/>
                <SetupInputs setRoomName={this.setRoomName.bind(this)}
                             setUsername={this.setUsername.bind(this)}/>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
