import React from "react";
import "../App.css";
import { Link, NavLink } from "react-router-dom";
import supabase from "./Services/supabaseClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 faDiamond,
 faHome,
 faRightFromBracket,
 faRightToBracket,
 faGamepad,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
 const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
   console.log("Error logging out:", error.message);
  } else {
   window.alert("You have successfully logged out!");
   window.location.href = "/";
  }
 };

 return (
  <div>
   <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
     {/* Navbar toggler button
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button> */}
     <Link className="navbar-brand" to="/">
      Pokedex of Anomalies
     </Link>
     <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 navbar-link">
       <li className="nav-item">
        <NavLink
         className="nav-link"
         exact
         to="/"
         activeClassName="active"
         style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
         }}
        >
         <FontAwesomeIcon icon={faHome} size="lg" />
         <br></br>
         Home
        </NavLink>
       </li>
       <li className="nav-item">
        <NavLink
         className="nav-link"
         exact
         to="/sets"
         activeClassName="active"
         style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
         }}
        >
         <FontAwesomeIcon icon={faDiamond} size="lg" />
         <br></br>
         TCG
        </NavLink>
       </li>
       <li className="nav-item">
        <NavLink
         className="nav-link"
         exact
         to="/Pokedex"
         activeClassName="active"
         style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
         }}
        >
         <FontAwesomeIcon icon={faGamepad} size="lg" />
         <br></br>
         Pokedex
        </NavLink>
       </li>
       <li className="nav-item">
        <NavLink
         className="nav-link"
         exact
         to="/Login"
         activeClassName="active"
         style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
         }}
        >
         <FontAwesomeIcon icon={faRightToBracket} size="lg" />
         <br></br>
         Login
        </NavLink>
       </li>
       <li className="nav-item">
        <Link
         className="nav-link"
         onClick={handleLogout}
         style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
         }}
        >
         <FontAwesomeIcon icon={faRightFromBracket} size="lg" />
         <br></br>
         Logout
        </Link>
       </li>
       {/* <li className="nav-item">
                                <Link className="nav-link" to="/SignUp">Sign Up</Link>
                            </li> */}
      </ul>
      {/* Search form
                        <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
                            <input
                                className="form-control me-2 search-input"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <button className="btn btn-outline-success search-button" type="submit">
                                <FontAwesomeIcon icon={faSearch} />
                            // </button> */}
      {/* </form> */}
     </div>
    </div>
   </nav>
  </div>
 );
};

export default Navbar;