import React from "react";
import {useState} from 'react';
import { useDispatch } from "react-redux";
import { getNameFood } from "../../redux/actions/index";

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
		dispatch(getNameFood(name))
	}

	return (
		<><form onSubmit={e=>handleSubmit(e)}>
			<input type = 'text' placeholder="Ingresa nombre..." onChange={e=>handleInputChange(e)} onSubmit={e=> handleSubmit(e)}/>
			<button type='submit' >Buscar</button>
		</form>
		</>
	)
}