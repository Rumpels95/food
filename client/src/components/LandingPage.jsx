import React from 'react';
import {Link} from 'react-router-dom'

export default function LandingPage(){
	return(
		<div>
			<h1>Henry Food</h1>
			<h2>Binvenidos a la página</h2>
			<Link to ='/recipes'>
				<button>Ingresar</button>
			</Link>
		</div>
	)
}