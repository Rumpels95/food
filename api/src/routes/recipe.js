const { Router } = require('express');
const { getFoodById, postFood } = require('../controllers');
const { Recipe, Diet } = require('../db');
const router = Router();


router.post('/', async (req,res)=> {
  
  const {name, summary, spoonacularScore, healthScore, instructions, diet, image} = req.body
  console.log(req.body)
  if(!name || !summary){
    return res.status(402).send('Completar los campos obligatorios')
  }
  if(!diet.length>0) res.status(402).send('Debe ingresar dietas')
  try{
    res.status(202).json({message: await postFood(req.body)})  
  }catch (err){
    res.status(404).json(err.message)
  }
})


module.exports = router;