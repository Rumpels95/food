import { GET_RECIPES, FILTER_BY_DIETS, ORDER_BY_NAME } from "../actions";

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
			const statusFiltered = action.payload === 'All' ? allFoods : allFoods.filter(e => 
					e.diets.includes(action.payload)
			)
			return {
				...state,
				foods: statusFiltered
			}
		case ORDER_BY_NAME:
			console.log(action.payload)
			const typeOrder = action.payload === 'asc' ?
				state.foods.sort(function(a, b) {
					//return a.name - b.name
					if(a.name > b.name) return 1
					if(b.name > a.name) return -1
					return 0
				})
				: state.foods.sort(function(a, b) {
					//return b.name - a.name
					if(b.name > a.name) return 1
					if(a.name > b.name) return -1
					return 0
				})
			console.log(typeOrder)
			return {
				...state,
				foods: typeOrder
			}
		default:
			return state;
	}
}