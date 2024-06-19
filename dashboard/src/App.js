import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Lgoin from "./components/AuthComponent/Lgoin";
import HomeComponent from "./components/HomeComponent";
import PrivateRoute from "./components/PrivateRoute";
import AllStudent from "./components/Student/AllStudent";
import UserProfile from "./components/AuthComponent/UserProfile";



function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<Lgoin/>}/>
        <Route path="/" element={<PrivateRoute><HomeComponent/></PrivateRoute>}/>
        <Route path="/home" element={<PrivateRoute><HomeComponent/></PrivateRoute>}>
          <Route path="profile" element={<UserProfile/>}/>
          <Route path="student" element={<AllStudent/>}/>
        </Route>
      </>
    )
  );
  return (
    < >
      <RouterProvider router={router} />
    </>
  );
}

export default App;
