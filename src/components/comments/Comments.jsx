import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import "./comments.scss";
import { toast } from "react-hot-toast";

const Comments = ({ post }) => {
  const [comment, setComment] = useState("");
  const [previousComments, setPreviousComments] = useState([]);

  useEffect(() => {
    const getComment = async (req, res) => {
      await axios
        .post('/api/blog/comments',{id:post._id})
        .then((res) => {
          console.log(res.data);
          setPreviousComments(res.data.comments);
          
        });
    }; 
    getComment(); 
  }, []); 

  const some = previousComments.user;
  console.log(some,'hjskdgffdhlgiu');

  const uploadComment = async (e) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token, "token here ");
      await axios.put(
        "/api/blog/comment/post",
        {
          comment,
          postid: post._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      
    } catch (error) {
      console.error(error);
    }
  };
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
  
  return (
    <div className="comments">
      <div className="write">
        {/* <h1>{previousComments.comments.comment}</h1> */}
        <form onSubmit={uploadComment}>
          <img src={post.author.profileImg} alt="" />
          <input
            onChange={(e) => {
              setComment(e.target.value);
            }}
            type="text"
            placeholder="write a comment"
          />
          <button type="submit">Send</button>
        </form>
      </div>
      {previousComments ? (
        <>
        { previousComments.map((item)=>(
          <div className="comment" key={item._id}>
          <img src={item.user.profileImg} alt="" />
          <div className="info">
            <span>{item.username}</span>
            <p>{item.comment}</p>
          </div>
          <span className="date" >{getTimeAgo(item.createdAt)}</span>
          {/* <div className="icons">
          <FontAwesomeIcon icon={faPen} />
          <FontAwesomeIcon icon={faTrashAlt}  className='delete'/>
          </div> */}
        </div>   
        ))} 
      </>
      )
        : ( 
          <>
        <div className="comment">
          {/* <img src={comment.username} alt="dd" /> */}
          <div className="info">
            <span>No</span>
            <p>No comments</p>
          </div>
          {/* <span className="date">1 hour ago</span> */}
        </div>
        </>
      )}
    </div>
  );
};

export default Comments;
