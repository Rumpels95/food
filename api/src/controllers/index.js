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
    	
		
		if (!recipeFinded) {
			throw new Error("Invalid id letra")          
		}  

		let jsonDbRecipes = {
			id: recipeFinded.id,
			name: recipeFinded.name,
			summary: recipeFinded.summary,
			spoonacularScore: recipeFinded.spoonacularScore, 
			healthScore: recipeFinded.healthScore,
			instructions: recipeFinded.instructions,
			image: recipeFinded.image,
			diets: recipeFinded.diets.map(e=>e.name)
		}
		
		// 	//e.toJSON()
		// })
		// recipeFinded={
		// 		...recipeFinded.dataValues,
		// 		diets: recipeFinded.diets?.map(e=>e.name)       
		// }

		return jsonDbRecipes  
	}
}

//LLAMA A LA API Y A LA DB
async function getRecipes(name){ 
	console.log(API_KEY)
	return API_KEY
	let cache={};
	const number = 100;
	const url=`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=${number}`;
	const response = await axios.get(url);
	console.log()
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
				instructions: e.analyzedInstructions.length>0 ? e.analyzedInstructions :[],
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
				dietas: e.diets,
			}
			//e.toJSON()
		})
		let allRecipes =[]
		allRecipes = [...jsonFood, ...jsonDbRecipes]
		
		//ORDENAMIENTO FINAL:
		allRecipes = allRecipes.sort(function(a, b) { 
			return a.spoonacularScore - b.spoonacularScore
		})

		//console.log(dbRecipes)

		
		//console.log(jsonFood)
		if(name){  //se hace la busqueda despues
			let jsonFiltered
			console.log(name)
			name= name.replace(/\s+/g, ' ').trim()
			console.log(name)
			 jsonFiltered = allRecipes.filter(e=>(e.name.toLowerCase().indexOf(name.toLowerCase()))!==-1)
			 if(!jsonFiltered.length) throw new Error(`No encontramos la receta con nombre ${name}, ingresar otro`);
			 console.log(jsonFiltered.length)
			 return jsonFiltered
		}
		return allRecipes;
	}
	
}

async function postFood(body){
	const {name, summary, spoonacularScore, healthScore, instructions, diet, image} = body
		if(!name || !summary){
		 throw new Error('Completar los campos obligatorios')
	  }
	  if(!diet.length>0) throw new Error('Debe ingresar dietas')

		////////////////
		let foodDbName = await Recipe.findAll({ 
			where: { name: name } 
		})
		if(foodDbName.length) throw new Error('El nombre ya existe, ingresar otro')
/////////////////
///////////////
		let foodDbSummary = await Recipe.findAll({
			where: { summary: summary } 
		})
		if(foodDbSummary.length) throw new Error('El resumen ya existe, ingresar otro')
/////////////////
	  const newRecipe = await Recipe.create({
		name,
		summary,
		spoonacularScore: spoonacularScore?spoonacularScore:0,
		healthScore: healthScore?healthScore:0.0,
		instructions,
		image,
	  })

		let dietDb = await Diet.findAll({
      		where: { name: diet }
    	})
    newRecipe.addDiet(dietDb)
    //console.log(newRecipe)
    let jsonDbRecipes = await getFoodById(newRecipe.id) 
    console.log(jsonDbRecipes.diets)
		return 'Comida creado correctamente' 
}

module.exports = {
	getFoodById,
	getRecipes,
	postFood
}