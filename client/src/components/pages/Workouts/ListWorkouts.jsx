import { useHistory } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'

import Loader from '../../ui/Loader'
import { $api } from '../../../api/api'
import Layout from '../../common/Layout'
import Alert from '../../ui/Alert/Alert'

import styles from './SingleWorkout.module.scss'
import bgImage from '../../../images/workout-bg.jpg'

const ListWorkouts = () => {
	const history = useHistory()

	const { data, isSuccess } = useQuery(
		'get workouts',
		() =>
			$api({
				url: `/workouts`,
			}),
		{
			refetchOnWindowFocus: false,
		}
	)

	const {
		mutate: createWorkoutLog,
		isLoading,
		isSuccess: isSuccessMutate,
		error,
	} = useMutation(
		'Create new workout log',
		({ workoutId }) =>
			$api({
				url: '/workouts/log',
				type: 'POST',
				body: { workoutId },
			}),
		{
			onSuccess(data) {
				history.push(`/workout/${data._id}`)
			},
		}
	)

	return (
		<>
			<Layout bgImage={bgImage} heading='Workout list' />
			<div
				className='wrapper-inner-page'
				style={{ paddingLeft: 0, paddingRight: 0 }}
			>
				{error && <Alert type='error' text={error} />}
				{isSuccessMutate && <Alert text='Workout log created' />}
				{isLoading && <Loader />}
				{isSuccess && (
					<div className={styles.wrapper}>
						{data.map((workout, idx) => (
							<div className={styles.item} key={`workout ${idx}`}>
								<button
									aria-label='Create new workout'
									onClick={() =>
										createWorkoutLog({
											workoutId: workout._id,
										})
									}
								>
									<span>{workout.name}</span>
								</button>
							</div>
						))}
					</div>
				)}
				{isSuccess && data?.length === 0 && (
					<Alert type='warning' text='Workouts not found' />
				)}
			</div>
		</>
	)
}

export default ListWorkouts
