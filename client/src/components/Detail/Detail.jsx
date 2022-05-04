import React, { useEffect} from "react";
import { Link } from 'react-router-dom';
import { clearPage, getDetail } from '../../redux/actions'
import { useDispatch, useSelector } from "react-redux";
import NavBar from '../NavBar/NavBar';

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
			{
				Object.keys(myFood).length!==0 ?
				<div key={myFood.id}>
					<h1>Nombre: {myFood.name}</h1>
					<img src={myFood.image} alt="" width="250px" height="250px"/>
					<h2>Dietas: {myFood.diets.join(", ")}</h2>
					{myFood.dishTypes&&(<p>Tipo de plato: {myFood.dishTypes}</p>)}
					<p>Resumen: {myFood.summary}</p>
					{/* <p>Instrucciones: {myFood.instructions}</p> */}
					{myFood.instructions.length>0&&(<p>Instrucciones: {myFood.instructions}</p>)}
					<p>SpoonacularScore: {myFood.spoonacularScore}</p>
					<p>HealthScore: {myFood.healthScore}</p>
				</div>
			: <p>Cargando...</p>
			}
			<Link to='/home'><button>Volver</button></Link>
		</div>
	)
}