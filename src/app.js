import React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router , Route, IndexRoute, Link } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';

import ExampleComponent from 'pages/example'


const App = React.createClass({

	getInitialState: function() {
		return {
			open: false,
		}
	},
	render() {
		return(
			<main>
				{this.props.children}
			</main>
		)
	}
});
injectTapEventPlugin();
ReactDOM.render((
	<Router>
		<Route path='/' component={App} >
			<Route path='example' component={ExampleComponent}/>

			</Route>
	</Router>),
document.getElementById('content'));
