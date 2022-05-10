const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	sequelize.define('diet', { 
		id:{
			type: DataTypes.UUID,
      		defaultValue: UUIDV4,
			primaryKey: true,
			//allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
	},
	{
	  timestamps: false,
	  
	});
};  
