import React from 'react'
import ReactSelect from 'react-select'
import { Link } from 'react-router-dom'
import Layout from '../../common/Layout'

import bgImage from '../../../images/new-workout-bg.jpg'
import Field from '../../ui/Field/Field'
import Button from '../../ui/Button/Button'
import Alert from '../../ui/Alert/Alert'
import Loader from '../../ui/Loader'

import { useMutation, useQuery } from 'react-query'
import { $api } from '../../../api/api'

const NewWorkout = () => {
	const [name, setName] = React.useState('')
	const [exercisesCurrent, setExercisesCurrent] = React.useState([])

	const { data, isSuccess } = useQuery(
		'list exercises',
		() =>
			$api({
				url: '/exercises',
			}),
		{
			refetchOnWindowFocus: false,
		}
	)

	const {
		mutate,
		isLoading,
		isSuccess: isSuccessMutate,
		error,
	} = useMutation(
		'Create new workout',
		({ exIds }) =>
			$api({
				url: '/workouts',
				type: 'POST',
				body: { name, exerciseIds: exIds },
			}),
		{
			onSuccess() {
				setName('')
				setExercisesCurrent([])
			},
		}
	)

	const handleSubmit = e => {
		e.preventDefault()

		const exIds = exercisesCurrent.map(ex => ex.value)

		mutate({
			exIds,
		})
	}

	return (
		<>
			<Layout bgImage={bgImage} heading='Create new workout' />
			<div className='wrapper-inner-page'>
				{error && <Alert type='error' text={error} />}
				{isSuccessMutate && <Alert text='Workout created' />}
				{isLoading && <Loader />}
				<form onSubmit={handleSubmit}>
					<Field
						placeholder='Enter name'
						value={name}
						onChange={e => setName(e.target.value)}
						required
					/>
					<Link to='/new-exercise' className='dark-link'>
						Add new exercise
					</Link>
					{isSuccess && data && (
						<ReactSelect
							classNamePrefix='select2-selection'
							placeholder='Exercises...'
							title='Exercises'
							options={data.map(ex => ({
								value: ex._id,
								label: ex.name,
							}))}
							value={exercisesCurrent}
							onChange={setExercisesCurrent}
							isMulti={true}
						/>
					)}
					<Button text='Create' callback={() => {}} />
				</form>
			</div>
		</>
	)
}

export default NewWorkout
