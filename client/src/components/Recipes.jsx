import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getRecipes } from "../redux/actions"

export default function Recipes() {

	const dispatch = useDispatch()
	useEffect(()=>{
			dispatch(getRecipes())
	}, [dispatch])
	
	return (
			<div>HOLA</div>
	)
}