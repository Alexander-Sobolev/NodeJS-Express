import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Error404 from './components/pages/404'
import { useAuth } from './hooks/useAuth'

import { routes } from './dataRoutes'

const App = () => {
	const { isAuth } = useAuth()
	return (
		<Router>
			<Switch>
				{routes.map(route => {
					if (route.auth && !isAuth) {
						return false
					}

					return (
						<Route
							path={route.path}
							exact={route.exact}
							key={`route ${route.path}`}
						>
							<route.component />
						</Route>
					)
				})}
				<Route component={Error404} />
			</Switch>
		</Router>
	)
}

export default App
