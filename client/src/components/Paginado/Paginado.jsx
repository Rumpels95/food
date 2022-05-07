import React from "react";
import style from './Paginado.module.css'


export default function Paginado({ foodsPerPage, allFoods, paginado, cambiarIndex }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allFoods / foodsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
		<nav>
			<div className={style.paginado}>
				{ pageNumbers?.map(e =>(
					cambiarIndex(e)?
						(<span className={style.number1} key={e} onClick={()=> paginado(e)}>{e}
						{/* <a onClick={()=> paginado(e)}>{e}</a> */}
					</span>)
					: (<span className={style.number} key={e} onClick={()=> paginado(e)}>{e}
						</span>) 
				))}
			</div>
		</nav>
	)
}
