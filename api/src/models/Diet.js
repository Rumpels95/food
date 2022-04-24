const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	sequelize.define('diet', {
		id:{
			type: DataTypes.STRING(5),
			//defaultValue: UUIDV4,
			primaryKey: true,
			//allowNull: false,
		},
		name: {
      type: DataTypes.STRING,
      //allowNull: false,
    },
	});
};
