import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link, useNavigate } from "react-router-dom";
import Comments from "../comments/Comments";
import { useEffect, useState } from "react";
import axios from "axios";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const [liked, setLiked] = useState(false);
  const [count ,setCount ] = useState(post.like.length);
  const navigate = useNavigate()

  const handleLikeClick = async(id) => {
    const token = localStorage.getItem("token");
    await axios.put('/api/blog/likeBlog', 
    { id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res)=>{
      console.log(res.data);
      // setCount(res.data.post.like);
      if(setLiked(res?.data?.liked === true)){
        setCount(count+1)
      }else{
        setCount(count-1)
      }
      // setLiked(res?.data?.liked);
    })
  }; 

  // useEffect(() => {
  //   // fetch like count on page load
  //   const fetchLikeCount = async () => {
  //     const token = localStorage.getItem("token");
  //     await axios
  //       .get(`/api/blog/likeBlog/${post._id}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       })
  //       .then((res) => {
  //         setLikeCount(res.data.likeCount);
  //       });
  //   };
  //   fetchLikeCount();
  // }, []);
  
  //TEMPORARY
  // console.log(count.length);
  // const liked = false;
  function getTimeAgo(createdAt) {
    const currentDate = new Date();
    const commentDate = new Date(createdAt);
    const diffInMs = currentDate - commentDate;
    const diffInMin = Math.floor(diffInMs / (1000 * 60));
    const diffInHr = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDay = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    if (diffInDay > 0) {
      return `${diffInDay} day${diffInDay > 1 ? 's' : ''} ago`;
    } else if (diffInHr > 0) {
      return `${diffInHr} hour${diffInHr > 1 ? 's' : ''} ago`;
    } else if (diffInMin > 0) {
      return `${diffInMin} minute${diffInMin > 1 ? 's' : ''} ago`;
    } else {
      return 'just now';
    }
  }
  const limit = 500;
  const limitedContent = `<p>${post.content.substring(0, limit)}...</p>`;

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
              {/* <Link 
                to={{pathname:`/profile/${post.author._id}`,state: { data: post.author }}}
                style={{ textDecoration: "none", color: "inherit" }}
              >
              </Link>  */}
            <img   onClick={()=> navigate(`/profile/${post.author._id}`,{state: { data: post.author }})} src={post.author.profileImg} alt="" />
            <div className="details">
              {/* <span className="date">Nihal</span> */}
                <span className="name">{post.title}</span>
              <span className="date">{getTimeAgo(post.createdAt)}</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div> 
        <div className="content">
          {showFull ? (
            <p dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <p dangerouslySetInnerHTML={{ __html: limitedContent }} />
          )}
          <button className="showmore" onClick={() => setShowFull(!showFull)}>
            {showFull ? "Show Less" : "Read More"}
          </button>
          <img src={post.imageUrl} alt="" />
          {console.log(post.imageUrl)}
        </div>
        <div className="info">
          <div className="item">
            <span onClick={()=>handleLikeClick(post._id)}>
              {liked ? (
                <FavoriteBorderOutlinedIcon />
                ) : (
                  <FavoriteOutlinedIcon />
              )}  
            </span>
            {post.like.length}
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            12 Comments
          </div> 
          {/* <div className="item">
            <ShareOutlinedIcon />
            Share
          </div> */}
        </div>
        {commentOpen && <Comments post={post} />}
      </div>
    </div>
  );
};

export default Post;
