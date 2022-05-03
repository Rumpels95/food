import React from "react";
import style from './Paginado.module.css'


export default function Paginado({ foodsPerPage, allFoods, paginado }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allFoods / foodsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
		<nav>
			<div className={style.paginado}>
				{ pageNumbers?.map(e =>(
					<span className={style.number} key={e}>
						<a onClick={()=> paginado(e)}>{e}</a>
					</span>
				))}
			</div>
		</nav>
	)
}
