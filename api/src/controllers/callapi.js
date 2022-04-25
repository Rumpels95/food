'use strict'
const { Diet } = require('../db');

module.exports = {

	// const users = [{name: 'alice'}, {name: 'bek'}, {name: 'chris'}];
	// before(()=>models.sequelize.sync({force: true}));
	// before(()=> models.User.bulkCreate(users));
	callDiets: async function (){
		//const bulk = async()=>{
		const arrayDiet = [{name:'Gluten Free'}, {name:'Ketogenic'}, {name:'Vegetarian'}, {name:'Lacto-Vegetarian'}, {name:'Ovo-Vegetarian'},
		{name:'Vegan'}, {name:'Pescetarian'}, {name:'Paleo'}, {name:'Primal'}, {name:'Low FODMAP'}, {name:'Whole30'}, {name:'airyFree'}];

		const character = await Diet.bulkCreate(arrayDiet)
		//console.log(character) 
	}
		//bulk();

}