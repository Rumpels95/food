import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";

export default function Cards({foods}){
    return <>
    {
        foods?.map(e=>{
            return(
                <div>
                    <Link to={"/recipes/"+e.id}>
                        <Card name={e.name} image={e.image} diets={e.diets?e.diets:e.dietas.map(e=>e.name)} id={e.id}/>
                    </Link>
                </div>	
            )
        }
        )
    }
    </>
}