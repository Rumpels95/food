'use strict'
const { Diet } = require('../db');

module.exports = {

	
	callDiets: async function (){ 
		

		const arrayDiet = [{name:'gluten free'}, {name:'ketogenic'}, {name:'vegetarian'}, {name:'lacto vegetarian'}, {name:'lacto ovo vegetarian'},
		{name:'vegan'}, {name:'pescatarian'}, {name:'paleolithic'}, {name:'primal'}, {name:'fodmap friendly'}, {name:'whole 30'}, {name:'dairy free'}];

		await Diet.bulkCreate(arrayDiet, {ignoreDuplicates: true})    
		
	}
		
}