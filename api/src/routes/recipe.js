const { Router } = require('express');
const { Recipe } = require('../db');
const router = Router();
const {
    API_KEY,
  } = process.env;

router.post('/', async (req,res)=> {
  const {name, summary, aggregateLikes, healthScore, instructions} = req.body
  console.log(req.body)
  if(!name || !summary){
    return res.status(402).send('Completar los campos obligatorios')
  }
  
  try{
    newRecipe = await Recipe.create(req.body)
    console.log(newRecipe)
    res.status(202).send(req.body)
  }catch (err){
    res.status(404).send('Error en alguno de los datos provistos')
  }
})


module.exports = router;