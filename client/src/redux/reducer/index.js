import { GET_RECIPES } from "../actions";

const initialState = {
    foods: [],
		diets: [],
    foodDetail: {},
}

export default function reducer( state = initialState, action) {
	switch(action.type){
		case GET_RECIPES:
			return {
				...state, 
				foods: state.foods.concat(action.payload)
			}
		default:
			return state;
	}
}