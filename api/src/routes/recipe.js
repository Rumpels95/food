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
    /** */
    // newRecipe = await Recipe.create({
    //   name,
    //   summary,
    //   spoonacularScore: spoonacularScore?spoonacularScore:0, 
    //   healthScore: healthScore?healthScore:0.0,
    //   instructions,
    //   image
    // })
    // console.log(newRecipe.id)
    // let dietDb = await Diet.findAll({
    //   where: { name: diet }
    // })
    // newRecipe.addDiet(dietDb)
    // //console.log(newRecipe)
    // let jsonDbRecipes = await getFoodById(newRecipe.id)
    // console.log(jsonDbRecipes.diets)
    // //jsonDbRecipes.diets()
    /** */
    // if(jsonDbRecipes.diets.includes())
    res.status(202).json({message: await postFood(req.body)})  
  }catch (err){
    res.status(404).json(err.message)
  }
})


module.exports = router;