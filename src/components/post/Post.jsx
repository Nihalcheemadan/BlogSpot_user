import "./post.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import FlagIcon from "@mui/icons-material/Flag";
import OutlinedFlagOutlinedIcon from "@mui/icons-material/OutlinedFlagOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { Link, useNavigate } from "react-router-dom";
import Comments from "../Comments";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const [liked, setLiked] = useState();
  const [count, setCount] = useState(post?.like?.length);
  const [saved, setSaved] = useState();
  const [reported, setReported] = useState(true);
  const [blogId, setBlogId] = useState(post?._id);
  // const [change,setChange] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLikeClick = async (id) => {
    await axios
      .put(
        "/api/blog/likeBlog",
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data, "like logged here");
        // setCount(res.data.post.like);
        if (res?.data?.liked === true) {
          setCount(count + 1);
          setLiked(true);
          toast.success(res.data.msg);
        } else {
          setCount(count - 1);
          setLiked(true);
          toast.success(res.data.msg);
        }

        // setLiked(res?.data?.liked);
      });
  };

  const saveBlog = async (id) => {
    await axios
      .put(
        "/api/blog/saveBlog",
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setSaved(true);
        toast.success(res.data.msg);
      });
  };

  //reportBlog

  const reportBlog = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "/api/blog/reportBlog",
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setReported(true);
      toast.success(response.data.msg);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .post(
        "/api/blog/getSingleBlog",
        { blogId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setLiked(res.data.liked);
        setSaved(res.data.saved);
      });
  }, []);

  function getTimeAgo(createdAt) {
    const currentDate = new Date();
    const commentDate = new Date(createdAt);
    const diffInMs = currentDate - commentDate;
    const diffInMin = Math.floor(diffInMs / (1000 * 60));
    const diffInHr = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDay = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    if (diffInDay > 0) {
      return `${diffInDay} day${diffInDay > 1 ? "s" : ""} ago`;
    } else if (diffInHr > 0) {
      return `${diffInHr} hour${diffInHr > 1 ? "s" : ""} ago`;
    } else if (diffInMin > 0) {
      return `${diffInMin} minute${diffInMin > 1 ? "s" : ""} ago`;
    } else {
      return "just now";
    }
  }
  const limit = 500;
  const limitedContent = `<p>${post?.content.substring(0, limit)}...</p>`;

  return (
    <>
      <div className="post">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="container">
          <div className="user">
            <div className="userInfo">
              {/* <Link 
                to={{pathname:`/profile/${post.author._id}`,state: { data: post.author }}}
                style={{ textDecoration: "none", color: "inherit" }}
              >
              </Link>  */}
              <img
                onClick={() =>
                  
                  navigate(`/dprofile/${post?.author?._id}`, {
                    state: { data: post?.author },
                  })
                }
                src={post?.author?.profileImg}
                alt=""
              />
              <div className="details">
                {/* <span className="date">Nihal</span> */}
                <span className="name">{post?.title}</span>
                <span className="date">{getTimeAgo(post?.createdAt)}</span>
              </div>
            </div>
            <MoreHorizIcon />
          </div>
          <div className="content">
            {showFull ? (
              <p dangerouslySetInnerHTML={{ __html: post?.content }} />
            ) : (
              <p dangerouslySetInnerHTML={{ __html: limitedContent }} />
            )}
            <button className="showmore" onClick={() => setShowFull(!showFull)}>
              {showFull ? "Show Less" : "Read More"}
            </button>
            <img src={post?.imageUrl} alt="" />
            {console.log(post?.imageUrl)}
          </div>
          <div className="info">
            <div className="item">
              <span onClick={() => handleLikeClick(post?._id)}>
                {liked === true ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </span>
              {post?.like?.length}
            </div>
            <div
              className="item"
              onClick={() => {
                reportBlog(post?._id);
              }}
            >
              {reported === false ? <FlagIcon /> : <OutlinedFlagOutlinedIcon />}
            </div>
            <div
              className="item"
              onClick={() => {
                saveBlog(post?._id);
              }}
            >
              {saved === true ? <BookmarkAddedIcon /> : <BookmarkBorderIcon />}
            </div>
            
          </div>
          {commentOpen && <Comments post={post} />}
        </div>
      </div>
    </>
  );
};

export default Post;
