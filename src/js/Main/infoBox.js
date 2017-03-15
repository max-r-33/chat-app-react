import React from 'react';
import Radium from 'radium';


class InfoBox extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const styles = {
            base : {
                color: 'black',
                marginLeft:'auto',
                marginRight:'auto',
                width:'500px',
                textAlign:'center',
                padding:'15px',
                marginTop:'100px',
                backgroundImage: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
                transition: 'all ease-in-out .4s',
                ':hover':{
                    transform: 'scale(1.03)',
                    boxShadow: '0px 0px 5px 2.5px rgba(0,0,0,.25)'
                }
            }
        };

        return (
            <div style={[styles.base]}>
                {this.props.infoText}
            </div>
        );
    }
}

export default Radium(InfoBox);
