import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getRecipes } from '../redux/actions/index'


function Boton(){
	const dispatch = useDispatch()

	//const foods = useSelector(store => store)
	//console.log(foods)

	return ( 
		<>
			<Link to='/recipes'>
				<button onClick={() => dispatch(getRecipes())}>Ver recetas</button>
			</Link>
		</>
	)
}


export default Boton