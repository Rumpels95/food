import React from 'react';
import {Link} from 'react-router-dom'
import style from './LandingPage.module.css'

export default function LandingPage(){
	return(
		<div className={style.div0}>
			<h1 className={style.h1}>Henry Food</h1>
			<h2>Binvenidos a la página</h2>
			<Link to ='/recipes'>
				<button>Ingresar</button>
			</Link>
		</div>
	)
} 