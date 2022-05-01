import React from "react";
import {useState} from 'react';
import { useDispatch } from "react-redux";
import { getNameFood } from "../redux/actions";

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
		<>
		<input type = 'text' placeholder="Ingresa nombre..." onChange={e=>handleInputChange(e)}/>
		<buton type='submit' onClick={e=> handleSubmit(e)}>Buscar</buton>
		</>
	)
}