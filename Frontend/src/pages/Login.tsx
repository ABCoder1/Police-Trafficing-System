import React, {SyntheticEvent, useState} from "react";
import { Redirect, useHistory } from "react-router-dom";

const Login = (props: {setFname: (fname: string) => void, setLname: (fname: string) => void}) => {

    const [uid, setUId] = useState("");
    const [pwd, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [userType, setUserType] = useState("");

    let history = useHistory();

    const submit = async (e: SyntheticEvent) => {
      
        e.preventDefault();

        const response = await fetch('http://localhost:8000/api/login', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: 'include',
            body: JSON.stringify({
                uid,
                pwd,
                userType
            })
        });

        const content = await response.json();

        setRedirect(true);
        props.setFname(content.FNAME)
        props.setLname(content.LNAME)
        setPassword(content.PASSWORD)
    }



    if (redirect) {

        history.push("/user")
        
        return <Redirect to={{
            pathname: "/user",
            state: {userId: uid, userType: userType, password: pwd}
        }} />;
    }

    
    return (
        <form onSubmit={submit}>
          
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

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

        <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>

      </form>
            
    );
};

export default Login;