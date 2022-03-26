import { useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import Routes from '../Routes'

const AppProvider = () => {
	const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'))

	return (
		<AuthContext.Provider value={{ isAuth, setIsAuth }}>
			<Routes />
		</AuthContext.Provider>
	)
}

export default AppProvider
