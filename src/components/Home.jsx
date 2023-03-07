import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import instance from "../utils/baseUrl";

const backgroundImageStyle = {
  backgroundImage: `url("https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80")`,
  backgroundSize: "cover",
};

const Home = () => {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const getBlog = async (req, res) => {
      await instance.get("/admin/getBlog").then((res) => {
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
      <div className=" text-black " style={backgroundImageStyle}>
        <div className="bg-gray-100 from-black px-8 py-16">
          <div className=" max-w-3xl grid grid-cols-1 gap-8">
            <div className="w-12">
              {/* <ReactLogo className="fill-white" /> */}
            </div>
            {/* <h2 className="text-xl uppercase font-bold">Learn. Explore. Ideate. Create.</h2> */}
            <h2 className="text-5xl font-bold text-gray-500">
              {/* Host your space, share your world */}
              Explore blogs here
            </h2>
            <p className="text-lg text-gray-400">
              Learning is where everything starts, but continuous practice and
              discipline helps you reach new heights of success and raise your
              bar. So here’s our blog, where we constantly publish new material
              on the following topics to share our thoughts and learn from your
              experiences : -
            </p>
            <Link
              to="/create-post"
              className="text-center text-2xl font-medium bg-gradient-to-r from-pink-600 to-orange-600 py-3 px-6 rounded-md w-48"
            >
              Create
            </Link>
          </div>
        </div>
      </div>

      <div className="px-8 bg-gray-100">
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
            <Link to='/post'>

            <button class="bg-indigo-500 mb-16 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
              Explore More
            </button>
            </Link>
          </div>
        </div>
        <footer class="bg-gray-100 py-6">
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
