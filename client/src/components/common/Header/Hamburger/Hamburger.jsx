import { Link } from 'react-router-dom'
import { menu } from './menuBase'

import hamburgerImage from '../../../../images/header/hamburger.svg'
import hamburgerCloseImage from '../../../../images/header/hamburger-close.svg'

import styles from './Hamburger.module.scss'
import { useAuth } from '../../../../hooks/useAuth'
import { useOutsideAlerter } from '../../../../hooks/useOutsideAlerter'

const Hamburger = () => {
	const { setIsAuth } = useAuth()
	const { ref, isComponentVisible, setIsComponentVisible } =
		useOutsideAlerter(false)

	const handleLogout = () => {
		localStorage.removeItem('token')
		setIsAuth(true)
		setIsComponentVisible(false)
	}

	return (
		<div className={styles.wrapper} ref={ref}>
			<button
				type='button'
				onClick={() => setIsComponentVisible(!isComponentVisible)}
			>
				<img
					src={isComponentVisible ? hamburgerCloseImage : hamburgerImage}
					alt='Menu'
					draggable={false}
					height='24'
					width='27'
				/>
			</button>
			<nav
				className={`${styles.menu} ${isComponentVisible ? styles.show : ''}`}
			>
				<ul>
					{menu.map((item, idx) => (
						<li key={`_menu_${idx}`}>
							<Link to={item.link}>{item.title}</Link>
						</li>
					))}
					<li>
						<button onClick={handleLogout}>Logout</button>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default Hamburger
