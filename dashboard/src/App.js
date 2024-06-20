import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Login from "./components/AuthComponent/Login";
import HomeComponent from "./components/HomeComponent";
import PrivateRoute from "./components/PrivateRoute";
import AllStudent from "./components/Student/AllStudent";
import UserProfile from "./components/AuthComponent/UserProfile";

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/login" element={<Login/>}/>
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
            <RouterProvider router={router}/>
        </>
    );
}

export default App;
