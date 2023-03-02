import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Posts from "./pages/Post/Posts";
import Profile from "./pages/Profile";
import "./style.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Chat from "./pages/Chat";
import Otp from "./pages/otp/Otp";
import Homee from "./pages/Home";
import NavigatioBar from "./components/NavigatioBar";
import Dummy from "./pages/Create";
import LoginProfile from "./pages/LoginProfile";
import SingleBlog from "./components/SingleBlog";
import SingleView from "./pages/SingleView";
import PostPage from "./components/PostPage";
import Post from "./pages/Post";


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
          {/* <RightBar /> */}
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
          element: <Posts />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        
        // {
        //   path:"/user",
        //   element:<LoginProfile/>
        // }
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
      path:'/home',
      element:<Homee/>
    },
    {
      path:'/dummy',
      element:<Dummy/>
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
      path:'/postpage',
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
