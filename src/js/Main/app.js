import React from 'react';
import {connect} from 'react-redux';
import io from 'socket.io-client';

import Modal from 'react-modal';
import BackgroundLayers from './backgroundLayers';
import SetupInputs from './setupInputs';
import Message from './MessageView/message';
import MessageView from './MessageView/messageView';

let socket = io(document.location.protocol + '//' + document.location.host);
let styles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)'
  },
  content : {
    top                        : '100px',
    bottom                     : '100px',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px'

  }
}
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
        this.setState({
            room: name
        })
    }

    //sets username and emits event
    setUserName(username) {
        socket.emit('room creation', {roomname: this.state.room, username: username});
    }

    //emits send message event
    //appends message to window
    sendMessage(event, messageText){
        event.preventDefault();
        if(messageText){
            //emits message
            socket.emit('chat message', {
                user: this.props.user.name,
                message: messageText,
                room: this.props.room.name
            });
            document.getElementById('messageBox').value ='';
        }
        let {messages} = this.state;
        let newMessage = <Message key={this.state.messages.length+1} sender='user' message={messageText} />;
        let newMessages = [...messages, newMessage];
        this.setState({messages:newMessages});
    }

    //emits the user typing event
    handleTyping(event){
        socket.emit('user typing', this.props.user.name);
    }

    //handles all socket events
    componentDidMount(){
        socket.on('connect', () => {
            socket.on('chat message', msg => {
                if(msg.user !== this.props.user.name){
                    let {messages} = this.state;
                    let msgText = msg.user + ' : ' + msg.message;
                    let newMessage = <Message key={this.state.messages.length+1} sender='other' message={msgText} />;
                    let newMessages = [...messages, newMessage];
                    this.setState({messages: newMessages});
                }
            });

            socket.on('user join', userCount => {
                this.setState({userCount});
            });

            socket.on('user disconnect', userCount => {
                this.setState({userCount});
            });

            socket.on('user typing', user => {
                if(user !== this.props.user.name){
                    this.setState({typingStatus : `${user} is typing`});
                }
                setTimeout(()=>{
                    this.setState({typingStatus:''});
                }, 1000)
            })

            socket.on('user list', l => {
                // this.setState({usersInRoom: l.filter(e => e.roomName === this.state.room)})
                let usersInRoom = l.filter(e => e.roomName === this.state.room).map(x => {
                    return (
                        <div>
                            <p>{x.username}</p>
                        </div>
                    )
                })
                this.setState({usersInRoom});
            });
        })
    }

    getUsers(){
        socket.emit('get users')
        this.setState({modalIsOpen: !this.state.modalIsOpen});
    }

    closeModal(){
        this.setState({modalIsOpen: !this.state.modalIsOpen});
    }

    render() {
        return (
            <div>
                <MessageView messages = {this.state.messages}
                             userCount = {this.state.userCount}
                             typingStatus = {this.state.typingStatus}
                             sendMessage = {this.sendMessage.bind(this)}
                             typingNotif = {_.debounce(this.handleTyping.bind(this), 1000, true)}
                             getUsers = {this.getUsers.bind(this)}/>
                <BackgroundLayers/>
                <SetupInputs setRoomName = {this.setRoomName.bind(this)}
                             setUserName = {this.setUserName.bind(this)}/>
                <Modal isOpen={this.state.modalIsOpen} contentLabel='users in room' style={styles}>
                    <button onClick={this.closeModal.bind(this)}>X</button>
                    <h1>Users in {this.state.room}</h1>
                    {this.state.usersInRoom}
                </Modal>
            </div>
        )
    }
}
export default connect(state => ({user: state.user, room: state.room}))(app);
