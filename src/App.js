import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Profile from "./pages/Profile";
import "./style.scss";
import Chat from "./pages/Chat";
import Otp from "./pages/otp/Otp";
import Homee from "./pages/Home";
import LoginProfile from "./pages/LoginProfile";
import SingleView from "./pages/SingleView";
import Post from "./pages/Post";
import CreateBlog from "./pages/CreateBlog";


function App() {
  // const { darkMode } = useContext(DarkModeContext);
  

  // const ProtectedRoute = ({ children }) => {
  //   if (!currentUser) {
  //     return <Navigate to="/login" />;
  //   }
  //   return children;
  // }

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path:"/chat",
      element:<Chat/>
    },
    {
      path:"/otp",
      element:<Otp/>
    },
    {
      path:'/home',
      element:<Homee/>
    },
    {
      path:'/create',
      element:<CreateBlog/>
    },
    {
      path:'/dprofile/:id',
      element:<Profile/>
    },
    {
      path:'/userProfile',
      element:<LoginProfile/>
    },
    {
      path:'/singleBlog/:id',
      element:<SingleView/>
    },
    {
      path:'/post',
      element:<Post/>
    }
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>  
  );
}

export default App;
