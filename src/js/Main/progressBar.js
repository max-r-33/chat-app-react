import React from 'react';

export default class progressBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            active : 1
        }
    }
    advance(){
        let {active} = this.state;
        active++;
        this.setState({active});
    }
    render(){
        return (
            <div ref='progressBar' className='progressBar'>
                <div className='line'>
                    <div className='indicator'>
                    </div>
                </div>
                <div className='textContainer'>
                    <div className={`progressLabel ${this.state.active === 1 ? 'active' : ''}`}>Room Name</div>
                    <div className={`progressLabel ${this.state.active === 2 ? 'active' : ''}`}>Username</div>
                    <div className={`progressLabel ${this.state.active === 3 ? 'active' : ''}`}>Creating room</div>
                </div>
            </div>
        );
    }
}
