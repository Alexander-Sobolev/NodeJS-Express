import asyncHandler from 'express-async-handler'
import ExerciseLog from '../../models/exerciseLogModel.js'
import WorkoutLog from '../../models/workoutLogModel.js'
import Workout from '../../models/workoutModel.js'

// @desc    Create new workout log
// @route   POST /api/workouts/log
// @access  Private
export const createNewWorkoutLog = asyncHandler(async (req, res) => {
	const { workoutId } = req.body

	const user = req.user._id

	const workout = await Workout.findById(workoutId).populate('exercises')

	if (workout) {
		const workoutLog = await WorkoutLog.create({
			user,
			workout: workoutId,
		})

		const logs = workout.exercises.map(ex => {
			let timesArray = []

			for (let i = 0; i < ex.times; i++) {
				timesArray.push({
					weight: 0,
					repeat: 0,
				})
			}

			return {
				user,
				exercise: ex._id,
				times: timesArray,
				workoutLog: workoutLog._id,
			}
		})

		const createdExLogs = await ExerciseLog.insertMany(logs)

		const exLogIds = createdExLogs.map(log => log._id)

		const foundWorkoutLog = await WorkoutLog.findById(workoutLog._id)

		foundWorkoutLog.exerciseLogs = exLogIds

		const updatedWorkoutLog = await foundWorkoutLog.save()

		res.json(updatedWorkoutLog)
	} else {
		res.status(404)
		throw new Error('Workout not found')
	}
})

// @desc    Get workout log
// @route   GET /api/workouts/log/:id
// @access  Private
export const getWorkoutLog = asyncHandler(async (req, res) => {
	const workoutLog = await WorkoutLog.findById(req.params.id)
		.populate('workout')
		.populate({
			path: 'exerciseLogs',
			populate: {
				path: 'exercise',
			},
		})
		.lean()

	const minutes = Math.ceil(workoutLog.workout.exercises.length * 3.7)

	res.json({ ...workoutLog, minutes })
})

// @desc    Update workout log completed
// @route   PUT /api/workouts/log/completed
// @access  Private
export const updateCompleteWorkoutLog = asyncHandler(async (req, res) => {
	const { logId } = req.body

	const currentLog = await WorkoutLog.findById(logId)

	if (!currentLog) {
		res.status(404)
		throw new Error('Данный лог не найден!')
	}

	currentLog.completed = true

	const updatedLog = await currentLog.save()

	res.json(updatedLog)
})
