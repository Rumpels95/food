import { GET_RECIPES, FILTER_BY_DIETS, ORDER_BY_NAME, ORDER_BY_RATING, GET_NAME_RECIPES, POST_FOOD, GET_DIETS, GET_DETAILS, CLEAR_PAGE } from "../actions";

const initialState = {
  foods: [],
	initialFoods: [],
	diets: [],
  foodDetail: {},
}

export default function reducer( state = initialState, action) {
	switch(action.type){
		case GET_RECIPES:
			return {
				...state, 
				foods: action.payload,
				initialFoods: action.payload
			}
		case FILTER_BY_DIETS:
			const allFoods = state.initialFoods
			const statusFiltered = ( action.payload === 'All') ? allFoods : allFoods.filter(e => 
					e.diets ? e.diets.includes(action.payload) : e.dietas.map(e=>e.name).includes(action.payload))
			
			return {
				...state,
				foods: statusFiltered
			}
		case ORDER_BY_NAME:
			console.log(action.payload)
			const typeOrder = action.payload === 'asc' ?
				state.foods.sort(function(a, b) {
					//return a.name - b.name
					if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
					if(b.name.toLowerCase() > a.name.toLowerCase()) return -1
					return 0
				})
				: state.foods.sort(function(a, b) {
					//return b.name - a.name
					if(b.name.toLowerCase() > a.name.toLowerCase()) return 1
					if(a.name.toLowerCase() > b.name.toLowerCase()) return -1
					return 0
				})
			console.log(typeOrder)
			return {
				...state,
				foods: typeOrder
			}
			case ORDER_BY_RATING:
			const ratingOrder = action.payload === 'asc' ?
				state.foods.sort(function(a, b) {
					if(a.spoonacularScore > b.spoonacularScore) return 1
					if(b.spoonacularScore > a.spoonacularScore) return -1
					return 0
				})
				: state.foods.sort(function(a, b) {
					//return b.name - a.name
					if(b.spoonacularScore > a.spoonacularScore) return 1
					if(a.spoonacularScore > b.spoonacularScore) return -1
					return 0
				})
			return {
				...state,
				foods: ratingOrder
			}
			case GET_NAME_RECIPES:
				return {
					...state,
					foods: action.payload,
				}
			case POST_FOOD:
				return{
					...state
				}
			case GET_DIETS:
				return{
					...state,
					diets: action.payload,
				}
			case GET_DETAILS:
				return{
					...state,
					foodDetail: action.payload
				}
			case CLEAR_PAGE:
				return{
					...state,
					foodDetail: {}
				}

		default:
			return state;
	}
}