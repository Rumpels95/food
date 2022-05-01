import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import { getDetail } from '../redux/actions'
import { useDispatch, useSelector } from "react-redux";

export default function Detail(props){
	console.log(props)
	const dispatch = useDispatch()
	useEffect(()=>{
		dispatch(getDetail(props.match.params.id))
	},[dispatch])
	const myFood = useSelector((state)=> state.foodDetail)
	return(
		<div>
			{
				Object.keys(myFood).length!==0 ?
				<div key={myFood.id}>
					<h1>Nombre: {myFood.name}</h1>
					<img src={myFood.image} alt="" width="250px" height="250px"/>
					<h2>Dietas: {myFood.diets.join(", ")}</h2>
					<p>Tipo de plato: {myFood.dishTypes}</p>
					<p>Resumen: {myFood.summary}</p>
					<p>Instrucciones: {myFood.instructions}</p>
					<p>SpoonacularScore: {myFood.spoonacularScore}</p>
					<p>HealthScore: {myFood.healthScore}</p>
				</div>
			: <p>Cargando...</p>
			}
			<Link to='/recipes'><button>Volver</button></Link>
		</div>
	)
}