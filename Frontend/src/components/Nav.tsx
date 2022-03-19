import React from "react";
import { Link } from "react-router-dom";
import User from "../pages/User";

const Nav = (props: {fname : string, lname : string, setFname: (fname: string) => void}) => {

  const logout = async () => {
    await fetch('http://localhost:8000/api/logout', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      credentials: 'include'
    });

    props.setFname("");
  }

  let menu;

  if(props.fname === props.lname){
    menu = (
      <ul className="navbar-nav me-auto mb-2 mb-md-0">
      
        <li className="nav-item">
          <Link to="/login" className="navbar-brand">Login</Link>
        </li>

        <li className="nav-item">
          <Link to="/register" className="navbar-brand">Register</Link>
        </li>

      </ul>
    )
  } else {
    menu = (
      <ul className="navbar-nav me-auto mb-2 mb-md-0">
      
        <li className="nav-item">
          <Link to="/login" className="navbar-brand" onClick={logout}>Logout</Link>
        </li>

      </ul>
    )
  }

    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">Home</Link>

          <div>
            {menu}
          </div>
        </div>
      </nav>
    );
};

export default Nav;