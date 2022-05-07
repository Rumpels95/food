import React, { useEffect} from "react";
import { clearPage, getDetail } from '../../redux/actions'
import { useDispatch, useSelector } from "react-redux";
import NavBar from '../NavBar/NavBar';
import style from './Detail.module.css'
import loadingImage from '../../images/zanahoria.gif'

export default function Detail(props){
	console.log(props)
	const dispatch = useDispatch()
	useEffect(()=>{
		dispatch(getDetail(props.match.params.id))
		return()=>{
			dispatch(clearPage())
		}
		// eslint-disable-next-line
	},[dispatch])
	const myFood = useSelector((state)=> state.foodDetail)
	return(
		<div>
			<NavBar/>
			<div className={style.div0}>
			{
				Object.keys(myFood).length!==0 ?
				<div key={myFood.id} className={style.div1}>
					<h1>{myFood.name}</h1>
					<div className={style.div2}>
						<img className={style.img} src={myFood.image} alt="" width="250px" height="250px"/>
						<div className={style.div3}>
							<h2>Dietas: {myFood.diets.join(", ")}</h2>
							{myFood.dishTypes&&(<p><b>Tipo de plato: {myFood.dishTypes}</b></p>)}
							<p><b>SpoonacularScore: {myFood.spoonacularScore}</b></p>
							<p><b>HealthScore: {myFood.healthScore}</b></p>
						</div>
					</div>	
					<p className={style.p}><b>Resumen: {myFood.summary}</b></p>
					{/* <p>Instrucciones: {myFood.instructions}</p> */}
					{myFood.instructions.length>0&&(<p className={style.p}><b>Instrucciones: {myFood.instructions}</b></p>)}
				</div>
				: (
				<div><p>Cargando...</p>
				<img src={loadingImage}/>
				</div>)
				
			}
				
			</div>
			
		</div>
	)
}