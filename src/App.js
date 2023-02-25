import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import "./style.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Chat from "./pages/chat/Chat";
import CreatePost from "./pages/createpost/CreatePost";
import LoginProfile from "./pages/loginprofile/LoginProfile";
import Otp from "./pages/otp/Otp";
import Chats from './pages/dummy/Home'
import Post from "./components/post/Post";
import ChatModified from "./pages/dummy/NavigatioBar";
import Mainpage from "./pages/mainpage/Mainpage";
import Homee from "./pages/dummy/Homee";
import NavigatioBar from "./pages/dummy/NavigatioBar";


function App() {
  const { darkMode } = useContext(DarkModeContext);
  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <NavigatioBar />
        <div style={{ display: "flex" }}>
          
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    );
  };

  // const ProtectedRoute = ({ children }) => {
  //   if (!currentUser) {
  //     return <Navigate to="/login" />;
  //   }
  //   return children;
  // }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        // <ProtectedRoute>
          <Layout />
        /* </ProtectedRoute> */
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path:"/create",
          element:<CreatePost/>
        },
        {
          path:"/userprofile",
          element:<LoginProfile/>
        }
      ],
    },
    
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
      path:'/chatdummy',
      element:<Chats/>
    },
    {
      path:'/home',
      element:<Homee/>
    },
    {
      path:'/main',
      element:<Mainpage/>
    }
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>  
  );
}

export default App;
