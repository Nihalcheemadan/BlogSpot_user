import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../post/Post";
import "./posts.scss";

const Posts = () => {

  const [blog, setBlog ] = useState();

  useEffect(()=>{
    const getBlog = async ( req,res ) => {
      await axios.get('/api/admin/getBlog').then((res)=>{
        setBlog(res.data);
      })
    }
    getBlog();
  },[])

console.log(blog);
  //TEMPORARY
  const posts = [
    {
      id: 1,
      name: "John ",
      userId: 1,
      profilePic:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      img: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: 2,
      name: "Jane ",
      userId: 2,
      profilePic:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.",
      img: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
  ];

  return <div className="posts">
    {blog && blog.map(post=>(
      <Post post={post} key={post._id}/>
    ))}
  </div>;
};

export default Posts;
