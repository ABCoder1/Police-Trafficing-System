import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>

            <h1> Traffic Ticketing System</h1>

            <button> <Link to="/login">Login</Link> </button>
            <button> <Link to="/register">Register</Link> </button>

        </div>
    );
};

export default Home;