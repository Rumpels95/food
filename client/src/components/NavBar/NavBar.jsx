import React from "react";
import { Link } from "react-router-dom";

export default function NavBar(){
    return(
        <ul>
            <li>
                <Link to='/recipes'>Home</Link>
            </li>
            <li>
                <Link to='/recipe'>Crea tu receta</Link>
            </li>
        </ul>
    )
}