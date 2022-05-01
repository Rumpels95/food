const { Router } = require('express');
const { Recipe, Diet } = require('../db');
const router = Router();


router.post('/', async (req,res)=> {
  
  const {name, summary, spoonacularScore, healthScore, instructions, diet, image} = req.body
  console.log(req.body)
  if(!name || !summary){
    return res.status(402).send('Completar los campos obligatorios')
  }
  try{
    res.header("Access-Control-Allow-Origin", "*");
    newRecipe = await Recipe.create({
      name,
      summary,
      spoonacularScore,
      healthScore,
      instructions,
      image
    })
    console.log(newRecipe.id)
    let dietDb = await Diet.findAll({
      where: { name: diet }
    })
    newRecipe.addDiet(dietDb)

    res.status(202).send(req.body)
  }catch (err){
    res.status(404).send('Error en alguno de los datos provistos')
  }
})


module.exports = router;