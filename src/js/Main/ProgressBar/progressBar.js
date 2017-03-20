import React from 'react';
import anime from 'animejs';
import Radium from 'radium';

import ProgressBarLabel from './progressBarLabel';

class progressBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            active : 0,
            duration : 1000,
            elasticity : 90,
            width: this.props.labelText.length * 100,
            style : {
                //ProgressBar
                progressBar: {
                    position:'relative',
                    top:'450px',
                    display:'flex',
                    flexDirection: 'column',
                    width: this.props.labelText.length * 100,
                    margin:'auto',
                    line:{
                        height:'1px',
                        backgroundColor:'#4C5454',
                        width: this.props.labelText.length * 100,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        margin:'auto',
                        indicator: {
                            height:'20px',
                            width:'20px',
                            backgroundColor:'#4C5454',
                            borderRadius: '20px',
                        }
                    },
                    textContainer:{
                        cursor:'default',
                        fontSize:'13px',
                        paddingTop:'18px',
                        display:'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        progressLabel:{
                            opacity:'.33',
                            transition:'all .5s easeInOut',
                        },
                        'active':{
                            opacity:'1'
                        }
                    }
                }
            }
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
            translateX: ((this.state.width/(this.props.labelText.length-1))*(this.state.active+1)-15),
            elasticity : this.state.elasticity,
            duration : this.state.duration
        });

        this.setState({labels : this.props.labelText.map((t, i) => {
            return <ProgressBarLabel key={i} active={this.state.active + 1} elemNumber={i} text={t} />
        })});
    }

    render(){
        return (
            <div style={this.state.style.progressBar} ref='progressBar' className='progressBar'>
                <div className='line' style={this.state.style.progressBar.line}>
                    <div className='indicator' style={this.state.style.progressBar.line.indicator}>
                    </div>
                </div>
                <div className='textContainer' style={this.state.style.progressBar.textContainer}>
                    {this.state.labels}
                </div>
            </div>
        );
    }
}

export default Radium(progressBar)
