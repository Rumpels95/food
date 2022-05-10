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
      defaultValue: UUIDV4,
      primaryKey: true,
      //allowNull: false,
    },
    name: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
      validate:{
        is: /^[a-zA-Z\s]*$/,
      }
    },
    summary:{
      type: DataTypes.STRING(800),
      allowNull: false,
      unique: true,
    },
    spoonacularScore:{
      type: DataTypes.INTEGER,
      validate:{
        min: {
          args: [0],
          msg: "Debe ser mayor a 0"
        },
        max: {
          args: [100],
          msg: "Debe ser menor a 100"
        },
      }
      //allowNull: false,
    },
    healthScore:{
      type: DataTypes.FLOAT,
      validate:{
        min: {
          args: [0.0],
          msg: "Debe ser mayor a 0"
        },
        max: {
          args: [100.0],
          msg: "Debe ser menor a 100"
        },
      }
      //allowNull: false,
    },
    instructions:{
      type: DataTypes.STRING(1500),
    },
    image:{
      type: DataTypes.STRING,
      defaultValue: "No image",
      //allowNull: true,
    },
  },
  {
    timestamps: false,
    
  }); 
};
 