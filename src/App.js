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
import Dashboard from "./Pages/Dashboard";
import MyProfile from "./Pages/MyProfile";
import Error from "./Pages/Error"
import PrivateRoute from "./Components/core/AuthTemplate/PrivateRoute";
import Settings from "./Pages/Settings";
import { useSelector } from "react-redux";
import {ACCOUNT_TYPE} from "./utils/constant"
import EnrolledCourses from "./Components/core/Dashboard/EnrolledCourses";
import Cart from "./Components/core/Dashboard/cart/Cart";
import MyCourses from "./Components/core/Dashboard/My-courses/MyCourses";
import AddCourses from "./Components/core/Dashboard/createCourses";
import EditCourse from "./Components/core/Dashboard/editcourse/EditCourse";
import Catalog from "./Pages/Catalog";
import CourseDetail from "./Components/core/catalogcourse/courseDetail/CourseDetail";
import ViewCourse from "./Pages/ViewCourse";
import VideoDetailCourse from "./Components/core/viewCourse/VideoDetailCourse";
import Instructor from "./Components/core/Dashboard/instructor/Instructor";


function App() {

  const {user} = useSelector((state)=>state.profile);

  return (
    <div>
      <Navbar/>
     {
      <Routes>

          <Route  
          path="/" 
          element={
              <Home/>
          }  
          />
          <Route  
          path="/catalog/:catalogName" 
          element={
              <Catalog/>
          }  
          />

        <Route  
          path="/courses/:courseId" 
          element={
              <CourseDetail/>
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

          <Route
          element={<PrivateRoute>
            <Dashboard/>
          </PrivateRoute>}
          >
            <Route path="/dashboard/my-profile"
            element={<MyProfile/>}/>

          <Route path="/dashboard/settings"
            element={<Settings/>}/>

            {
              user?.accountType === ACCOUNT_TYPE.STUDENT && (
               <>
                <Route path="/dashboard/enrolled-courses"
                  element= {<EnrolledCourses/>}
                  />

                  <Route path="/dashboard/cart"
                  element={<Cart/>}
                  />
               </>
              )
            }

            {
              user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
               <>
                <Route path="/dashboard/my-courses"
                  element= {<MyCourses/>}
                  />

                  <Route path="/dashboard/add-course"
                  element= {<AddCourses/>}
                  />

                <Route path="/dashboard/edit-course/:courseId"
                  element= {<EditCourse/>}
                  />

                <Route path="/dashboard/instructor"
                  element= {<Instructor/>}
                  />
               </>
              )
            }

          </Route>

          <Route
          element={
            <PrivateRoute>
              <ViewCourse/>
            </PrivateRoute>
          }
          >
            {
              user?.accountType === ACCOUNT_TYPE.STUDENT && (
                  <>
                    <Route
                        path="/view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                        element={<VideoDetailCourse/>}
                    />
                  </>
              )
            }

          </Route>

          <Route path="*" element={<Error/>}/>

      </Routes>

     }
    </div>
  );
}

export default App;
