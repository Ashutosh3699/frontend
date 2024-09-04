import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Navbar from "./Components/common/Navbar";
import OpenRoute from "./Components/core/AuthTemplate/OpenRoute";
import ForgotPassword from "./Components/core/AuthTemplate/ForgotPassword";

function App() {

  return (
    <div>
      <Navbar/>
     {
      <Routes>

          <Route  
          path="/" 
          element={
            <OpenRoute>
              <Home/>
            </OpenRoute>
          }  
          />
          <Route  
          path="/login" 
          element={
            <OpenRoute>
              <Login/>
            </OpenRoute>
          }  
          />
           <Route  
          path="/signup" 
          element={
            <OpenRoute>
              <Signup/>
            </OpenRoute>
          }  
          />
          <Route  
          path="/forgotPassword" 
          element={
            <OpenRoute>
              <ForgotPassword/>
            </OpenRoute>
          }  
          />

      </Routes>

     }
    </div>
  );
}

export default App;
