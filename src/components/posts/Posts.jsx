import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../post/Post";
import "./posts.scss";

const Posts = () => {

  const [blog, setBlog ] = useState([]);

  useEffect(()=>{
    const getBlog = async ( req,res ) => {
      await axios.get('/api/admin/getBlog').then((res)=>{
        setBlog(res.data.blog)
      })
    }
    getBlog(); 
  },[])


  return <div className="posts">
    {Array.isArray(blog) && blog.map((post)=>(
      <Post post={post} key={post._id}/>
    ))}
  </div>; 
};

export default Posts;
