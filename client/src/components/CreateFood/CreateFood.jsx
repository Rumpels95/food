import React, {useState, useEffect} from "react";
import { useHistory} from 'react-router-dom';
import { postFood, getDiets } from '../../redux/actions'
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
	if(!input.name) errors.name = 'Se requiere un nombre'
		else if(!regexExp.test(input.name)) errors.name = 'Alguno de los caracteres son inválidos'
		else if(input.name.length>40) errors.name = 'No puede contener más de 40 caracteres'
	if(!input.summary) errors.summary = 'Se requiere un resumen'
		else if(input.summary.length>800) errors.summary = 'No puede contener más de 200 caracteres'
	//if(!input.image) errors.image = "Ingresar alguna imagen"
		 if(input.image.length && input.image.length<3) errors.image = "Ingresar un formato adecuado (.jpg o .png)"
		else if(input.image.length && (input.image.slice(-4)!=='.jpg')&&(input.image.slice(-4)!=='.png')) errors.image = "Ingresar un formato adecuado (.jpg o .png)"
	if(input.spoonacularScore && !regexExp1.test(input.spoonacularScore)) errors.spoonacularScore = 'Alguno de los caracteres son inválidos'
		else if(input.spoonacularScore<0) errors.spoonacularScore = 'Score debe ser mayor a 0'
		else if(input.spoonacularScore>100) errors.spoonacularScore = 'Valor máximo es 100'
	if(input.healthScore && !regexExp1.test(input.healthScore)) errors.healthScore = 'Alguno de los caracteres son inválidos'
		else if(input.healthScore<0) errors.healthScore = 'Score debe ser mayor a 0'
		else if(input.healthScore>100) errors.healthScore = 'Valor máximo es 100'
	//if(!input.healthScore) errors.healthScore = 'Se requiere un healthScore'
	//if(!input.instructions) errors.instructions = 'Se requieren instrucciones'
	if(!input.diet.length) errors.diet = 'Al menos una dieta debe seleccionarse'

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

	const [rangeval, setRangeval] = useState(0);
	const [slide, setSlide] = useState(0);

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

	// async function hello(a) {
	// 	let greeting
	// 	return greeting = await Promise.resolve(a);
	//   };

	function  handleSubmit(e){

		e.preventDefault()
		if(!input.name || !input.summary || !input.diet.length) alert("Completar los campos requeridos")
		else if(input.spoonacularScore<0) alert('Score debe ser mayor a 0')
		//else if(!input.image) alert("Ingresar alguna imagen")
		else if(input.image.length>0 && input.image.length<3) alert("Ingresar un formato adecuado (.jpg o .png)")
		//else if((input.image.slice(-4)!=='.jpg')&&(input.image.slice(-4)!=='.png')) alert("Ingresar un formato adecuado (.jpg o .png)")
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
			setSlide(0)
			setRangeval(0)
			setErrors({
				name: 'Se requiere un nombre',
				summary: 'Se requiere un resumen',
				diet: 'Al menos una dieta debe seleccionarse'
			})
			//alert(messageBack[0])
			// if(Object.keys(errors).length===0){
			// 	history.push('/home')
			// }
			
		}
	}
		
	useEffect(()=>{
		dispatch(getDiets())
		
		// eslint-disable-next-line
	}, [])

	function handleChangeRange(e) {
		setSlide(e.target.value);
	};

	// if(!messageBack){
	// 	console.log(messageBack)
	// 	alert("Completar los campos requeridos")
	// 	return 
	// }
	return(
		<>
			<NavBar/>
			
			<h1>Crea tu Receta</h1>
			<form onSubmit={e=>handleSubmit(e)}>
				<div className={style.div0}>
					<div className={style.div1}>
						<label>Nombre:</label>
						<input className={style.inputt0} type="text" value={input.name} name="name" onChange={handleChange} oninput="validate(this)"/>
						{errors.name && (
							<span className={style.error}>{errors.name}</span>
						)}
					</div>
					<div className={style.div1}>
						<label>Resumen:</label>
						<input className={style.inputt1} type="text" value={input.summary} name="summary" onChange={handleChange}/>
						{errors.summary && (
							<span className={style.error}>{errors.summary}</span>
						)}
					</div>
					<div className={style.div1}>
						<label>Spoonacular Score:</label>
						<input className={style.inputt2} type="text" value={input.spoonacularScore} name="spoonacularScore" onChange={handleChange}/>
						{errors.spoonacularScore && (
							<span className={style.error}>{errors.spoonacularScore}</span>
						)}
					</div>
					{/* <div>
						<label for="score">SpoonacularScore: </label>
						<input className="style.range" type="range" step="1" min="0" max="100" name="spoonacularScore" 
						defaultValue={slide} onMouseUp={handleChangeRange} onChange={e=>handleChange(e)}></input>
						<label>{rangeval}</label>
					</div> */}
					<div className={style.div1}>
						<label>Health Score:</label>
						<input className={style.inputt3} type="text" value={input.healthScore} name="healthScore" onChange={handleChange}/>
						{errors.healthScore && (
							<span className={style.error}>{errors.healthScore}</span>
						)}
					</div>
				</div>
				<div className={style.div2}>
					<label>Instrucciones:</label>
					<input className={style.inputt4} type="text" value={input.instructions} name="instructions" onChange={handleChange}/>
				</div>
				<div className={style.div3}>
					<div className={style.div4}>
						<label>Imagen:</label>
						<input className={style.inputt5} type="text" value={input.image} name="image" onChange={handleChange}/>
						{errors.image && (
							<span className={style.error}>{errors.image}</span>
						)}
					</div>
					<div className={style.div5}>
					{
						diets?.map((dieta)=>
							(
								<label key={dieta.name}>{dieta.name.charAt(0).toUpperCase()+dieta.name.slice(1)}:
								<input className={style.inputc} type="checkbox" value={dieta.name} name={dieta.name} onChange={(e)=>handleCheck(e)}/></label>
							))
					}{errors.diet && (
						<span className={style.error}>{errors.diet}</span>
					)}
					</div>
					<ul className={style.ul}><li className={style.li}>{input.diet.map(e=>e+",")}</li></ul>
					<button className={style.button} type='submit'>Crear Receta</button>
				</div>
			</form>
		</>
	)
}
