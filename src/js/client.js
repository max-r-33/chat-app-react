import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';

import store from './store';

import App from './Main/app';

import reset from '../styles/reset.scss';
import style from '../styles/styles.scss';

class Client extends React.Component{
    render(){
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}

ReactDOM.render(<Client/>, document.getElementById('app'));
