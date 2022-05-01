const { Router } = require('express');
const { Diet } = require('../db');
const router = Router();
require('dotenv').config();
const axios = require('axios').default;
const {
    API_KEY,
  } = process.env;

router.get('/', async (req, res) => {
	
		//codigo de agregado de nombre de dieta
		try{
			res.header("Access-Control-Allow-Origin", "*");
			const newDiet = await Diet.findAll()
			res.status(201).json(newDiet)
		}catch(error){
			res.status(404).send('Error en alguno de los datos provistos')
		}
	
})


 module.exports = router;