import React, { SyntheticEvent, useState } from "react";
import { Redirect } from "react-router-dom";

const Register = () => {
    const [fname, setfirstName] = useState("");
    const [lname, setlastName] = useState("");
    const [uid, setUId] = useState("");
    const [pwd, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [userType, setUserType] = useState("");

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await fetch('http://localhost:8000/api/register', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                fname,
                lname,
                uid,
                pwd,
                userType
            })
        });

        setRedirect(true);

    }

    if (redirect) {
        return <Redirect to="/login" />;
    }


    return (
        <form onSubmit={submit}>
          
        <h1 className="h3 mb-3 fw-normal">Please Register</h1>

        <input type="text" className="form-control" placeholder="First Name" required 
            onChange={e => setfirstName(e.target.value)} 
        />

        <input type="text" className="form-control" placeholder="Last Name" required 
            onChange={e => setlastName(e.target.value)}
        />

        <input type="text" className="form-control" placeholder="User Id" required 
            onChange={e => setUId(e.target.value)}
        />

        <input type="password" className="form-control" placeholder="Password" required 
            onChange={e => setPassword(e.target.value)}
        />

        {/* For taking input about the user type */}

        <label> User Type: </label> 
        <input type="radio" value="driver" id="driverButn" name="userType" required 
            onChange={e => setUserType(e.target.value)}
        />
        <label htmlFor="html">Driver</label>
        
        <input type="radio" value="police" id="policeButn" name="userType" 
            onChange={e => setUserType(e.target.value)}
        />
        <label htmlFor="css">Police</label>

        <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>

      </form>
    );
};

export default Register

// const content = await response.json();

// console.log(content);