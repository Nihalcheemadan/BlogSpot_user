import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FlagIcon from "@mui/icons-material/Flag";
import OutlinedFlagOutlinedIcon from "@mui/icons-material/OutlinedFlagOutlined";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';

import jwtDecode from "jwt-decode";
import instance from "../utils/baseUrl";

const PostPage = ({ post }) => {
  const [liked, setLiked] = useState();
  const [count, setCount] = useState(post?.like?.length);
  const [saved, setSaved] = useState();
  const [reported, setReported] = useState(true);
  const [blogId, setBlogId] = useState(post?._id);
  const [change, setChange] = useState(false);

  const navigate = useNavigate();

  console.log(post, "its logged herer   ");
  const token = localStorage.getItem("token");
  const { userId } = jwtDecode(token);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const { userId } = jwtDecode(token);
    if (post.like.includes(userId)) {
      setLiked(true);
    }else{
      setLiked(false); 
    }
    if (post.reported.includes(userId)) {
      setReported(true);
    }else{
      setReported(false); 
    }
    if (post.saved.includes(userId)) {
      setSaved(true);
    }else{
      setSaved(false); 
    }
  }, []);
  

  const handleLikeClick = async (id) => {
    await instance
      .put(
        "/blog/likeBlog",
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
          setLiked(prev => !prev);
          toast.success(res.data.msg);
          setChange((prev) => !prev);
        } else {
          setCount(count - 1);
          setLiked(true);
          toast.success(res.data.msg);
        }
        // setLiked(res?.data?.liked);
      });
  };

  console.log(reported,'reporteddddddddddddddd');

  const saveBlog = async (id) => {
    await instance
      .put(
        "//blog/saveBlog",
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
        setSaved(prev => !prev);
        toast.success(res.data.msg);
      });
  };

  //reportBlog

  const reportBlog = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await instance.put(
        "/blog/reportBlog",
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setReported(prev => !prev);
      toast.success(response.data.msg);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    instance
      .post(
        "/blog/getSingleBlog",
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
  }, [handleLikeClick,change,count ]);

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

  return (
    <section class="flex flex-col justify-center antialiased bg-white text-gray-200 ">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div class="max-w-6xl mx-auto p-4 sm:px-6 h-full">
        <article class="max-w-sm mx-auto md:max-w-none grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-center">
          <a class="relative block group" href="#0">
            <div
              class="absolute inset-0 bg-gray-50 hidden md:block transform md:translate-y-2 md:translate-x-4 xl:translate-y-4 xl:translate-x-8 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out pointer-events-none"
              aria-hidden="true"
            ></div>
            <figure class="relative h-0  pb-[56.25%] md:pb-[75%] lg:pb-[56.25%] overflow-hidden transform md:-translate-y-2 xl:-translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out">
              <img
                class="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition duration-700 ease-out"
                src={post?.imageUrl}
                width="540"
                height="303"
                alt="Blog post"
              />
            </figure>
          </a>
          <div>
            <header>
              <div class="">
                <ul class="flex flex-wrap text-xs font-medium -m-1">
                  <li class="m-1">
                    <a
                      class="inline-flex text-center text-gray-100 py-1 px-3 rounded-full bg-purple-600 hover:bg-purple-700 transition duration-150 ease-in-out"
                      href="#0"
                    >
                      {post?.category}
                    </a>
                  </li>
                </ul>
              </div>
              <h3 class="text-2xl lg:text-2xl font-bold leading-tight mb-2 text-gray-400">
                <a
                  class="hover:text-gray-100 transition duration-150 ease-in-out"
                  href="#0"
                >
                  {post?.title}
                </a>
              </h3>
            </header>

            <p
              className="text-gray-400"
              dangerouslySetInnerHTML={{
                __html: `${post.content.split(" ").slice(0, 50).join(" ")}...`,
              }}
            />
            {post.content.split(" ").length > 50 && (
              <button
                onClick={() => {
                  navigate(`/singleBlog/${post._id}`, {
                    state: { data: post },
                  });
                }}
                className="text-blue-500 hover:text-blue-700"
              >
                Read more
              </button>
            )}
            <footer class="flex items-center mt-4">
              
                <img
                onClick={() =>
                  navigate(`/dprofile/${post?.author?._id}`, {
                    state: { data: post?.author },
                  })
                }
                  class="rounded-full flex-shrink-0 mr-4"
                  src={post?.author?.profileImg}
                  width="40"
                  height="40"
                  alt="Author 04"
                />
              <div className="flex">
                <div>
                  <button
                    className="font-medium text-gray-500 hover:text-gray-400 transition duration-150 ease-in-out"
                    onClick={() =>
                      navigate(`/dprofile/${post?.author?._id}`, {
                        state: { data: post?.author },
                      })
                    }
                  >
                    {post?.author?.username}
                  </button>
                  <span className="text-gray-700"> - </span>
                  <span className="text-gray-500">
                    {getTimeAgo(post?.createdAt)}
                  </span>
                </div>
                <div className="flex items-center ml-16 gap-4 cursor-pointer">
                  <div className="text-gray-500">
                    <span
                      className="text-red-400"
                      onClick={() => handleLikeClick(post?._id)}
                    >
                      {liked === true ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderIcon />
                      )}
                    </span>
                    {post?.like?.length}
                  </div>
                  <div className="">
                    <span
                      className="text-gray-500 cursor-pointer"
                      onClick={() => {
                        reportBlog(post?._id);
                      }}
                    >
                      {reported === true ? (
                        <FlagIcon />
                        ) : (
                        <OutlinedFlagIcon />
                      )}
                    </span>
                  </div>

                  <div
                    className="text-gray-500 cursor-pointer"
                    onClick={() => {
                      saveBlog(post?._id);
                    }}
                  >
                    {saved === true ? (
                      <BookmarkAddedIcon />
                    ) : (
                      < BookmarkBorderIcon/>
                    )}
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </article>
      </div>
    </section>
  );
};

export default PostPage;
