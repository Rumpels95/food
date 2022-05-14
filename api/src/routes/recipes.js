require('dotenv').config();
const axios = require('axios').default;
const { Router } = require('express');
const { getFoodById, getRecipes } = require('../controllers/index');
const { Diet, Recipe } = require('../db');
const router = Router();
const {
  API_KEY,
} = process.env;

//getAll // ?query
router.get('/', async (req, res) => {
	try{
		res.header("Access-Control-Allow-Origin", "*");
		const {name} = req.query;
		res.status(201).json(await getRecipes(name))
	} catch (error){
		res.status(404).json( error)
	}
})


//getId
router.get('/:idReceta',  async(req, res) => {
	try{
		res.header("Access-Control-Allow-Origin", "*");
		const {idReceta} = req.params;
		res.status(201).json(await getFoodById(idReceta))
	} catch (error){
		res.status(404).json({error: error.message})
   }
})

router.delete('/', async(req, res) => {
	let {id}=req.body
	try{
		await Recipe.destroy({
			where: {id}
		})
		res.status(204).json('Eliminado correctamente')
	} catch (error){
		res.status(404).json('Hubo problemas')
	}
})


 module.exports = router;