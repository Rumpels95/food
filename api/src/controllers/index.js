'use strict'
require('dotenv').config();
const { Diet } = require('../db');
const axios = require('axios').default;

const {
  API_KEY,
} = process.env;

async function getFoodById(idReceta){

	if(isNaN(idReceta)) throw new Error("Invalid id")
	const url=`https://api.spoonacular.com/recipes/${idReceta}/information?apiKey=${API_KEY}`;
	const response = await axios.get(url);
	//console.log(response.data)
	const {
		id,
		title,
		image,
		diets,
		aggregateLikes,
		spoonacularScore,
		healthScore,
		analyzedInstructions,
	} = response.data
	const recipeFood = {
		id,
		title,
		image,
		diets,
		aggregateLikes,
		spoonacularScore,
		healthScore,
		analyzedInstructions,
	}
	//console.log(recipeFood)
	return recipeFood;
}

async function getRecipes(name){
	
}

module.exports = {
	getFoodById,
	getRecipes
}