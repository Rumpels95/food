import React from 'react';
import {Link} from 'react-router-dom'
import style from './LandingPage.module.css'

export default function LandingPage(){
	return(
		
		<div className={style.div0}>
			
			<div className={style.div1}>

				<h1 className={style.h1}>Henry Food</h1>
				<h2 className={style.h2}>Binvenidos a la página</h2>
				<Link to ='/home' className={style.link}>
					<a className={style.button}>INGRESAR</a>
				</Link>
			</div>
			
		</div>
	)
} 