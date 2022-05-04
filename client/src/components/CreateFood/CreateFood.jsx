import React, {useState, useEffect} from "react";
//import { useHistory} from 'react-router-dom';
import { postFood, getDiets } from '../../redux/actions'
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import style from './CreateFood.module.css'

function isValid(input){
	const errors ={}
	if(!input.name) errors.name = 'Se requiere un nombre'
	if(!input.summary) errors.summary = 'Se requiere un resumen'
	if(!input.spoonacularScore) errors.spoonacularScore = 'Se requiere un spoonacularScore'
	if(!input.healthScore) errors.healthScore = 'Se requiere un healthScore'
	if(!input.instructions) errors.instructions = 'Se requieren instrucciones'
	if(!input.diet.length) errors.diet = 'Al menos una dieta debe seleccionarse'

	return errors;
}

export default function CreateFood(){
	const dispatch = useDispatch()
	//const history = useHistory()
	const diets = useSelector((state) => state.diets)
	const messageBack =  useSelector((state) => state.message)
	const [errors, setErrors] = useState({
		name: 'Se requiere un nombre',
		summary: 'Se requiere un resumen',
		diet: 'Al menos una dieta debe seleccionarse'
	})
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
				setErrors(isValid({
					...input,
					diet: [...input.diet, e.target.value]
				}))
			}
		}
	}

	function handleSubmit(e){
		e.preventDefault()
		console.log(input)
		if(!input.name || !input.summary || !input.diet.length){
			alert("Completar los campos requeridos")
		}
		else{
		dispatch(postFood(input))
		// alert( "Comida creada satisfactoriamente ")
		stateInput({
			name: "",
			summary: "",
			spoonacularScore: "",
			healthScore: "",
			instructions: "",
			image: "",
			diet: []
		})
		}
		//history.push('/recipes')
	}



	useEffect(()=>{
		dispatch(getDiets())
		// alert( messageBack.message)
		// eslint-disable-next-line
	}, [])


	if(!messageBack){
		console.log(messageBack)
		
		alert("Completar los campos requeridos")
		return 
	}
	return(
		<>
			<NavBar/>
			
			<h1>Crea tu Receta</h1>
			<form onSubmit={e=>handleSubmit(e)}>
				<div>
					<label>Nombre:</label>
					<input type="text" value={input.name} name="name" onChange={handleChange}/>
					{errors.name && (
						<span className={style.error}>{errors.name}</span>
					)}
				</div>
				<div>
					<label>Resumen:</label>
					<input type="text" value={input.summary} name="summary" onChange={handleChange}/>
					{errors.summary && (
						<span className={style.error}>{errors.summary}</span>
					)}
				</div>
				<div>
					<label>Spoonacular Score:</label>
					<input type="text" value={input.spoonacularScore} name="spoonacularScore" onChange={handleChange}/>
					{/* {errors.spoonacularScore && (
						<span className={style.error}>{errors.spoonacularScore}</span>
					)} */}
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
				<div>
				{
					diets?.map((dieta)=>
					 	(
							<label key={dieta.name}>{dieta.name.charAt(0).toUpperCase()+dieta.name.slice(1)}:<input type="checkbox" value={dieta.name} name={dieta.name} onChange={(e)=>handleCheck(e)}/></label>
					 	))
				}{errors.diet && (
					<span className={style.error}>{errors.diet}</span>
				)}
				</div>
				<ul><li>{input.diet.map(e=>e+",")}</li></ul>
				<button type='submit'>Crear Receta</button>
			</form>
		</>
	)
}
