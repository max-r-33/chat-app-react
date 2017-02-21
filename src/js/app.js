import React from 'react';
import ReactDOM from 'react-dom';

import HomeView from './homeView';

class App extends React.Component {
    render() {
        return(
			<HomeView />
		)
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
