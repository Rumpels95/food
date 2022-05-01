//imagen, nombre, tipo de dieta
import React from "react";

export default function Card({ name, image, diets, id}){
	return (
		<div key={id}>
			<h3>{name}</h3>
			<h5>{diets}</h5>
			<img src={image} alt="img not found" width="200px" height="200px" />
		</div>
	)
}