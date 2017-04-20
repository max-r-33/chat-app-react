import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import store from './store';
import App from './Main/app';
import reset from '../styles/reset.scss';
import style from '../styles/styles.scss';

class Client extends React.Component{
    render(){
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path='/' component={App} />
                        <Route path='/:name' component={App} />
                    </Switch>
                </Router>
            </Provider>
        )
    }
}

ReactDOM.render(<Client/>, document.getElementById('app'));
