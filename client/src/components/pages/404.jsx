import React from 'react'
import Layout from '../common/Layout'

import bgImage from '../../images/new-workout-bg.jpg'

const error404 = () => {
	return (
		<>
			<Layout bgImage={bgImage} heading='Page not found' />
			<div className='wrapper-inner-page'>404 page not found</div>
		</>
	)
}

export default error404
