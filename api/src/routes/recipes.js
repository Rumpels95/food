//import someName from "./some/path/to/your/file.json";
//import axios from 'axios';
require('dotenv').config();
const axios = require('axios').default;
const { Router } = require('express');
const { Recipe } = require('../models/Recipe.js');
const router = Router();
//let receta = require('../../food.json')
const {
  API_KEY,
} = process.env;


router.get('/', async (req, res) => {
	try{
		const {name} = req.query;
		const url=`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`;
		const response = await axios.get(url);
		//console.log(response.data.results)
		//res.status(200).json(response.data)
		let jsonFood = response.data.results;
		if(jsonFood.length === 0){
			res.status(404).json({message: 'No se encontraron recetas'})
		}else{
			if(name){
				console.log('hola')
				//var index = cadena.indexOf(name);
				let jsonFiltered = jsonFood.filter(e=>(e.title.indexOf(name))>=0)
				jsonFood =jsonFiltered
			}
		}
		res.status(201).json(jsonFood)
		
	} catch (error){
	 	console.log("error:",error)	
	}
})


router.get('/:idReceta', async (req, res) => {
	try{
		const {idReceta} = req.params;
		console.log(idReceta)
		const url=`https://api.spoonacular.com/recipes/${idReceta}/information?apiKey=${API_KEY}`;
		const response = await axios.get(url);
		res.status(201).json(response.data)

	} catch (error){
		console.log("error:",error)	
   }
})


 module.exports = router;