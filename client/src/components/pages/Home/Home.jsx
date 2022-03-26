import { useHistory } from 'react-router-dom'
import { useQuery } from 'react-query'

import Layout from '../../common/Layout'
import Button from '../../ui/Button/Button'
import Counters from '../../ui/Counters/Counters'

import styles from './Home.module.scss'
import bgImage from '../../../images/home-bg.jpg'
import { $api } from '../../../api/api'
import { useAuth } from '../../../hooks/useAuth'

const Home = () => {
	const history = useHistory()
	const { isAuth } = useAuth()

	const { data, isSuccess } = useQuery(
		'home page counters',
		() =>
			$api({
				url: '/users/profile',
			}),
		{
			refetchOnWindowFocus: false,
			enabled: isAuth,
		}
	)

	return (
		<Layout bgImage={bgImage}>
			<Button
				text='New'
				type='main'
				callback={() => history.push('/new-workout')}
			/>
			<h1 className={styles.heading}>EXERCISES FOR THE SHOULDERS</h1>
			{isSuccess && isAuth && (
				<Counters
					minutes={data.minutes}
					workouts={data.workouts}
					kgs={data.kgs}
				/>
			)}
		</Layout>
	)
}

export default Home
