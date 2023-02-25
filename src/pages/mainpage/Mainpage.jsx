import React from 'react'
import { Link } from 'react-router-dom'

const backgroundImageStyle = {
  backgroundImage: `url("https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")`,
  backgroundSize: "cover",
}


const Mainpage = () => {
  return (
    <div className="App">
      <div className=" text-black mt-16" style={backgroundImageStyle}>
        <div className="bg-gradient-to-bl from-black px-8 py-16">
          <div className=" max-w-3xl grid grid-cols-1 gap-8">
            <div className="w-12">
              {/* <ReactLogo className="fill-white" /> */}
            </div>
            {/* <h2 className="text-xl uppercase font-bold">Learn. Explore. Ideate. Create.</h2> */}
            <h2 className="text-5xl font-bold text-gray-200">
              {/* Host your space, share your world */}
              Explore blogs here
            </h2>
            <p className="text-lg text-gray-50">
              Learning is where everything starts, but continuous practice and
              discipline helps you reach new heights of success and raise your
              bar. So here’s our blog, where we constantly publish new material
              on the following topics to share our thoughts and learn from your
              experiences : -
            </p>
            <Link to="/create-post" className="text-center text-2xl font-medium bg-gradient-to-r from-pink-600 to-orange-600 py-3 px-6 rounded-md w-48">
            Create
            </Link>
          </div>
        </div>
      </div>

      <div className="px-8 ">
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
              <div class="p-4 sm:w-1/2 lg:w-1/3 ">
                <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden hover:bg-white hover:shadow-lg">
                  <img
                    class="lg:h-72 md:h-48 w-full object-cover object-center"
                    // style={backgroundImageStyle}
                    src="https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dGVjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                    alt="blog"
                  />
                  <div class="p-6  transition duration-300 ease-in">
                    <div className="h-40">
                    <h2 class="text-base font-medium text-indigo-300 mb-1">
                      <time>
                        {/* <DateFormatter date={post?.createdAt} /> */} 02/01/2023
                      </time>
                    </h2>
                    <h1 class="text-2xl font-semibold mb-3">New blog</h1>
                    <p
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        webkitLineClamp: "3" /* number of lines to show */,
                        lineClamp: "3",
                        webkitBoxOrient: "vertical",
                      }}
                      class="leading-relaxed mb-3 max-h-20"
                    >
                      {/* {post.description} */}
                      sample blog
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
                      <span class="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                        <svg
                          class="w-4 h-4 mr-1"
                          stroke="currentColor"
                          stroke-width="2"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        {/* {post?.numViews} */}
                        5
                      </span>
                      <span class="text-gray-400 inline-flex items-center leading-none text-sm">
                        <svg
                          class="w-4 h-4 mr-1"
                          stroke="currentColor"
                          stroke-width="2"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                        </svg>
                        {/* {post?.Comment?.length} */}
                        5
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="p-4 sm:w-1/2 lg:w-1/3 ">
                <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden hover:bg-white hover:shadow-lg">
                  <img
                    class="lg:h-72 md:h-48 w-full object-cover object-center"
                    src="https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dGVjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                    alt="blog"
                  />
                  <div class="p-6  transition duration-300 ease-in">
                    <div className="h-40">
                    <h2 class="text-base font-medium text-indigo-300 mb-1">
                      <time>
                        {/* <DateFormatter date={post?.createdAt} /> */} 02/01/2023
                      </time>
                    </h2>
                    <h1 class="text-2xl font-semibold mb-3">New blog</h1>
                    <p
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        webkitLineClamp: "3" /* number of lines to show */,
                        lineClamp: "3",
                        webkitBoxOrient: "vertical",
                      }}
                      class="leading-relaxed mb-3 max-h-20"
                    >
                      {/* {post.description} */}
                      sample blog
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
                      <span class="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                        <svg
                          class="w-4 h-4 mr-1"
                          stroke="currentColor"
                          stroke-width="2"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        {/* {post?.numViews} */}
                        5
                      </span>
                      <span class="text-gray-400 inline-flex items-center leading-none text-sm">
                        <svg
                          class="w-4 h-4 mr-1"
                          stroke="currentColor"
                          stroke-width="2"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                        </svg>
                        {/* {post?.Comment?.length} */}
                        5
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="p-4 sm:w-1/2 lg:w-1/3 ">
                <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden hover:bg-white hover:shadow-lg">
                  <img
                    class="lg:h-72 md:h-48 w-full object-cover object-center"
                    src="https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dGVjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                    alt="blog"
                  />
                  <div class="p-6  transition duration-300 ease-in">
                    <div className="h-40">
                    <h2 class="text-base font-medium text-indigo-300 mb-1">
                      <time>
                        {/* <DateFormatter date={post?.createdAt} /> */} 02/01/2023
                      </time>
                    </h2>
                    <h1 class="text-2xl font-semibold mb-3">New blog</h1>
                    <p
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        webkitLineClamp: "3" /* number of lines to show */,
                        lineClamp: "3",
                        webkitBoxOrient: "vertical",
                      }}
                      class="leading-relaxed mb-3 max-h-20"
                    >
                      {/* {post.description} */}
                      sample blog
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
                      <span class="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                        <svg
                          class="w-4 h-4 mr-1"
                          stroke="currentColor"
                          stroke-width="2"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        {/* {post?.numViews} */}
                        5
                      </span>
                      <span class="text-gray-400 inline-flex items-center leading-none text-sm">
                        <svg
                          class="w-4 h-4 mr-1"
                          stroke="currentColor"
                          stroke-width="2"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                        </svg>
                        {/* {post?.Comment?.length} */}
                        5
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            {/* ))} */}
          </div>
        </div>
      </section>
    </div>
      </div>
    </div>
  )
}

export default Mainpage