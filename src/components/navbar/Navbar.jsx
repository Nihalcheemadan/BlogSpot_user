import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import CreateIcon from "@mui/icons-material/Create";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import Notification from "../notification/Notification";


const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  const [isClicked, setIsClicked] = useState(false);
  
  const handleClick = (clicked) => setIsClicked({  [clicked]: true });

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>BlogSpot</span>
        </Link>
        <HomeOutlinedIcon />
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}

        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <Link to="/userprofile">
          <PersonOutlinedIcon />
        </Link>
        <Link to="/chat">
          <EmailOutlinedIcon />
        </Link>
        {/* <TooltipComponent>
          <button onClick={()=>handleClick('')}>

          </button>
        </TooltipComponent> */}
          <NotificationsOutlinedIcon />
        
        <div className="user">
          <img src={currentUser.profilePic} alt="" />
          <span>Nihal</span>
        </div>
        <Link to="/create">
          <CreateIcon />
        </Link>
      </div>
      
      {/* {isClicked && (<Notification />)} */}
      
    </div>
  );
};

export default Navbar;
