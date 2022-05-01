'use strict'
require('dotenv').config();
const { Diet, Recipe } = require('../db');
const axios = require('axios').default;

const {
  API_KEY,
} = process.env;

async function getFoodById(idReceta){
	if (!isNaN(idReceta)){   //LLAMADA A LA API
		const url=`https://api.spoonacular.com/recipes/${idReceta}/information?apiKey=${API_KEY}`;
		const response = await axios.get(url);
		let jsonFood = response.data.results;
		//console.log(response.data)
		// if(jsonFood.length === 0){
		// 	throw new Error('No se encontraron recetas')
		// }
		const { id, title, summary, image, diets, dishTypes,
			aggregateLikes, spoonacularScore, healthScore, analyzedInstructions} = response.data
		
			return {
				id,
				name: title,
				summary: summary.replace(/<[^>]+>/g, ''),
				spoonacularScore,
				healthScore,
				diets: diets,
				instructions: analyzedInstructions.length>0 ? analyzedInstructions.map(e=>e.steps)[0].map(e=>e.step).join(" ") : [],
				dishTypes,
				image,
			}
	} 
	if (typeof idReceta === "string"){ //BASE DE DATOS
		const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
		//console.log("ESTOY AQUI")
		//console.log(idReceta)
		if(!regexExp.test(idReceta)) throw new Error("Invalid id letra");
		const recipeFinded = await Recipe.findByPk(idReceta,{
			include:{
				model: Diet,
				attributes: ['name'],
				through:{ 
					attributes: [], 
				},
			}
		})
    console.log(recipeFinded)
		
		if (!recipeFinded) {
			throw new Error("Invalid id letra")          
		}  
		// recipeFinded={
		// 		...recipeFinded.dataValues,
		// 		diets: recipeFinded.diets?.map(e=>e.name)       
		// }

		return recipeFinded  
	}
}

//LLAMA A LA API Y A LA DB
async function getRecipes(name){ 
	const number = 20;
	const url=`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=${number}`;
	const response = await axios.get(url);
	let jsonFood = response.data.results;
	if(jsonFood.length === 0){
		throw new Error('No se encontraron recetas')
	}else{
		const regexExp = /([^ \r\n][^!?\.\r\n]+[\w!?\.]+)/gi
		let valuableInfo = jsonFood.map(e=>{
			return{
				id: e.id,
				name: e.title,
				summary: e.summary,
				spoonacularScore: e.spoonacularScore,
				healthScore: e.healthScore,
				diets: e.diets,
				instructions: e.analyzedInstructions.map(e=>e.steps),
				dishTypes: e.dishTypes,
				image: e.image,
			}
		})
		jsonFood = valuableInfo;
		let dbRecipes = await Recipe.findAll({
			include:{
				model: Diet,
				attributes: ['name'],
				through:{ 
					attributes: [], 
				},
			}
		}) 
		let jsonDbRecipes = dbRecipes.map(e=>{
			return{
				id: e.id,
				name: e.name,
				summary: e.summary,
				spoonacularScore: e.spoonacularScore, 
				healthScore: e.healthScore,
				instructions: e.instructions,
				image: e.image,
				dietas: e.diets
			}
			//e.toJSON()
		})
		let allRecipes =[]
		allRecipes = [...jsonFood, ...jsonDbRecipes]

		//console.log(dbRecipes)

		
		//console.log(jsonFood)
		if(name){  //se hace la busqueda despues
			let jsonFiltered
			return jsonFiltered = allRecipes.filter(e=>(e.name.toLowerCase().indexOf(name.toLowerCase()))>=0)
		}
		return allRecipes;
	}
	
}

module.exports = {
	getFoodById,
	getRecipes
}