import axios from 'axios'
export const GET_RECIPES = 'GET_RECIPES'
export const FILTER_BY_DIETS = 'FILTER_BY_DIETS'
export const ORDER_BY_NAME = 'ORDER_BY_NAME'

export function getRecipes(){
	return function(dispatch){
		return axios.get('http://localhost:3001/recipes')
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
		type: 'ORDER_BY_NAME',
		payload
	}
}