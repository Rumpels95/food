import React from "react";
import {useState} from 'react';
import { useDispatch } from "react-redux";
import { getNameFood } from "../../redux/actions/index";
import style from './SearchBar.module.css'

export default function SearchBar(){
	const dispatch = useDispatch()
	const [name, setName] = useState("")
	function handleInputChange(e) {
		e.preventDefault()
		
		setName(e.target.value)
		console.log(name)
	}
	function handleSubmit(e){
		e.preventDefault()
		//if(name)
		console.log(name)
		setName(name.replace(/\s+/g, ' ').trim())
		console.log(name)
		dispatch(getNameFood(name))
	}

	return (
		<><form className={style.form} onSubmit={e=>handleSubmit(e)}>
			<label className={style.label}>¿Qué receta estás buscando?</label>
			<input type = 'text' placeholder="Ingresa nombre..." onChange={e=>handleInputChange(e)} onSubmit={e=> handleSubmit(e)}/>
			<button type='submit' >Buscar</button>
		</form>
		</>
	)
}