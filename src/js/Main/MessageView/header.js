import React from 'react';
import scrollToComponent from 'react-scroll-to-component';
import Modal from 'react-modal';
import anime from 'animejs';
import ReactToolTip from 'react-tooltip';
import {connect} from 'react-redux';
import {removeUser} from '../../ducks/userDuck';

class header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showModal : false,
            hoverMsg: 'Double click to copy a link to this room'
        }
    }

    copyTextToClipboard(text) {
        var textArea = document.createElement("textarea");
        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = 0;
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        textArea.value = document.location.protocol + '//' + document.location.host + '/#/' + text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            var successful = document.execCommand('copy');
            var msg = successful
                ? 'successful'
                : 'unsuccessful';
            console.log('Copying text command was ' + msg);
        } catch (err) {
            console.log('Oops, unable to copy');
        }
        document.body.removeChild(textArea);
    }

    handleLeaveChatroomClick(e){
        if(confirm('Are you sure you want to leave the chat room?')){
            this.props.dispatch(removeUser(username));
            window.location.href='/';
        }
    }

    toggleModal(){
        this.setState(prevState => {
            return {showModal: !prevState.showModal};
        })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.usersInRoom !== this.props.usersInRoom){
            let userElems = nextProps.usersInRoom.map((u, i) => <p className='userListing' key={i}>{u.username === this.props.user.name ? u.username + ' (you)' : u.username}</p>);
            this.setState({userElems})
        }
    }

    componentDidMount(){
        document.getElementById('roomtitle').addEventListener('dblclick', () => {
          console.log('double cliked')
          console.log(this.props)
          this.copyTextToClipboard(this.props.room.name);
        }, false);
    }

    render() {
        return (
            <header>
                <p className='roomName' id='roomtitle' data-tip={this.state.hoverMsg}>{this.props.room.name}</p>
                <ReactToolTip place='left' type='light' effect='solid' />
                <p onClick={this.toggleModal.bind(this)} className='peopleCount'>{`${this.props.userCount} ${this.props.userCount > 1 ? 'users' : 'user'} in the room`}</p>
                <p className='userTyping'>{this.props.typingStatus}</p>
                <p onClick={event => this.handleLeaveChatroomClick(event)} className='leave'>×</p>
                <Modal shouldCloseOnOverlayClick={true}
                       className='modal'
                       overlayClassName='overlay'
                       contentLabel='Users in room'
                       isOpen={this.state.showModal}
                       closeTimeoutMS={350}>
                    <div className='modalHeader'>
                        <div className='leave leaveModal' onClick={this.toggleModal.bind(this)}>×</div>
                        <div className='modalTitle'>Users in '{this.props.room.name}'</div>
                    </div>
                    {this.state.userElems}
                </Modal>
            </header>
        )
    }
}

export default connect(state => ({user : state.user, room : state.room}))(header);
