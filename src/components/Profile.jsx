import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import instance from "../utils/baseUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaStar } from 'react-icons/fa';

import {
  faUsers,
  faEdit,
  faEnvelope,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const author = location.state.data;
  const [alreadyFollowed, setAlreadyFollowed] = useState();
  const [userProfile, setUserProfile] = useState(false);
  const token = localStorage.getItem("token");

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [blog, setBlog] = useState([]);

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [userPrime, setUserPrime] = useState(false);
  const [userData, setUserData] = useState("");
  const [gallery, setGallery] = useState([]);

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
    )
    .then((res)=>{
      console.log(res,'res herer');
      setAlreadyFollowed((prev) => !prev);
      toast.success(res.data)
    }).catch((error)=>{
      toast.error(error.response.data)
    })
    // alreadyFollowed === true
    //   ? toast.success("You're now following this user")
    //   : toast.success("You're now Unfollowing this user");
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
        setUserData(res.data.user);
        setUserPrime(res.data.user.isPremiumUser);
        setGallery(res.data.gallery);
        setFollowers(res.data.followers);
        setFollowing(res.data.following);
        setBlog(res.data.blog);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Toaster position="top-center"></Toaster>

      <div class="h-full bg-gray-50 p-8">
        <div class="bg-white rounded-lg shadow-xl pb-8">
          <div class="w-full h-[250px]">
            <img
              src="https://images.pexels.com/photos/2847648/pexels-photo-2847648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              class="w-full h-full rounded-tl-lg rounded-tr-lg"
            />
          </div>
          <div className="flex gap-8">
            <div className="ml-8">
              <button
                onClick={() => setShowFollowers((prev) => !prev)}
                className="mx-auto lg:mx-0 bg-gradient-to-r from-blue-500/60 to-indigo-600/60 text-white font-bold rounded-full my-6 py-3 px-10 shadow-lg focus:outline-none focus:shadow-outline transition hover:shadow-sm duration-300 ease-in-out"
              >
                <FontAwesomeIcon
                  icon={faUsers}
                  className="inline-block mr-2 -mt-1"
                />
                Followers {followers.length}
              </button>
            </div>

            {showFollowers && (
              <div className="fixed z-50 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                  </div>
                  <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                  &#8203;
                  <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Followers
                        </h3>
                        <div className="mt-2">
                          <ul className="divide-y divide-gray-200">
                            {followers.map((follower) => (
                              <li key={follower._id} className="py-4 flex">
                                <img
                                  className="h-10 w-10 rounded-full object-cover"
                                  src={follower.profileImg}
                                  alt={follower.username}
                                />
                                <div className="ml-3">
                                  <p className="text-sm font-medium text-gray-900">
                                    {follower.username}
                                  </p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6">
                      <button
                        type="button"
                        className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm sm:leading-5"
                        onClick={() => setShowFollowers(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="">
              <button
                onClick={() => setShowFollowing((prev) => !prev)}
                className="mx-auto lg:mx-0 bg-gradient-to-r from-blue-500/60 to-indigo-600/60 text-white font-bold rounded-full my-6 py-3 px-10 shadow-lg focus:outline-none focus:shadow-outline transition hover:shadow-sm duration-300 ease-in-out"
              >
                <FontAwesomeIcon
                  icon={faUsers}
                  className="inline-block mr-2 -mt-1"
                />
                Following {following.length}
              </button>
            </div>

            <div class="flex flex-col items-center ml-16 -mt-16">
              <img
                src={userData?.profileImg}
                alt="notget"
                class="w-40 h-40 rounded-full border-4 border-white object-cover shadow-lg"
              />
              <div class="flex items-center space-x-2 mt-4">
                <p class="text-2xl font-bold text-gray-800">
                  {userData?.username}
                </p>
                {userPrime !== false && (
                  <span class="bg-blue-500 rounded-full p-1" title="Verified">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="text-gray-100 h-2.5 w-2.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="4"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col items-end ml-36">
              {userProfile === false ? (
                alreadyFollowed === true ? (
                  <button
                    onClick={() => handleFollow(author._id)}
                    className="mx-auto lg:mx-0 bg-gradient-to-r from-blue-500/60 to-indigo-600/60 text-white font-bold rounded-full my-6 py-3 px-10 shadow-lg focus:outline-none focus:shadow-outline transition hover:shadow-sm duration-300 ease-in-out"
                  >
                    <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => handleFollow(author._id)}
                    className="mx-auto lg:mx-0 bg-gradient-to-r from-blue-500/60 to-indigo-600/60 text-white font-bold rounded-full my-6 py-3 px-10 shadow-lg focus:outline-none focus:shadow-outline transition hover:shadow-sm duration-300 ease-in-out"
                  >
                    <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                    Follow
                  </button>
                )
              ) : (
                ""
              )}
            </div>

            {userProfile === false && (
              <div className="flex flex-col items-end">
                <button className="mx-auto lg:mx-0 bg-gradient-to-r from-blue-500/60 to-indigo-600/60 text-white font-bold rounded-full my-6 py-3 px-10 shadow-lg focus:outline-none focus:shadow-outline transition hover:shadow-sm duration-300 ease-in-out">
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                  Message
                </button>
              </div>
            )}
          </div>

          {showFollowing && (
            <div className="fixed z-50 inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                &#8203;
                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Following
                      </h3>
                      <div className="mt-2">
                        <ul className="divide-y divide-gray-200">
                          {following.map((follower) => (
                            <li key={follower._id} className="py-4 flex">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={follower.profileImg}
                                alt={follower.username}
                              />
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">
                                  {follower.username}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm sm:leading-5"
                      onClick={() => setShowFollowing(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
              
            </div>
          )}

          <div class="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
            <div class="w-full 2xl:2/3">
              <h4 class="text-xl pl-6 text-gray-900 font-bold">
                User Personal Info
              </h4>
              <div class=" bg-white rounded-lg shadow-xl p-8">
                <ul class="mt-2 text-gray-700">
                  <li class="flex justify-between border-y py-2">
                    <span class="font-bold w-24">Full name:</span>
                    <span class="text-gray-700 pl-1">{userData?.username}</span>
                  </li>
                  <li class="flex justify-between border-y py-2">
                    <span class="font-bold w-24">Email:</span>
                    <span class="text-gray-700 pl-1">{userData?.email}</span>
                  </li>
                  <li class="flex justify-between border-y py-2">
                    <span class="font-bold w-24">Country:</span>
                    <span class="text-gray-700 pl-1">{userData?.country}</span>
                  </li>
                  <li class="flex justify-between border-y py-2">
                    <span class="font-bold w-24">Address:</span>
                    <span class="text-gray-700 pl-1">{userData?.address}</span>
                  </li>
                </ul>
              </div>
              {/*  */}
            </div>

            <div class="flex flex-col w-full 2xl">
              <div class="flex-1 bg-white rounded-lg shadow-xl p-8">
                <h4 class="text-xl text-gray-900 font-bold">About</h4>
                <p class="mt-2 text-gray-700">{userData?.about}</p>
              </div>
            </div>
          </div>

          <section class="overflow-hidden text-neutral-700">
            <div class="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
              <div class="flex flex-wrap -mx-1 lg:-mx-2">
                {gallery &&
                  gallery.map((item) => (
                    <div class="w-full md:w-1/3 lg:w-1/4 px-1 lg:px-2 mb-4">
                      <div class="relative">
                        <img
                          alt=""
                          class="block h-48 w-full rounded-lg object-cover object-center"
                          src={
                            item ||
                            "https://cdn.dribbble.com/users/478633/screenshots/3103534/patada2.gif"
                          }
                        />
                        <button class="absolute top-2 right-2 p-2 text-red-500 hover:text-red-700"></button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>

          <div class="container mx-auto px-6 mt-16 max-w-screen-xl">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Related Posts</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blog &&
                blog.map((blog) => (
                  <div class="blog-card shadow-md hover:shadow-lg transition duration-300 ease-in-out rounded-lg overflow-hidden md:flex">
                    <img
                      alt="Boiler plate"
                      src={blog.imageUrl}
                      class="h-48 md:h-auto md:w-48 object-cover"
                    />
                    <div class="p-6 flex flex-col justify-between md:w-full">
                      <div>
                        <h2 class="text-xl md:text-2xl font-bold mb-2">
                          {blog.title}
                        </h2>
                        <p
                          class="blog-content"
                          dangerouslySetInnerHTML={{
                            __html: `${blog.content
                              .split(" ")
                              .slice(0, 50)
                              .join(" ")}...`,
                          }}
                        />
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-gray-500 text-sm">
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                        <button
                          onClick={() =>
                            navigate(`/singleBlog/${blog._id}`, {
                              state: { data: blog },
                            })
                          }
                          class="read-more-btn text-blue-500 hover:text-blue-700 text-sm font-medium"
                        >
                          Read more
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
