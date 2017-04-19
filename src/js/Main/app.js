import React from 'react';
import {connect} from 'react-redux';
import io from 'socket.io-client';
import axios from 'axios';

import config from '../../../config.js';
import BackgroundLayers from './backgroundLayers';
import SetupInputs from './setupInputs';
import Message from './MessageView/message';
import MessageView from './MessageView/messageView';

let socket = io(document.location.protocol + '//' + document.location.host);

class app extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            userCount: 0,
            typingStatus: ''
        }
    }

    checkIfUsernameAvailable(roomName, username){
        return axios.get(config.basedomain + 'checkuser/' +roomName + '/' + username)
    }

    setUpRoom(roomName, username){
        socket.emit('room creation', {name: roomName, user: username})
    }

    //emits send message event if message is not blank
    //appends message to window
    sendMessage(event, messageText){
        event.preventDefault();
        if(messageText){
            socket.emit('chat message', {
                user: this.props.user.name,
                message: messageText,
                room: this.props.room.name
            });
            document.getElementById('messageBox').value ='';
            //adding message to state
            let {messages} = this.state;
            let newMessage = <Message key={this.state.messages.length+1} sender='user' message={messageText} />;
            let newMessages = [...messages, newMessage];
            this.setState({messages:newMessages});
        }
    }

    //emits the user typing event
    handleTyping(event){
        socket.emit('user typing', this.props.user.name);
    }

    //handles all socket events
    componentDidMount(){
        socket.on('connect', () => {
            socket.on('chat message', msg => {
                if(msg.userid !== socket.id){
                    let {messages} = this.state;
                    let msgText = msg.user + ' : ' + msg.message;
                    let newMessage = <Message key={this.state.messages.length+1} sender='other' message={msgText} />;
                    let newMessages = [...messages, newMessage];
                    this.setState({messages: newMessages});
                }
            });

            socket.on('user join', users => {
                let usersInRoom = users.filter(u => u.roomname === this.props.room.name)
                this.setState({userCount: usersInRoom.length, usersInRoom});
            });

            socket.on('user disconnect', users => {
                let usersInRoom = users.filter(u => u.roomname === this.props.room.name)
                this.setState({usersInRoom, userCount: usersInRoom.length});
            });

            socket.on('user typing', user => {
                if(user !== this.props.user.name){
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
                             usersInRoom = {this.state.usersInRoom}
                             typingStatus = {this.state.typingStatus}
                             sendMessage = {this.sendMessage.bind(this)}
                             typingNotif = {_.debounce(this.handleTyping.bind(this), 1000, true)}/>
                <BackgroundLayers />
                <SetupInputs ref='setup' setUpRoom = {this.setUpRoom}
                                         checkIfUsernameAvailable = {this.checkIfUsernameAvailable}/>
            </div>
        )
    }
}
export default connect(state => ({user: state.user, room: state.room}))(app);
