import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import { getRecipes } from '../redux/actions/index'

export default function Home (){
	const dispatch = useDispatch()
	const allRecipes = useSelector((state) => state.foods)

	useEffect (()=>{
		dispatch(getRecipes())
	}, [])

	function handleClick(e){
		e.preventDefault();
		dispatch(getRecipes());	 
	}

	return (
		<div>
			<Link to='/recipe'>Crear receta</Link>
			<h1>TODAS LAS RECETAS</h1>
			<button onClick={e=> {handleClick(e)}}>
				Mostrar recetas
			</button>
			<div>
				<select>
					<option value='asc'>Ascendente</option>
					<option value='desc'>Descendente</option>
				</select>
				<select>
					<option value='glutenFree'>Gluten Free</option>
					<option value='ketogenic'>Ketogenic</option>
					<option value='vegetarian'>Vegetarian</option>
					<option value='lactoVegetarian'>Lacto-Vegetarian</option>
					<option value='ovoVegetarian'>Ovo-Vegetarian</option>
					<option value='vegan'>Vegan</option>
					<option value='pescetarian'>Pescetarian</option>
					<option value='paleo'>Paleo</option>
					<option value='primal'>Primal</option>
					<option value='lowFODMAP'>Low FODMAP</option>
					<option value='Whole30'>Whole30</option>
				</select>
				<select>
					<option spoonScore='asc'>Puntuacion</option>
					<option withoutScore='desc'>Sin Puntuacion</option>
				</select>
			</div>
		</div>
	)
 
}