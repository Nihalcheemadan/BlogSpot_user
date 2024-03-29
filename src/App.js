import Login from "./pages/Login";
import Register from "./pages/Register";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Profile from "./pages/Profile";
import "./style.scss";
import Chat from "./pages/Chat";
import Otp from "./pages/Otp";
import Homee from "./pages/Home";
import LoginProfile from "./pages/LoginProfile";
import SingleView from "./pages/SingleView";
import Post from "./pages/Post";
import CreateBlog from "./pages/CreateBlog";
import Error from "./components/Error";
import ProtectedRoute from "./components/ProtectedRoute";
import Dummy from "./pages/Dummy";
import EditBlog from "./pages/EditBlog";
import Payment from "./pages/Payment";


function App() {


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
      element:<ProtectedRoute><Chat/></ProtectedRoute>
    },
    {
      path:"/otp",
      element:<Otp/>
    },
    {
      path:'/',
      element:<Homee/>
    },
    {
      path:'/create',
      element: <ProtectedRoute><CreateBlog/></ProtectedRoute> 
    },
    {
      path:'/dprofile/:id',
      element:<ProtectedRoute><Profile/></ProtectedRoute>  
    },
    {
      path:'/userProfile',
      element:<ProtectedRoute><LoginProfile/></ProtectedRoute> 
    },
    {
      path:'/singleBlog/:id',
      element:<ProtectedRoute><SingleView/></ProtectedRoute> 
    },
    {
      path:'/post',
      element:<ProtectedRoute><Post/></ProtectedRoute>
    },
    {
      path:'*',
      element:<Error/>
    },
    {
      path:'/editBlog',
      element:<ProtectedRoute><EditBlog/></ProtectedRoute> 
    },
    {
      path:'/payment',
      element:<ProtectedRoute><Payment/></ProtectedRoute> 
    },
    {
      path:'/dummy',
      element: <Dummy/>
    }


  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>  
  );
}

export default App;
