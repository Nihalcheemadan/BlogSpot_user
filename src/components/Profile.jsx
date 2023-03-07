import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import instance from "../utils/baseUrl";

const Profile = () => {
  const [followersCount, setFollowersCount] = useState(Number);
  const [followingCount, setFollowingCount] = useState(Number);
  const [blog, setBlog] = useState([]);

  const navigate = useNavigate()
  const location = useLocation();
  const author = location.state.data;
  const [alreadyFollowed, setAlreadyFollowed] = useState(false);
  const [userProfile, setUserProfile] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const { userId } = jwtDecode(token);
    const matchFollow = async () => {
      if (author.Followers.includes(userId)) {
        setAlreadyFollowed(true);
      } else if (author._id === userId) {
        setUserProfile(true);
      }
    };
    matchFollow();
  }, []);

  const handleFollow = async (id) => {
    await instance.put(
      `/user/following/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    setAlreadyFollowed((prev) => !prev);
    alreadyFollowed === true
      ? toast.success("You're now following this user")
      : toast.success("You're now Unfollowing this user");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    instance
      .get(`/user/userDetails`, {
        params: {
          id: author._id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setFollowersCount(res.data.followersCount);
        setFollowingCount(res.data.followingCount);
        setBlog(res.data.blog);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div class="p-8 bg-gray-50">
      <div class="p-8 bg-gray-50 shadow mt-24">
        <Toaster position="top-center" reverseOrder={false} />{" "}
        <div class="grid grid-cols-1 md:grid-cols-3">
          {" "}
          <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
            {" "}
            <div>
              <p class="font-bold text-gray-700 text-xl">{followersCount}</p>{" "}
              <p class="text-gray-400">Followers</p>{" "}
            </div>
            <div>
              {" "}
              <p class="font-bold text-gray-700 text-xl">
                {followingCount}
              </p>{" "}
              <p class="text-gray-400">following</p>{" "}
            </div>{" "}
            {/* <div>
              <p class="font-bold text-gray-700 text-xl">89</p>{" "}
              <p class="text-gray-400">Comments</p>{" "}
            </div> */}
          </div>
          <div class="relative">
            {" "}
            <div class="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              {/* <svg
                xmlns="https://thumbs.dreamstime.com/b/businessman-icon-image-male-avatar-profile-vector-glasses-beard-hairstyle-179728610.jpg"
                class="h-24 w-24"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                {" "}
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>{" "} */}
              <img src={author.profileImg} alt="" />
            </div>
          </div>
          <div class="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
            {/* <button class="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
              {" "}
              Connect
            </button>{" "} */}
            {userProfile === false ? (
              alreadyFollowed === true ? (
                <button
                  onClick={() => handleFollow(author._id)}
                  class="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={() => handleFollow(author._id)}
                  class="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                >
                  follow
                </button>
              )
            ) : (
              ""
            )}
            {userProfile === false && (
              <button class="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                Message
              </button>
            ) 
            // : (
            //   <button class="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
            //     Edit
            //   </button>
            // )
            }
          </div>{" "}
        </div>{" "}
        <div class="mt-20 text-center border-b pb-12">
          {" "}
          <h1 class="text-4xl font-medium text-gray-700">
            {author.username}
          </h1>{" "}
          <p class="font-light text-gray-600 mt-3">Bucharest, Romania</p>{" "}
          <p class="mt-8 text-gray-500">
            Solution Manager - Creative Tim Officer
          </p>{" "}
          <p class="mt-2 text-gray-500">University of Computer Science</p>{" "}
        </div>{" "}
        {/* <div class="mt-12 flex flex-col justify-center">
          {" "}
          <p class="text-gray-600 text-center font-light lg:px-16">
            An artist of considerable range, Ryan — the name taken by
            Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and
            records all of his own music, giving it a warm, intimate feel with a
            solid groove structure. An artist of considerable range.
          </p>{" "}
          <button class="text-indigo-500 py-2 px-4  font-medium mt-4">
            {" "}
            Show more
          </button>{" "}
        </div> */}
      </div>

      <div class="mt-16 mx-auto max-w-screen-xl px-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Related Posts</h2>

        {blog &&
          blog.map((blog) => (
            <div class="md:flex rounded-lg py-6 px-4 border-2 border-r-8 border-b-8 rounded-br-none mb-10 bg-white-100 border-gray-200">
              <img
                alt="Boiler plate"
                src={blog.imageUrl}
                class="h-56 w-96 border border-gray-50 rounded rounded-lg mx-auto md:mr-6"
              />
              <div class="text-center md:text-left">
                <h2 class="text-3xl">
                  {/* What is boilerplate code? Why & when to use the boilerplate code?
                   */}
                  {blog.title}
                </h2>
                <span class="text-gray-500 py-1">10 days ago</span>
                <p
                  dangerouslySetInnerHTML={{
                    __html: `${blog.content
                      .split(" ")
                      .slice(0, 50)
                      .join(" ")}...`,
                  }}
                />
                {blog.content.split(" ").length > 50 && (
                  <button onClick={()=>{navigate(`/singleBlog/${blog._id}`,{
                    state:{data: blog}
                  })}} className="text-blue-500 hover:text-blue-700">
                    Read more
                  </button>
                  
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Profile;
