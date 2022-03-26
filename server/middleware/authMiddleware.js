import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

import User from '../models/userModel.js'

export const protect = asyncHandler(async (req, res, next) => {
	let token

	if (req.headers.authorization?.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1]

		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)

		const userFound = await User.findById(decoded.userId).select('-password')

		if (userFound) {
			req.user = userFound
			next()
		} else {
			res.status(401)
			throw new Error('Не авторизован, токен не работает')
		}
	}

	if (!token) {
		res.status(401)
		throw new Error('Не авторизован, без токена')
	}
})
