import { GET_RECIPES, FILTER_BY_DIETS, ORDER_BY_NAME, ORDER_BY_RATING, GET_NAME_RECIPES, POST_FOOD, GET_DIETS, GET_DETAILS, CLEAR_PAGE, HANDLE_ERROR, ORDER_BY_GENERAL } from "../actions";

const initialState = {
  foods: [],
	initialFoods: [],
	staticFoods: [],
	diets: [],
  foodDetail: {},
  message:[]
}

export default function reducer( state = initialState, action) {
	switch(action.type){
		case GET_RECIPES:
			return {
				...state, 
				foods: action.payload,
				initialFoods: action.payload,
				staticFoods: action.payload
			}
		case FILTER_BY_DIETS:
			const allFoods = [...state.initialFoods]  //state.initialFoods
			let statusFiltered = ( action.payload === 'All') ? allFoods : allFoods.filter(e => 
					e.diets ? e.diets.includes(action.payload) : e.dietas.map(e=>e.name).includes(action.payload))
			
			return {
				...state,
				foods: statusFiltered
			}
		//REDUCER DONDE SE AGRUPAN LOS DOS ORDENAMIENTOS
		case ORDER_BY_GENERAL:
			switch(action.payload){
				case 'ascS':
					let typeOrder1 = state.foods.sort(function(a, b) {
						return a.spoonacularScore - b.spoonacularScore
					})
					return {
						...state,
						foods: typeOrder1
					}
				case 'descS':
					let typeOrder2 = state.foods.sort(function(a, b) {
						return b.spoonacularScore - a.spoonacularScore
					})
					return {
						...state,
						foods: typeOrder2
					}
				case 'ascN':
					let typeOrder3 = state.foods.sort(function(a, b) {
						//return a.name - b.name
						if(a.name.toLowerCase().replace(/\s+/g, ' ').trim() > b.name.toLowerCase().replace(/\s+/g, ' ').trim()) return 1
						if(b.name.toLowerCase().replace(/\s+/g, ' ').trim() > a.name.toLowerCase().replace(/\s+/g, ' ').trim()) return -1
						return 0
					})
					return {
						...state,
						foods: typeOrder3
					}

				case 'descN':
					let typeOrder4 = state.foods.sort(function(a, b) {
						//return b.name - a.name
						if(b.name.toLowerCase().replace(/\s+/g, ' ').trim() > a.name.toLowerCase().replace(/\s+/g, ' ').trim()) return 1
						if(a.name.toLowerCase().replace(/\s+/g, ' ').trim() > b.name.toLowerCase().replace(/\s+/g, ' ').trim()) return -1
						return 0
					})
					return {
						...state,
						foods: typeOrder4
					}
				case 'None':
					return {
						...state,
						foods: state.foods
					}
				default:
					return state.foods
			}

		case ORDER_BY_NAME:
			const allFoods1 = state.initialFoods//[...state.initialFoods]
			let typeOrder = //( action.payload === 'All' ) ? allFoods1 :
				action.payload === 'asc' ?
				state.foods.sort(function(a, b) {
					//return a.name - b.name
					if(a.name.toLowerCase().replace(/\s+/g, ' ').trim() > b.name.toLowerCase().replace(/\s+/g, ' ').trim()) return 1
					if(b.name.toLowerCase().replace(/\s+/g, ' ').trim() > a.name.toLowerCase().replace(/\s+/g, ' ').trim()) return -1
					return 0
				})
				: state.foods.sort(function(a, b) {
					//return b.name - a.name
					if(b.name.toLowerCase().replace(/\s+/g, ' ').trim() > a.name.toLowerCase().replace(/\s+/g, ' ').trim()) return 1
					if(a.name.toLowerCase().replace(/\s+/g, ' ').trim() > b.name.toLowerCase().replace(/\s+/g, ' ').trim()) return -1
					return 0
				})
			console.log(typeOrder)
			return {
				...state,
				foods: typeOrder
			}
			case ORDER_BY_RATING:
			const ratingOrder = 
				action.payload === 'asc' ?
				state.foods.sort(function(a, b) {
					return a.spoonacularScore - b.spoonacularScore
				})
				: state.foods.sort(function(a, b) {
					//return b.name - a.name
					return b.spoonacularScore - a.spoonacularScore
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
					...state,
					message: action.payload,
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
			case HANDLE_ERROR:
				return{
					...state,
					message: [action.payload]
				}

		default:
			return state;
	}
}