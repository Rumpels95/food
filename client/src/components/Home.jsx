import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import { filterFoodByDiets, getRecipes, orderedByName, orderedByRating } from '../redux/actions/index'
import Card from './Card';
import Cards from './Cards';
import NavBar from './NavBar';
import Paginado from './Paginado';
import SearchBar from './SearchBar';

export default function Home (){
	const dispatch = useDispatch()
	const allRecipes = useSelector((state) => state.foods)
	const [order, setOrder] = useState('')
	// Paginacion
	const [actualPage, setActualPage] = useState(1)
	const [foodsPerPage, setFoodsPerPage] = useState(9)
	const indexOfLastFood = actualPage * foodsPerPage
	const indexOfFirstFood = indexOfLastFood - foodsPerPage
	const actualFoods = allRecipes.slice(indexOfFirstFood, indexOfLastFood)

	const paginado = (pageNumber) => {
		setActualPage(pageNumber)
	}
	useEffect (()=>{
		dispatch(getRecipes())
	}, [])

	function handleClick(e){
		e.preventDefault();
		dispatch(getRecipes());	 
	}

	function handleFilterDiet(e){
		e.preventDefault();
		dispatch(filterFoodByDiets(e.target.value))
	}

	function handleSortName(e){
		e.preventDefault();
		dispatch(orderedByName(e.target.value))
		setActualPage(1);
		setOrder(`Ordenado ${e.target.value}`)//renderiza
	}
	function handleSortPunct(e){
		e.preventDefault();
		dispatch(orderedByRating(e.target.value))
		setActualPage(1);
		setOrder(`Ordenado de manera ${e.target.value}`)
	}
	return (
		<div>
			<NavBar/>
			
			<h1>TODAS LAS RECETAS</h1>
			<button onClick={e=> {handleClick(e)}}>
				Mostrar recetas
			</button>
			<div>
				<div>Nombre</div>
				<select onClick={e=> {handleSortName(e)}}>
					<option value='asc'>Ascendente</option>
					<option value='desc'>Descendente</option>
				</select>
				<div>Puntuación</div>
				<select onClick={e=> {handleSortPunct(e)}}>
					<option value='asc'>Ascendente</option>
					<option value='desc'>Descendente</option>
				</select>
				<div>
				<select onClick={e=> {handleFilterDiet(e)}}>
					<option value='All'>Todos</option>
					<option value='dairy free'>Dairy Free</option>
					<option value='gluten free'>Gluten Free</option>
					<option value='ketogenic'>Ketogenic</option>
					<option value='vegetarian'>Vegetarian</option>
					<option value='lacto vegetarian'>Lacto-Vegetarian</option>
					<option value='lacto ovo vegetarian'>Ovo-Vegetarian</option>
					<option value='vegan'>Vegan</option>
					<option value='pescetarian'>Pescetarian</option>
					<option value='paleo'>Paleo</option>
					<option value='primal'>Primal</option>
					<option value='low FODMAP'>Low FODMAP</option>
					<option value='Whole30'>Whole30</option>
				</select>
				</div>
				<select>
					<option value='spoonScore'>Puntuacion</option>
					<option value='withoutScore'>Sin Puntuacion</option>
				</select>
				<Paginado
					foodsPerPage= {foodsPerPage}
					allFoods= {allRecipes.length}
					paginado={paginado}
				/>
				<SearchBar/>
				<Cards foods={actualFoods}/>
				
				
			</div>
		</div>
	)
 
}