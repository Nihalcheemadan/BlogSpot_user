import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import instance from "../utils/baseUrl";
import jwtDecode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FaStar } from "react-icons/fa";

function UserProfile() {
  const [change, setChange] = useState(false);
  const cloudAPI = "dudskpuk4";
  const [showModal, setShowModal] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  const [userPrime, setUserPrime] = useState(false);
  const token = localStorage.getItem("token");
  const [user, setUser] = useState("");
  const [userData, setUserData] = useState("");
  const [gallery, setGallery] = useState([]);
  const [photos, setPhotos] = useState([]);

  const [profile, setProfile] = useState("");
  const [country, setCountry] = useState("");
  const [about, setAbout] = useState("");
  const [address, setAddress] = useState("");
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const [blog, setBlog] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    showProfile();
  }, [change]);

  const { userId } = jwtDecode(token);

  const showProfile = async () => {
    await instance
      .get(`/user/userDetails`, {
        params: {
          id: userId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setUserData(res.data.user);
        setCountry(res.data.user.country);
        setAbout(res.data.user.about);
        setAddress(res.data.user.address);
        setUserPrime(res.data.user.isPremiumUser);
        setGallery(res.data.gallery);
        setFollowers(res.data.followers);
        setFollowing(res.data.following);
        setBlog(res.data.blog);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.error);
      });
  };

  const handlePhoto = (e) => {
    e.preventDefault();
    const formData = new FormData();
    new Promise(async (resolve, reject) => {
      let arr = [];
      let count = 0;
      for (let i = 0; i < photos.length; i++) {
        count++;
        formData.append("file", photos[i]);
        formData.append("upload_preset", "blogapp");
        await axios
          .post(
            `https://api.cloudinary.com/v1_1/${cloudAPI}/image/upload`,
            formData
          )
          .then((res) => {
            console.log(res.data);
            arr.push(res.data.secure_url);
            count == photos.length && resolve(arr);
          });
      }
    }).then(async (res) => {
      change === true ? setChange(false) : setChange(true);
      const imageUrl = res;
      const token = localStorage.getItem("token");
      await instance
        .post(
          `/user/updateGallery`,
          {
            imageUrl,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
          if (response) {
            toast.success("Photo Added Successfully");
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response) {
            toast.error(error.response.data.error);
          } else {
            toast.error(error.message);
          }
        });
    });
  };

  const handleDelete = async (url) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this Photo?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            // change === true ? setChange(false) : setChange(true);
            setChange((prev) => !prev);
            await instance
              .post(
                `/user/galleryDelete`,
                { url },
                { headers: { Authorization: `Bearer ${token}` } }
              )
              .then((res) => {
                setChange((prev) => !prev);
                toast.success("done");
              });
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", profile);
    formData.append("upload_preset", "fotwebcloud");
    await axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloudAPI}/image/upload`,
        formData
      )
      .then(async (res) => {
        const profileImg = res.data.secure_url;
        console.log(res.data.secure_url);
        const token = localStorage.getItem("token");
        await instance
          .put(
            `/user/updateProfile`,
            {
              profileImg,
              country,
              address,
              about,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then((response) => {
            if (response) {
              setChange((prev) => !prev);
              toast.success("Profile Added Successfully");
            }
          })
          .catch((error) => {
            console.log(error);
            if (error.response) {
              toast.error(error.response.data.error);
            } else {
              toast.error(error.message);
            }
          });
      });
  };

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

            <div className="flex flex-col items-end ml-72">
              <button
                onClick={() => setShowModal((prev) => !prev)}
                className="mx-auto lg:mx-0 bg-gradient-to-r from-blue-500/60 to-indigo-600/60 text-white font-bold rounded-full my-6 py-3 px-10 shadow-lg focus:outline-none focus:shadow-outline transition hover:shadow-sm duration-300 ease-in-out"
              >
                <FontAwesomeIcon icon={faEdit} className="mr-2" />
                Edit Profile
              </button>
            </div>
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

          {showModal ? (
            <div className="fixed z-50 inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen">
                <div className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-xl">
                  <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Edit profile
                  </h1>
                  <form onSubmit={handleUpload}>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Profile Photo
                        </label>
                        <div className="flex justify-center items-center mt-2">
                          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100">
                            {profile ? (
                              <img
                                className="w-full h-full object-cover"
                                src={URL.createObjectURL(profile)}
                                alt="Selected profile"
                              />
                            ) : (
                              <img
                                className="w-full h-full object-cover"
                                src={userData?.profileImg}
                                alt="Selected profile"
                              />
                            )}
                          </div>
                          <label
                            htmlFor="profile-photo"
                            className="ml-5 cursor-pointer text-sm font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            {profile ? "Change photo" : "Upload photo"}
                          </label>
                          <input
                            id="profile-photo"
                            name="profile-photo"
                            className="sr-only"
                            type="file"
                            accept="image/x-png,image/gif,image/jpeg"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file && /\.(jpe?g|png)$/i.test(file.name)) {
                                setProfile(file);
                              } else {
                                toast.error(
                                  "Invalid file type. Please select a JPEG or PNG image."
                                );
                              }
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          className="text-gray-500 dark:text-gray-200"
                          for="passwordConfirmation"
                        >
                          Country
                        </label>
                        <input
                          value={country}
                          onChange={(e) => {
                            setCountry(e.target.value);
                          }}
                          id="number"
                          type="age"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>

                      <div>
                        <label
                          className="text-gray-500 dark:text-gray-200"
                          for="passwordConfirmation"
                        >
                          Address
                        </label>
                        <textarea
                          value={address}
                          onChange={(e) => {
                            setAddress(e.target.value);
                          }}
                          id="textarea"
                          type="textarea"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        ></textarea>
                      </div>
                      <div>
                        <label
                          className="text-gray-500 dark:text-gray-200"
                          for="passwordConfirmation"
                        >
                          About
                        </label>
                        <textarea
                          value={about}
                          onChange={(e) => {
                            setAbout(e.target.value);
                          }}
                          id="textarea"
                          type="textarea"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        ></textarea>
                      </div>
                    </div>

                    <div className="flex justify-end mt-6 gap-4">
                      <button
                        onClick={() => setShowModal(false)}
                        className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : null}
        {userPrime === false && (
          <div className="flex justify-center mt-3">
            <div className="rounded-full items-center bg-yellow-500 text-white p-1 mr-2">
              <FaStar className="text-xl" />
            </div>

            <button onClick={()=>navigate('/payment')} className="flex text-gray-600 font-medium bg-transparent border border-gray-600 px-2 py-1 rounded hover:bg-gray-600 hover:text-white transition-colors">
              Get Premium
            </button>
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

          <div>
            <div
              role="main"
              class="flex flex-col items-center justify-center mt-4"
            >
              <h1 class="mt-4 text-4xl font-semibold leading-9 text-center text-gray-800 dark:text-gray-50">
                Gallery
              </h1>
              <p class="text-base leading-normal text-center text-gray-600 dark:text-white mt-4 lg:w-2/2 md:w-10/12 w-11/12">
                Share your photos in your gallery!
              </p>
            </div>

            <form
              onSubmit={handlePhoto}
              enctype="multipart/form-data"
              class="max-w-sm mx-auto"
            >
              <div class="mt-8 flex justify-center">
                <label
                  for="images"
                  class="relative flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-lg tracking-wide border border-gray-400 cursor-pointer hover:bg-gray-100"
                >
                  <span class="text-2xl font-semibold leading-9 text-center text-gray-800 dark:text-gray-50">
                    <svg
                      class="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 5v14M5 12h14"
                      ></path>
                    </svg>
                  </span>
                  <input
                    type="file"
                    name="images[]"
                    id="images"
                    multiple
                    class="mt-1 sr-only"
                    onChange={(e) => {
                      setPhotos(e.target.files);
                    }}
                  />
                </label>
              </div>
              <div class="mt-8 flex justify-center">
                <button
                  type="submit"
                  class="px-6 py-3 bg-teal-400 text-white rounded-full hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Upload photos
                </button>
              </div>
            </form>
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
                        <button
                          class="absolute top-2 right-2 p-2 text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(item)}
                        >
                          <FontAwesomeIcon icon={faTrash} className="mr-2" />
                        </button>
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

export default UserProfile;
