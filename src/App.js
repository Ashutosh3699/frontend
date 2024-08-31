import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { useState } from "react";

function App() {

  const [isLoggedin,setIsLoggedIn] = useState({});

  console.log(isLoggedin);

  return (
    <div>
     {
      <Routes>
          <Route  path="/" element={<Home/>}  />
          <Route  path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />}  />
          <Route  path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>}  />
      </Routes>

     }
    </div>
  );
}

export default App;
