import React from 'react';
import ReactDOM from 'react-dom';

import BackgroundLayers from './backgroundLayers';
import SetupInputs from './setupInputs';

import reset from '../styles/reset.scss';
import style from '../styles/styles.scss';

class App extends React.Component {
    render() {
        return(
            <div>
    			<BackgroundLayers />
                <SetupInputs />
            </div>
		)
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
