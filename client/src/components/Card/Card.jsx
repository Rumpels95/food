//imagen, nombre, tipo de dieta
import React from "react";
import style from './Card.module.css'

export default function Card({ name, image, diets, id}){
	return (
		<a className={style.cards} key={id}>
			<h3>{name}</h3>
			<img src={image} alt="img not found" width="250em" height="200em" />
			<h5>Dietas: {diets.join(", ").charAt(0).toUpperCase() + diets.join(", ").slice(1)}</h5>
		</a>
	)
}