import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { filterFoodByDiets, getDiets, getRecipes, orderedByName, orderedByRating } from '../../redux/actions/index'
import Cards from '../Cards/Cards';
import NavBar from '../NavBar/NavBar';
import Paginado from '../Paginado/Paginado';
import SearchBar from '../SearchBar/SearchBar';
import loadingImage from '../../../src/images/zanahoria.gif'
import style from "./Home.module.css";

export default function Home (){
	const dispatch = useDispatch()
	const allRecipes = useSelector((state) => state.foods)
	const diets = useSelector((state) => state.diets)
	// order
	const [, setOrder] = useState('')
	// Paginacion

	const [actualPage, setActualPage] = useState(1)
	//setFoodsPerPage
	const [foodsPerPage, ] = useState(9)
	const indexOfLastFood = actualPage * foodsPerPage
	const indexOfFirstFood = indexOfLastFood - foodsPerPage
	const actualFoods = allRecipes.slice(indexOfFirstFood, indexOfLastFood)

	 const cambiarIndex = (index) => {
		if(index===actualPage) return true
		else return false
	}

	const paginado = (pageNumber) => {
		setActualPage(pageNumber)
	}
	useEffect (()=>{
		dispatch(getRecipes())
		// eslint-disable-next-line
	}, [])

	useEffect (()=>{
		dispatch(getDiets())
		// eslint-disable-next-line
	}, [])

	// function handleClick(e){
	// 	e.preventDefault();
	// 	dispatch(getRecipes());	 
	// }

	function handleFilterDiet(e){
		e.preventDefault();
		dispatch(filterFoodByDiets(e.target.value))
		setActualPage(1);
		setOrder(`Ordenado ${e.target.value}`)//renderiza
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
			
			
			{/* <button onClick={e=> {handleClick(e)}}>
				Mostrar recetas
			</button> */}
			<div className={style.div0}>
				<div className={style.div1}>
					<h1>TODAS LAS RECETAS</h1>
				</div>
				<div className={style.div2}>
					<div className={style.div3}>
						<label className={style.label}>Ordenar por Nombre</label>
						<select onChange={e=> handleSortName(e)}>
							<option value='All'>Ninguno</option>
							<option value='asc'>Ascendente</option>
							<option value='desc'>Descendente</option>
						</select>
					</div>
					<div className={style.div3}>
						<label className={style.label}>Ordenar por Puntuación</label>
						<select onChange={e=> handleSortPunct(e)}>
							<option value='All'>Ninguno</option>
							<option value='asc'>Ascendente</option>
							<option value='desc'>Descendente</option>
						</select>
					</div>
					<div className={style.div4}>
						<label className={style.label}>Filtrar por tipo de receta:</label>
						<div className={style.div5}>
							<select onChange={e=> handleFilterDiet(e)}>
								<option value='All'>Todos</option>
								<option value='dairy free'>Dairy Free</option>
								<option value='gluten free'>Gluten Free</option>
								<option value='ketogenic'>Ketogenic</option>
								<option value='vegetarian'>Vegetarian</option>
								<option value='lacto vegetarian'>Lacto-Vegetarian</option>
								<option value='lacto ovo vegetarian'>Ovo-Vegetarian</option>
								<option value='vegan'>Vegan</option>
								<option value='pescatarian'>Pescetarian</option>
								<option value='paleolithic'>Paleo</option>
								<option value='primal'>Primal</option>
								<option value='fodmap friendly'>Low FODMAP</option>
								<option value='whole 30'>Whole30</option>
							</select>
						</div>
					</div>
					<SearchBar/>
				</div>
				
				{/* <select>
					<option value='spoonScore'>Puntuacion</option>
					<option value='withoutScore'>Sin Puntuacion</option>
				</select> */}
				
				<Paginado
					foodsPerPage= {foodsPerPage}
					allFoods= {allRecipes.length}
					paginado={paginado}
					cambiarIndex={cambiarIndex}
				/>
				{actualFoods.length===0? 
				(<div>
					<p>Cargando...</p>
					<img src={loadingImage} />
				</div>)
				:
				(<Cards foods={actualFoods}/>)}
				<Paginado
					foodsPerPage= {foodsPerPage}
					allFoods= {allRecipes.length}
					paginado={paginado}
					cambiarIndex={cambiarIndex}
				/>
				
				
			</div>
		</div>
	)
 
}