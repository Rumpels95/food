'use strict'
const { Diet } = require('../db');

module.exports = {

	// const users = [{name: 'alice'}, {name: 'bek'}, {name: 'chris'}];
	// before(()=>models.sequelize.sync({force: true}));
	// before(()=> models.User.bulkCreate(users));
	callDiets: async function (){
		//const bulk = async()=>{
		const arrayDiet = [{name:'gluten free'}, {name:'ketogenic'}, {name:'vegetarian'}, {name:'lacto vegetarian'}, {name:'ovo Vegetarian'},
		{name:'vegan'}, {name:'pescatarian'}, {name:'paleolithic'}, {name:'primal'}, {name:'fodmap friendly'}, {name:'whole 30'}, {name:'dairy free'}];

		await Diet.bulkCreate(arrayDiet)
		//console.log(character) 
	}
		//bulk();

}