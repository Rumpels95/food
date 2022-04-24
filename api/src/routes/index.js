const { Router } = require('express');
//const express = require('express'); //probar
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipesRouter = require('./recipes.js'); //agregué
const recipeRouter = require('./recipe.js');//agregué
const typesRouter = require('./types.js');//agregué
const router = Router();
//const router = express(); //probar
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', recipesRouter);
router.use('/recipe', recipeRouter);
router.use('/types', typesRouter);

module.exports = router;
