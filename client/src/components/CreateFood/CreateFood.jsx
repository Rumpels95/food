import React, {useState, useEffect} from "react";
import { useHistory} from 'react-router-dom';
import { postFood, getDiets, getRecipes } from '../../redux/actions'
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import style from './CreateFood.module.css'

function validate(input){
	if(/^\s/.test(input.value))
	  input.value = '';
  }

function isValid(input){
	const errors ={}
	var regexExp = /^[a-zA-Z\s]*$/
	var regexExp1 = /^\d+$/
	var regexExp2 = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
	if(!input.name) errors.name = 'Se requiere un nombre'
		else if(!regexExp.test(input.name)) errors.name = 'Alguno de los caracteres son inválidos'
		else if(input.name.length>40) errors.name = 'No puede contener más de 40 caracteres'
	if(!input.summary) errors.summary = 'Se requiere un resumen'
		else if(input.summary.length>800) errors.summary = 'No puede contener más de 200 caracteres'
	if(input.image.length && !regexExp2.test(input.image)) errors.image = "Ingresar un formato adecuado"
	//if(input.image.length && input.image.length<3) errors.image = "Ingresar un formato adecuado (.jpg o .png)"
	//	else if(input.image.length && (input.image.slice(-4)!=='.jpg')&&(input.image.slice(-4)!=='.png')) errors.image = "Ingresar un formato adecuado (.jpg o .png)"
	if(input.spoonacularScore && !regexExp1.test(input.spoonacularScore)) errors.spoonacularScore = 'Alguno de los caracteres son inválidos'
		else if(input.spoonacularScore<0) errors.spoonacularScore = 'Score debe ser mayor a 0'
		else if(input.spoonacularScore>100) errors.spoonacularScore = 'Valor máximo es 100'
	if(input.healthScore && !regexExp1.test(input.healthScore)) errors.healthScore = 'Alguno de los caracteres son inválidos'
		else if(input.healthScore<0) errors.healthScore = 'Score debe ser mayor a 0'
		else if(input.healthScore>100) errors.healthScore = 'Valor máximo es 100'
	
	if(!input.diet.length) errors.diet = 'Al menos una dieta debe seleccionarse'
		else if(input.diet.length>3) errors.diet = 'Solo se pueden ingresar 3 dietas como máximo'

	return errors;
}




export default function CreateFood(){
	const dispatch = useDispatch()
	const history = useHistory()
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
	const [checked, setChecked] = useState(false)
	const [rangeval, setRangeval] = useState(0);
	const [slide, setSlide] = useState(0);
	const [ids, setIds] = useState([])

	function handleChange(e){
		if(e.target.name==='spoonacularScore') setRangeval(e.target.value)
		
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

		let isChecked = e.target.checked
		if(isChecked){
			setIds([...ids, e.target.value])
			if(!input.diet.includes(e.target.value) && input.diet.length<4){
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
		if(!isChecked){		
				stateInput({
					...input,
					diet: input.diet.filter(a=>a!==e.target.value)
				})
				setErrors(isValid({
					...input,
					diet: input.diet.filter(a=>a!==e.target.value)
				}))
		}
	}


	function  handleSubmit(e){

		e.preventDefault()
		if(!input.name || !input.summary || !input.diet.length) alert("Completar los campos requeridos")
		else if(input.spoonacularScore<0) alert('Score debe ser mayor a 0')
		//else if(!input.image) alert("Ingresar alguna imagen")
		//else if(input.image.length>0 && input.image.length<3) alert("Ingresar un formato adecuado (.jpg o .png)")
		//else if((input.image.slice(-4)!=='.jpg')&&(input.image.slice(-4)!=='.png')) alert("Ingresar un formato adecuado (.jpg o .png)")
		else if(Object.keys(errors).length !== 0) alert("Corregir los campos requeridos")
		else{
			console.log(ids)
			
			dispatch(postFood(input))
			stateInput({
				name: "",
				summary: "",
				spoonacularScore: "",
				healthScore: "",
				instructions: "",
				image: "",
				diet: []
			})

			setSlide(0)
			setRangeval(0)
			setErrors({
				name: 'Se requiere un nombre',
				summary: 'Se requiere un resumen',
				diet: 'Al menos una dieta debe seleccionarse'
			})
			ids.map(e => {
				console.log(document.getElementById(e))
				var idcheck = document.getElementById(e)
				idcheck.checked = false;
			})
			//setChecked(false)
			// console.log(messageBack)
			// messageBack && alert(messageBack)
			// history.push('/home')
			
			
		}
	}
		
	useEffect(()=>{
		dispatch(getDiets())
		// eslint-disable-next-line
	}, [])


	function handleChangeRange(e) {
		setSlide(e.target.value);
	};

	
	return(
		<>
			<NavBar/>
			
			<h1>Crea tu Receta</h1>
			<form onSubmit={e=>handleSubmit(e)} className={style.form}>
				<div className={style.div0}>
					
						<label className={style.label}>Nombre:</label>
						<input className={style.inputt0} type="text" value={input.name} name="name" onChange={handleChange} oninput="validate(this)"/>
						{errors.name && (
							<span className={style.error}>{errors.name}</span>
						)}
					
						<label className={style.label}>Resumen:</label>
						<input className={style.inputt1} type="text" value={input.summary} name="summary" onChange={handleChange}/>
						{/* <textarea name="textarea" rows="10" cols="50"></textarea> */}
						{errors.summary && (
							<span className={style.error}>{errors.summary}</span>
						)}
					
						<label className={style.label}>Spoonacular Score:</label>
						<input className={style.inputt2} type="text" value={input.spoonacularScore} name="spoonacularScore" onChange={handleChange}/>
						{errors.spoonacularScore && (
							<span className={style.error}>{errors.spoonacularScore}</span>
						)}
					
						<label className={style.label}>Health Score:</label>
						<input className={style.inputt3} type="text" value={input.healthScore} name="healthScore" onChange={handleChange}/>
						{errors.healthScore && (
							<span className={style.error}>{errors.healthScore}</span>
						)}
					
						<label className={style.label}>Imagen:</label>
						<input className={style.inputt5} type="text" value={input.image} name="image" onChange={handleChange}/>
						{errors.image && (
							<span className={style.error}>{errors.image}</span>
						)}
					
				</div>
				
				<div className={style.div3}>
					<div className={style.div2}>
						<label>Instrucciones:</label>
						<input className={style.inputt4} type="text" value={input.instructions} name="instructions" onChange={handleChange}/>
					</div>
					<div className={style.div5}>
					{
						diets?.map((dieta)=>
							(
								<label className={style.diets} key={dieta.name}>{dieta.name.charAt(0).toUpperCase()+dieta.name.slice(1)}:&nbsp; &nbsp;
								<input id={dieta.name} className={style.inputc} type="checkbox" value={dieta.name} name={dieta.name} onChange={(e)=>handleCheck(e)} />
								<span>   </span><br/>
								</label>
							))
					}{errors.diet && (
						<span className={style.error}>{errors.diet}</span>
					)}
						<ul className={style.ul}><li className={style.li}>{input.diet.map(e=>e+" - ")}</li></ul>
						<button className={style.button} type='submit'>Crear Receta</button>
					</div>
				</div>
			</form>
		</>
	)
}
