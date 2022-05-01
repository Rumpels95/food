require('dotenv').config();
const axios = require('axios').default;
const { Router } = require('express');
const { getFoodById, getRecipes } = require('../controllers/index')
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
		res.status(404).json({error: error.message})
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




 module.exports = router;