import React from 'react';
import anime from 'animejs';
import ProgressBarLabel from './progressBarLabel';

export default class progressBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            active : 0,
            duration : 1000,
            elasticity : 90,
            width: 300
        }
    }

    componentWillMount(){
        this.setState({labels : this.props.labelText.map((t, i) => {
                return <ProgressBarLabel key={i} active={this.state.active} elemNumber={i} text={t} />
        })});
    }

    advance(){
        let {active} = this.state;
        active++;
        this.setState({active});

        anime({
            targets:'.indicator',
            translateX: ((this.state.width/2)*(this.state.active+1)-15),
            elasticity : this.state.elasticity,
            duration : this.state.duration
        });

        this.setState({labels : this.props.labelText.map((t, i) => {
            return <ProgressBarLabel key={i} active={this.state.active + 1} elemNumber={i} text={t} />
        })});
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
