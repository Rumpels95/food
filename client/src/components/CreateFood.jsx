import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import { postFood, getDiets } from '../redux/actions'
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./NavBar";

function isValid(input){
	const errors ={}
	if(!input.name) errors.name = 'Se requiere un nombre'
	if(!input.summary) errors.summary = 'Se requiere un resumen'
	if(!input.spoonacularScore) errors.spoonacularScore = 'Se requiere un spoonacularScore'
	if(!input.healthScore) errors.healthScore = 'Se requiere un healthScore'
	if(!input.instructions) errors.instructions = 'Se requieren instrucciones'
	if(!input.diets) errors.diets = 'Se requieren instrucciones'

	return errors;
}

export default function CreateFood(){
	const dispatch = useDispatch()
	const history = useHistory()
	const diets = useSelector((state) => state.diets)
	const [errors, setErrors] = useState({})
	const [input, stateInput] = useState({
		name: "",
		summary: "",
		spoonacularScore: "",
		healthScore: "",
		instructions: "",
		image: "",
		diet: []
	})

	function handleChange(e){
		stateInput({
			...input,
			[e.target.name]: e.target.value
		})
		console.log(input)
		setErrors(isValid({
			...input,
			[e.target.name]: e.target.value
		}))
	}

	function handleCheck(e){
		if(e.target.checked){
			if(!input.diet.includes(e.target.value)){
				stateInput({
					...input,
					diet: [...input.diet, e.target.value]
				})
			}
		}
	}

	function handleSubmit(e){
		e.preventDefault()
		console.log(input)
		dispatch(postFood(input))
		alert("Personaje creado satisfactoriamente")
		stateInput({
			name: "",
			summary: "",
			spoonacularScore: "",
			healthScore: "",
			instructions: "",
			image: "",
			diet: []
		})
		//history.push('/recipes')
	}



	useEffect(()=>{
		dispatch(getDiets())
	}, [])

	return(
		<>
			<NavBar/>
			
			<h1>Crea tu Receta</h1>
			<form onSubmit={e=>handleSubmit(e)}>
				<div>
					<label>Nombre:</label>
					<input type="text" value={input.name} name="name" onChange={handleChange}/>
					{errors.name && (
						<p className='error'>{errors.name}</p>
					)}
				</div>
				<div>
					<label>Resumen:</label>
					<input type="text" value={input.summary} name="summary" onChange={handleChange}/>
					{errors.summary && (
						<p className='error'>{errors.summary}</p>
					)}
				</div>
				<div>
					<label>Spoonacular Score:</label>
					<input type="text" value={input.spoonacularScore} name="spoonacularScore" onChange={handleChange}/>
					{errors.spoonacularScore && (
						<p className='error'>{errors.spoonacularScore}</p>
					)}
				</div>
				<div>
					<label>Health Score:</label>
					<input type="text" value={input.healthScore} name="healthScore" onChange={handleChange}/>
				</div>
				<div>
					<label>Instrucciones:</label>
					<input type="text" value={input.instructions} name="instructions" onChange={handleChange}/>
				</div>
				<div>
					<label>Imagen:</label>
					<input type="text" value={input.image} name="image" onChange={handleChange}/>
				</div>
				{
					diets?.map((dieta)=>
					 	(
							<label>{dieta.name}:<input type="checkbox" value={dieta.name} name={dieta.name} onChange={(e)=>handleCheck(e)}/></label>
					 	))
				}
				<ul><li>{input.diet.map(e=>e+",")}</li></ul>
				<button type='submit'>Crear Receta</button>
			</form>
		</>
	)
}
