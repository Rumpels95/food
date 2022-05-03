//imagen, nombre, tipo de dieta
import React from "react";
import style from './Card.module.css'

export default function Card({ name, image, diets, id}){
	return (
		<a className={style.cards}>
			<h3>{name}</h3>
			<h5>{diets.join(", ").charAt(0).toUpperCase() + diets.join(", ").slice(1)}</h5>
			<img src={image} alt="img not found" width="200px" height="200px" />
		</a>
	)
}