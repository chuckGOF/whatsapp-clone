import React from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Chat from './components/Chat/Chat'
import Login from './components/Login/Login'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import { useStateValue } from './StateProvider'

const App = () => {

	const [{ user }, dispatch ] = useStateValue()

		return (
			<div className="App">
				{!user ? (
					<Login />
				) : (
					<div className='App_body'>
						<Router>
							<Sidebar />
							<Switch>
								<Route path='/rooms/:roomId'>
									<Chat />
								</Route>
							</Switch>
						</Router>
					</div>
				)}
			</div>
		)
}

export default App;
