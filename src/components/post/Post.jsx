import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState } from "react";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const limit = 500;

  const limitedContent = `<p>${post.content.substring(0, limit)}...</p>`;

  //TEMPORARY
  const liked = false;
  return (
    <div className="post"> 
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.imageUrl} alt="" />

            <div className="details">
              {/* <span className="date">Nihal</span> */}
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.title}</span>
              </Link>
              <span className="date">1 min ago</span>
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
        </div>
        <div className="info">
          <div className="item">
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            12 Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            12 Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments />}
      </div>
    </div>
  );
};

export default Post;
