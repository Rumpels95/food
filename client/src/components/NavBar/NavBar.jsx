import React from "react";
import { Link } from "react-router-dom";
import style from "./NavBar.module.css";

export default function NavBar() {
  return (
    <nav className={style.nav}>
      <ul className={style.ul}>
        <li className={style.li}>
          <Link className={style.link} to="/home">Home</Link>
        </li>
        <li className={style.li}>
          <Link className={style.link} to="/recipe">Crea tu receta</Link>
        </li>
      </ul>
    </nav>
  );
}
