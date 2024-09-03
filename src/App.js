import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Navbar from "./Components/common/Navbar";

function App() {

  return (
    <div>
      <Navbar/>
     {
      <Routes>
          <Route  path="/" element={<Home/>}  />
          <Route  path="/signup" element={<Signup />}  />
          <Route  path="/login" element={<Login />}  />
      </Routes>

     }
    </div>
  );
}

export default App;
