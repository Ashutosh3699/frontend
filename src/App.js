import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Navbar from "./Components/common/Navbar";
import OpenRoute from "./Components/core/AuthTemplate/OpenRoute";
import ForgotPassword from "./Components/core/AuthTemplate/ForgotPassword";
import UpdatePassword from "./Components/core/AuthTemplate/UpdatePassword";
import ResetComplete from "./Components/core/AuthTemplate/ResetComplete";
import VerifyEmail from "./Components/core/AuthTemplate/VerifyEmail";
import AboutUs from "./Pages/AboutUs";
import ContactUsPage from "./Pages/ContactUsPage";

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
          path="/verify-email" 
          element={
            <OpenRoute>
              <VerifyEmail/>
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

          <Route  
            path="/update-password/:id" 
            element={
              <OpenRoute>
                <UpdatePassword/>
              </OpenRoute>
            }  
          />

          <Route  
            path="/reset-completed" 
            element={
              <OpenRoute>
                <ResetComplete/>
              </OpenRoute>
            }  
          />


          <Route
            path="/about-us"
            element={
              <AboutUs/>
            }
          />

          <Route
            path="/contact"
            element={
              <ContactUsPage/>
            }
          />

      </Routes>

     }
    </div>
  );
}

export default App;
