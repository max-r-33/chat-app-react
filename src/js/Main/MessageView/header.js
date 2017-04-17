import React from 'react';
import scrollToComponent from 'react-scroll-to-component';
import Modal from 'react-modal';

import {connect} from 'react-redux';
import {removeUser} from '../../ducks/userDuck';

const modalStyle = {
  overlay : {
    backgroundColor   : 'rgba(40, 46, 48, 0.66)',
    zIndex            : '1000',
  },
  content : {
    top                        : '100px',
    bottom                     : '100px',
    background                 : '#fff',
    borderRadius               : '1px',
    padding                    : '20px',
    border                     : '1px solid #4C5454'
  }
}

class header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showModal : false
        }
    }

    handleCloseClick(e){
        if(confirm('Are you sure you want to leave the chat room?')){
            this.props.dispatch(removeUser(username));
            window.location.href='/';
        }
    }

    toggleModal(){
        this.setState({showModal:!this.state.showModal});
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.usersInRoom !== this.props.usersInRoom){
            let userElems = nextProps.usersInRoom.map((u, i) => <p key={i}>{u.username}</p>);
            this.setState({userElems})
        }
    }

    render() {
        return (
            <header>
                <p className='roomName'>{this.props.room.name}</p>
                <p onClick={this.toggleModal.bind(this)} className='peopleCount'>{`${this.props.userCount} ${this.props.userCount > 1 ? 'users' : 'user'} in the room`}</p>
                <p className='userTyping'>{this.props.typingStatus}</p>
                <p onClick={event => this.handleCloseClick(event)} className='leave'>x</p>
                <Modal style={modalStyle} contentLabel='Users in room' isOpen={this.state.showModal}>
                    <div className='leave' onClick={this.toggleModal.bind(this)}>X</div>
                    {this.state.userElems}
                </Modal>
            </header>
        )
    }
}

export default connect(state => ({user : state.user, room : state.room}))(header);
