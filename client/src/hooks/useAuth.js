import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

export const useAuth = () => {
	const { isAuth, setIsAuth } = useContext(AuthContext)

	return {
		isAuth,
		setIsAuth,
	}
}
