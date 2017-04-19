import React from 'react';
import anime from 'animejs';
import ProgressBarLabel from './progressBarLabel';

export default class progressBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            active : 0,
            duration : 800,
            elasticity : 40,
            width: 300,
        }
    }

    componentWillMount(){
        this.setState({labels : this.props.labelText.map((t, i) => {
                return <ProgressBarLabel key={i} active={this.state.active} elemNumber={i} text={t} />
        })});
    }

    advance(){
        let nextActive = this.state.active+1;
        this.setState({active: nextActive,
                       labels : this.props.labelText.map((t, i) => {
                            return <ProgressBarLabel key={i} active={this.state.active + 1} elemNumber={i} text={t} />
                        })});
        anime({
            targets:'.indicator',
            translateX: this.state.active === 0 ? 135 : 280,
            elasticity : this.state.elasticity,
            duration : this.state.duration
        });
    }

    render(){
        return (
            <div ref='progressBar' className='progressBar'>
                <div className='line'>
                    <div className='indicator'>
                    </div>
                </div>
                <div className='textContainer'>
                    {this.state.labels}
                </div>
            </div>
        );
    }
}
