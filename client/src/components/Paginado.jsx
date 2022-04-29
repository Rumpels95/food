import React from "react";

export default function Paginado({ foodsPerPage, allFoods, paginado }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allFoods / foodsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
		<nav>
			<ul className="paginado">
				{ pageNumbers?.map(e =>(
					<li className="number" key={e}>
						<a onClick={()=> paginado(e)}>{e}</a>
					</li>
				))}
			</ul>
		</nav>
	)
}
