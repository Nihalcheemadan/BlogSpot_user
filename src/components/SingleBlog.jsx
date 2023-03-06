import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Comments from "./Comments";
import { toast } from "react-hot-toast";

const SingleBlog = () => {

  const location = useLocation();
  const blog = location.state.data;
  const navigate = useNavigate();
  
  const token = localStorage.getItem("token");
  const { userId } = jwtDecode(token);
  
  const [author, setAuthor] = useState('');
  const [user, setUser] = useState({});
  const [article, setArticle] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`/api/user/userDetails`, {
        params: {
          id: blog.author,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setUser(res.data.user);
        setArticle(res.data.article);
      });
  }, []);

  useEffect(() => {
    if (blog.author === userId) {
      setAuthor('author');
    }
  }, []);

  // const handleEditClick = (blogId) => {
  //   axios.post("/api/blog/editBlog", {
  //     params: {
  //       id: blogId,
  //     },
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   setAuthor('')
  // };

  // function handleDeleteClick(blogId) {
  //   axios
  //     .delete(`/api/blog/deleteBlog`, {
  //       params: {
  //         id: blogId,
  //       },
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       }, 
  //     })
  //     .then((res) => {
  //       toast.success(res.data.msg);
  //       navigate("/");
  //     });
  // }


  return (
    <div>
      <main class="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900">
        <div class="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article class="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header class="mb-4 lg:mb-6 not-format">
              <address class="flex items-center mb-6 not-italic">
                <div class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                  <img
                    class="mr-4 w-16 h-16 rounded-full"
                    src={user.profileImg}
                    alt="Jese Leos"
                  />
                  <div>
                    <a
                      href="#"
                      rel="author"
                      class="text-xl font-bold text-gray-900 dark:text-white"
                    >
                      {user.username}
                    </a>

                    <p class="text-base font-light text-gray-500 dark:text-gray-400">
                      <time
                        pubdate
                        datetime="2022-02-08"
                        title="February 8th, 2022"
                      >
                        {moment(user.createdAt).format("MMMM Do YYYY")}
                      </time>
                    </p>
                  </div>
                </div>
              </address>
              <h1 class="mb-4 text-2xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-2xl dark:text-white">
                {blog.title}
              </h1>
            </header>

            <figure>
              <img src={blog.imageUrl} alt="" />
            </figure>
            {/* {author === 'author' && ( */}
              {/* <div class="p-2 flex items-end space-x-4">
                <button onClick={handleEditClick()} >
                  <EditIcon /> 
                </button> */}
                {/* <button onClick={handleDeleteClick(blog._id)}>
                  <DeleteIcon />
                </button> */}
              {/* </div> */}
            {/* )} */}
            <p
              className="mt-4"
              dangerouslySetInnerHTML={{ __html: blog?.content }}
            />
            <Comments post={blog} />
          </article>
        </div>
      </main>
      <aside
        aria-label="Related articles"
        class="py-8 lg:py-24 bg-gray-50 dark:bg-gray-800"
      >
        <div class="px-4 mx-auto max-w-screen-xl">
          <h2 class="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
            Related articles
          </h2>
          <div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {article &&
              article.slice(0, 4).map((article) => (
                <article class="max-w-xs">
                  <a href="#">
                    <img
                      src={article.imageUrl}
                      class="mb-5 rounded-lg"
                      alt="Image 1"
                    />
                  </a>
                  <h2 class="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                    <a href="#">{article.title}</a>
                  </h2>
                  <p
                    class="mb-4 font-light text-gray-500 dark:text-gray-400"
                    dangerouslySetInnerHTML={{
                      __html: `${blog.content
                        .split(" ")
                        .slice(0, 50)
                        .join(" ")}...`,
                    }}
                  />
                  {article.content.split(" ").length > 20 && (
                    <button
                      onClick={() => {
                        navigate(`/singleBlog/${article._id}`, {
                          state: { data: article },
                        });
                      }}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Read more
                    </button>
                  )}
                </article>
              ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default SingleBlog;
