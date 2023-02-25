import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import "./profile.scss";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import jwtDecode from "jwt-decode";

const Profile = () => {
  const location = useLocation();
  const author = location.state.data;
  const [alreadyFollowed, setAlreadyFollowed] = useState(false);
  // const [followed, setFollowed] = useState(alreadyFollowed);
  const [ userProfile,setUserProfile] = useState(false);
  const token = localStorage.getItem("token");
  const { userId } = jwtDecode(token);

  useEffect(() => {
  const token = localStorage.getItem("token");
  const { userId } = jwtDecode(token);
  console.log(author.Followers,userId,'authooooooooooooooor');
    const matchFollow = async() => {
      if (author.Followers.includes(userId)) {
        setAlreadyFollowed(true);
      } else if(author._id === userId){
        setUserProfile(true)
      }
    };
    matchFollow();
  }, []);

  console.log(author.Followers,userId,'foooooooooooooooooooooooooooooooo');

  const handleFollow = async (id) => {
    await axios.put(
      `/api/user/following/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    setAlreadyFollowed((prev) => !prev);
    alreadyFollowed === true
      ? toast.success("You're now following this user")
      : toast.success("You're now Unfollowing this user");
  };
  return (
    <div className="profile">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="images">
        <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="cover"
        />
        <img src={author.profileImg} alt="" className="profilePic" />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          {/* <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="large" />
            </a>
          </div> */}
          <div className="center">
            <span>{author.username}</span>
            {/* <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>USA</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>lama.dev</span>
              </div>
            </div> */}
            
            { userProfile === false ?  alreadyFollowed === true ? (
              <button onClick={() => handleFollow(author._id)}>Unfollow</button>
            ) : (
              <button onClick={() => handleFollow(author._id)}>follow</button>
            ) : '5 Followers'}
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
        <Posts />
      </div>
    </div>
  );
};

export default Profile;
