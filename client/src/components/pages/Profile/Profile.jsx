import Header from '../../common/Header/Header'
import Counters from '../../ui/Counters/Counters'

import bgImage from '../../../images/profile-bg.jpg'
import afterImage from '../../../images/after.jpg'
import userImage from '../../../images/header/user.svg'

import { useQuery } from 'react-query'

import styles from './Profile.module.scss'
import stylesLayout from '../../common/Layout.module.scss'
import { $api } from '../../../api/api'

const Profile = () => {
	const { data, isSuccess } = useQuery(
		'home page counters',
		() =>
			$api({
				url: '/users/profile',
			}),
		{
			refetchOnWindowFocus: false,
		}
	)

	return (
		<>
			<div
				className={`${stylesLayout.wrapper} ${stylesLayout.otherPage}`}
				style={{ backgroundImage: `url(${bgImage})`, height: 356 }}
			>
				<Header />

				<div className={styles.center}>
					<img src={userImage} alt='Profile' height='56' draggable={false} />
					{isSuccess && <h1 className={stylesLayout.heading}>{data.email}</h1>}
				</div>

				{isSuccess && (
					<Counters
						minutes={data.minutes}
						workouts={data.workouts}
						kgs={data.kgs}
					/>
				)}
			</div>
			<div
				className='wrapper-inner-page'
				style={{ paddingLeft: 0, paddingRight: 0 }}
			>
				<div className={styles.before_after}>
					<div>
						<div className={styles.heading}>Before</div>
						<img src={afterImage} alt='' />
					</div>
					<div>
						<div className={styles.heading}>After</div>
						<img src={afterImage} alt='' />
					</div>
				</div>
			</div>
		</>
	)
}

export default Profile
