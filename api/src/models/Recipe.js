const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
//   Receta con las siguientes propiedades:
// ID: *
// Nombre *
// Resumen del plato *
// Puntuación
// Nivel de "comida saludable"
// Paso a paso
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue: UUIDV4,//para evitar conflicto con ids de la api
      primaryKey: true,
      //allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    aggregateLikes:{
      type: DataTypes.INTEGER,
      //allowNull: false,
    },
    healthScore:{
      type: DataTypes.FLOAT,
      //allowNull: false,
    },
    instructions:{
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    
  });
};
