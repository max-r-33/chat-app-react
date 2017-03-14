import React from 'react';

import BackgroundLayers from './backgroundLayers';
import SetupInputs from './setupInputs';
import Message from './MessageView/message';
import MessageView from './MessageView/messageView';

import {connect} from 'react-redux';

import config from '../../config';
import io from 'socket.io-client'
let socket = io(config.socketURL);

class app extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            userCount: 0,
            typingStatus: ''
        }
    }

    //sets room name
    setRoomName(name) {
        socket.emit('room creation', name);
    }

    //emits send message event
    //appends message to window
    sendMessage(event, messageText){
        event.preventDefault();
        if(messageText){
            //emits message
            socket.emit('chat message', {
                user: this.props.storeUser.name,
                message: messageText,
                room: this.props.storeRoom.name
            });
            document.getElementById('messageBox').value ='';
        }
    }

    //emits the user typing event
    handleTyping(event){
        socket.emit('user typing', this.props.storeUser.name);
    }

    //handles all socket events
    componentDidMount(){
        socket.on('connect', () => {
            socket.on('chat message', msg => {
                let {messages} = this.state;
                let senderClass = msg.user === this.props.storeUser.name ? 'user' : 'other';
                let msgText = msg.user === this.props.storeUser.name ? msg.message : msg.user + ' : ' + msg.message
                let newMessage = <Message key={this.state.messages.length+1} sender={senderClass} message={msgText} />;
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
                if(user !== this.props.storeUser.name){
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
                <MessageView messages = {this.state.messages}
                             userCount = {this.state.userCount}
                             typingStatus = {this.state.typingStatus}
                             sendMessage = {this.sendMessage.bind(this)}
                             typingNotif = {_.debounce(this.handleTyping.bind(this), 1000, true)}/>
                <BackgroundLayers/>
                <SetupInputs setRoomName = {this.setRoomName.bind(this)} />
            </div>
        )
    }
}
export default connect(state => ({storeUser: state.storeUser, storeRoom: state.storeRoom}))(app);
