import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import instance from "../utils/baseUrl";

const backgroundImageStyle = {
  backgroundImage: `url("https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80")`,
  backgroundSize: "cover",
};

const Home = () => {
  const [blog, setBlog] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getBlog = async (req, res) => {
      const token = localStorage.getItem("token");
      await instance
        .get("/admin/getBlog", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setBlog(res.data.blog);
        });
    };
    getBlog();
  }, []);

  const blogWithDate = blog.map((post) => ({
    ...post,
    date: moment(post.createdAt).format("DD/MM/YYYY"),
  }));

  return (
    <div className="App ">
      <section class="bg-white dark:bg-gray-900">
        <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div class="mr-auto place-self-center lg:col-span-7">
            <h1 class="max-w-2xl mb-4 text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl dark:text-white">
              Welcome to Blogspot website
            </h1>
            <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Learning is where everything starts, but continuous practice and
              discipline helps you reach new heights of success and raise your
              bar. So here’s our blog, where we constantly publish new material
              on the following topics to share our thoughts and learn from your
            </p>
            <a
              href="/post"
              class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              Explore
              <svg
                class="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
            <a
              href="/create"
              class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Create
            </a>
          </div>
          <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src="https://coolbackgrounds.io/images/backgrounds/white/pure-white-background-85a2a7fd.jpg"
              alt="mockup"
            />
          </div>
        </div>
      </section>

      <div className="px-8 bg-white">
        {/* <Cards postList={postList}/> */}
        <div>
          <section class="md:h-full flex items-center text-gray-600">
            <div class="container xl:px-36 px-5 py-14 mx-auto">
              <div class="text-center mb-12">
                {/* <h5 class="text-base md:text-lg text-indigo-700 mb-1">See Our Recent News</h5> */}
                <h1 class="text-4xl md:text-4xl text-gray-700 font-semibold">
                  Latest trend and right way to learn & research.
                </h1>
              </div>

              <div class="flex flex-wrap -m-4">
                {/* {postList?.map((post, index) => index < 6 && ( */}
                {Array.isArray(blogWithDate) &&
                  blogWithDate.slice(0, 6).map((post) => (
                    <div class="p-4 sm:w-1/2 lg:w-1/3 ">
                      <div class="h-full border-2 border-gray-200 border-opacity-60 rounded overflow-hidden hover:bg-white hover:shadow-lg">
                        <img
                          class="lg:h-72 md:h-48 w-full object-cover"
                          // style={backgroundImageStyle}
                          src={post.imageUrl}
                          alt="blog"
                        />
                        <div class="p-6  transition duration-300 ease-in">
                          <div className="h-40">
                            <h2 class="text-base font-medium text-indigo-300 mb-1">
                              {moment(post?.createdAt).format("DD/MM/YYYY")}
                            </h2>
                            <h1 class="text-2xl font-semibold mb-3">
                              {post.title}
                            </h1>
                            <p
                              style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                webkitLineClamp:
                                  "3" /* number of lines to show */,
                                lineClamp: "3",
                                webkitBoxOrient: "vertical",
                              }}
                              class="leading-relaxed mb-3 max-h-20"
                            >
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: post?.content,
                                }}
                              />
                            </p>
                          </div>
                          <div class="flex items-center flex-wrap ">
                            {/* <Link to={`/posts/${post?._id}`} class="text-indigo-300 inline-flex items-center md:mb-2 lg:mb-0"> */}
                            Read More
                            <svg
                              class="w-4 h-4 ml-2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="2"
                              fill="none"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path d="M5 12h14"></path>
                              <path d="M12 5l7 7-7 7"></path>
                            </svg>
                            {/* </Link> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>
          <div class="flex justify-center">
            <Link to="/post">
              <button class="bg-indigo-500 mb-16 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                Explore More
              </button>
            </Link>
          </div>
        </div>
        <footer class="bg-white py-6">
          <div class="container mx-auto px-6 lg:px-12">
            <div class="flex flex-col md:flex-row justify-between items-center">
              <p class="text-gray-600 text-center md:text-left">
                &copy; 2023 BlogSpot. All rights reserved.
              </p>
              <div class="flex mt-4 md:mt-0">
                <a href="#" class="text-gray-600 mr-6 hover:text-gray-800">
                  Privacy Policy
                </a>
                <a href="#" class="text-gray-600 hover:text-gray-800">
                  Terms of Use
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
