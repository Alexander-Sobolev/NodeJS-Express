import Header from '../../common/Header/Header'
import { Fragment, useEffect } from 'react'
import bgImage from '../../../images/workout-bg.jpg'
import { useMutation, useQuery } from 'react-query'
import Alert from '../../ui/Alert/Alert'
import { useHistory } from 'react-router-dom'
import cn from 'classnames'

import styles from './SingleWorkout.module.scss'
import stylesLayout from '../../common/Layout.module.scss'
import { $api } from '../../../api/api'
import { useParams } from 'react-router-dom'
import Loader from '../../ui/Loader'

const SingleWorkout = () => {
	const { id } = useParams()
	const history = useHistory()

	const { data, isSuccess, isLoading } = useQuery('get workout', () =>
		$api({
			url: `/workouts/log/${id}`,
		})
	)

	const { mutate: setWorkoutCompleted, error: errorCompleted } = useMutation(
		'Change log state',
		() =>
			$api({
				url: '/workouts/log/completed',
				type: 'PUT',
				body: { logId: id },
			}),
		{
			onSuccess() {
				history.push(`/workouts`)
			},
		}
	)

	useEffect(() => {
		if (
			isSuccess &&
			data?.exerciseLogs &&
			data.exerciseLogs.length ===
				data.exerciseLogs.filter(log => log.completed).length &&
			data._id === id
		) {
			setWorkoutCompleted()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data?.exerciseLogs])

	return (
		<>
			<div
				className={`${stylesLayout.wrapper} ${stylesLayout.otherPage}`}
				style={{ backgroundImage: `url(${bgImage})`, height: 356 }}
			>
				<Header backLink='/workouts' />

				{isSuccess && (
					<div>
						<time className={styles.time}>{data.minutes + ' min.'}</time>
						<h1 className={stylesLayout.heading}>{data.workout.name}</h1>
					</div>
				)}
			</div>
			<div
				className='wrapper-inner-page'
				style={{ paddingLeft: 0, paddingRight: 0 }}
			>
				<div style={{ width: '90%', margin: '0 auto' }}>
					{errorCompleted && <Alert type='error' text={errorCompleted} />}
				</div>
				{isLoading || (isSuccess && data._id !== id) ? (
					<Loader />
				) : (
					<div className={styles.wrapper}>
						{data.exerciseLogs.map((exLog, idx) => {
							return (
								<Fragment key={`ex log ${idx}`}>
									<div
										className={cn(styles.item, {
											[styles.completed]: exLog.completed,
										})}
									>
										<button
											aria-label='Move to exercise'
											onClick={() => history.push(`/exercise/${exLog._id}`)}
										>
											<span>{exLog.exercise.name}</span>
											<img
												src={`/uploads/exercises/${exLog.exercise.imageName}.svg`}
												height='34'
												alt=''
												draggable={false}
											/>
										</button>
									</div>
									{idx % 2 !== 0 && idx !== data.exerciseLogs.length - 1 && (
										<div className={styles.line}></div>
									)}
								</Fragment>
							)
						})}
					</div>
				)}

				{isSuccess && data?.length === 0 && (
					<Alert type='warning' text='Exercises not found' />
				)}
			</div>
		</>
	)
}

export default SingleWorkout
