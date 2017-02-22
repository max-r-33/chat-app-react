import React from 'react';
import ReactDOM from 'react-dom';

import BackgroundLayers from './backgroundLayers';
import SetupInputs from './setupInputs';
import Header from './header';

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
    }
    setUsername(uname) {
        console.log(uname)
        this.setState({username: uname})
    }
    render() {
        return (
            <div>
                <Header roomName={this.state.roomName}/>
                <BackgroundLayers/>
                <SetupInputs setRoomName={this.setRoomName.bind(this)}
                             setUsername={this.setUsername.bind(this)}/>
            </div>
        )
    }
}

ReactDOM.render(
    <App/>, document.getElementById('app'));
