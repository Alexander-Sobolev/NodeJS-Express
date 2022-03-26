import { useHistory } from 'react-router'
import Hamburger from './Hamburger/Hamburger'

import styles from './Header.module.scss'
import userImage from '../../../images/header/user.svg'
import authImage from '../../../images/header/dumbbell.svg'
import arrowImage from '../../../images/header/arrow.svg'
import { useAuth } from '../../../hooks/useAuth'

const Header = ({ backLink }) => {
	const history = useHistory()
	const { location } = history

	const { isAuth } = useAuth()

	return (
		<header className={styles.header}>
			{location.pathname !== '/' ? (
				<button type='button' onClick={() => history.push(backLink || '/')}>
					<img
						src={arrowImage}
						width='29'
						height='23'
						alt='back'
						draggable={false}
					/>
				</button>
			) : (
				<button
					type='button'
					onClick={() => history.push(isAuth ? '/profile' : '/auth')}
				>
					<img
						src={isAuth ? authImage : userImage}
						alt='Auth'
						height='40'
						width='40'
						draggable={false}
					/>
				</button>
			)}
			<Hamburger />
		</header>
	)
}

export default Header
