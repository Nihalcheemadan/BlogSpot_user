import "./nav.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import CreateIcon from "@mui/icons-material/Create";
import LogoutIcon from "@mui/icons-material/Logout";



const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);

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
          {/* <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." /> */}
        </div>
      </div>
      <div className="right">
        <Link to="/userprofile">
        <PersonOutlinedIcon />
        </Link>
        <Link to="/chat">
          <EmailOutlinedIcon />
        </Link>
        {/* <NotificationsOutlinedIcon /> */}
          {/* <div className="user">
            <img src='' alt="" />
            <span>Nihal</span>
          </div> */}
        <Link to="/create">
          <CreateIcon />
        </Link>
        <div
          onClick={() => {
            localStorage.clear();
            Navigate("/login");
          }}
        >
          <Link to='/login'>
            <LogoutIcon />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

