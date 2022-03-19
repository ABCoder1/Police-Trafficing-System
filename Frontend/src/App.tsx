import React, { useEffect, useState } from "react";
import { BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import User from "./pages/User";

function App() {

  const [fname, setfirstName] = useState("");
  const [lname, setlastName] = useState("");
  // const [uid, setUId] = useState("");

  useEffect(() => {
      (
          async () => {
              const response = await fetch('http://localhost:8000/api/user', {
                  headers: {"Content-Type": "application/json"},
                  credentials: 'include'
              });

              const content = await response.json();

              setfirstName(content.FNAME)
              setlastName(content.LNAME)
              // setUId(content.UID)
          }
      )();
  });

  return (
    <div className="App">
        
        <BrowserRouter>

          <Nav fname={fname} lname={lname} setFname={setfirstName} />

          <main className="form-signin">
        
          <Route path="/" exact component={Home} />
          <Route path="/user" exact component={(Props: JSX.IntrinsicAttributes & { userId: string; userType: string; pwd: string; }) => <User {...Props} />} />
          <Route path="/login" exact component={() => <Login setFname={setfirstName} setLname={setlastName} />} />
          <Route path="/register" exact component={Register} />

          </main>

        </BrowserRouter>
   
    </div>
  );
}

export default App;

// render={(props) => <User {...props} />}

// component={(userType: string, userId: string) => new User(userType, userId)}