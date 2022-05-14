import axios from 'axios'
export const GET_RECIPES = 'GET_RECIPES'
export const FILTER_BY_DIETS = 'FILTER_BY_DIETS'
export const ORDER_BY_NAME = 'ORDER_BY_NAME'
export const ORDER_BY_RATING = 'ORDER_BY_RATING'
export const GET_NAME_RECIPES = 'GET_NAME_RECIPES'
export const GET_DIETS = 'GET_DIETS'
export const POST_FOOD = 'POST_FOOD'
export const GET_DETAILS = 'GET_DETAILS'
export const CLEAR_PAGE = 'CLEAR_PAGE'
export const HANDLE_ERROR = 'HANDLE_ERROR'
export const ORDER_BY_GENERAL = 'ORDER_BY_GENERAL'


export function getRecipes(){
	return function(dispatch){
		//return axios.get('http://localhost:3001/recipes')
		return axios.get('https://foodxrecipes.herokuapp.com/recipes')
		.then(( json ) => dispatch({type: GET_RECIPES, payload: json.data}))
	}
}

export function filterFoodByDiets(payload){
	return{
		type: FILTER_BY_DIETS,
		payload
	}
}

export function orderedByName(payload){
	return {
		type: ORDER_BY_NAME,
		payload
	}
}

export function orderedByRating(payload){
	return {
		type: ORDER_BY_RATING,
		payload
	}
}

export function orderedByAll(payload){
	return {
		type: ORDER_BY_GENERAL,
		payload
	}
}

export function getNameFood(name){
	return function(dispatch){
		return axios.get(`http://localhost:3001/recipes?name=${name}`)
		.then(( json ) => dispatch({type: GET_NAME_RECIPES, payload: json.data}))
		.catch(error=> window.alert(error.response.data))
	}
}

export function getDiets(){
	return function(dispatch){
		return axios.get(`http://localhost:3001/types`)
		.then(( json ) => dispatch({type: GET_DIETS, payload: json.data}))
	}
}

export function postFood(payload){
	return function(dispatch){
		return axios.post(`http://localhost:3001/recipe`, payload)
		// .then(( json ) => dispatch({type: POST_FOOD, payload: json.data}))
		// .catch(error=> window.alert(error.response.data.message))
		.then(()=> window.alert('Receta creada exitosamente'))
		.catch((error)=> window.alert(error.response.data))
		//.catch(( error ) => dispatch({type: HANDLE_ERROR, payload: error.response.data}))
		
	}
}

export function getDetail(id){
	return async function(dispatch){
		return axios.get(`http://localhost:3001/recipes/${id}`)
		.then(( json ) => dispatch({type: GET_DETAILS, payload: json.data}))
	}
}

export function clearPage(){
	return{
		type: CLEAR_PAGE
	}
}

