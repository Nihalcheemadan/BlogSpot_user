import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import { toast } from "react-hot-toast";

const Comments = ({ post }) => {
  const [comment, setComment] = useState("");
  const [previousComments, setPreviousComments] = useState([]);

  useEffect(() => {
    const getComment = async (req, res) => {
      await axios.post("/api/blog/comments", { id: post._id }).then((res) => {
        console.log(res.data);
        setPreviousComments(res.data.comments);
      });
    };
    getComment();
  }, []);

  const some = previousComments.user;

  const uploadComment = async (e) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token, "token here ");
      await axios.put(
        "/api/blog/comment/post",
        {
          comment,
          postid: post._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };
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
    <section class="not-format">
      <div class="flex justify-between items-center mb-6">
        <h2 class=" mt-8 text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
          Comment
        </h2>
      </div>
      <form class="mb-6" onSubmit={uploadComment}>
        <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <label for="comment" class="sr-only">
            Your comment
          </label>
          <textarea
            id="comment"
            rows="6"
            class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
            placeholder="Write a comment..."
            onChange={(e) => {
              setComment(e.target.value);
            }}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center bg-gray-500 text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
        >
          Post comment
        </button>
      </form>
      {previousComments ? (
        <>
          {previousComments.map((item) => (
            <article class="p-3 text-base bg-white rounded-lg dark:bg-gray-900">
              <footer class="flex justify-between items-center mb-2">
                <div class="flex items-center">
                  <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                    <img
                      class="mr-2 w-6 h-6 rounded-full"
                      src={item.user.profileImg}
                      alt="Nihal"
                    />
                    {item.username}
                  </p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    <time
                      pubdate
                      datetime="2022-02-08"
                      title="February 8th, 2022"
                    >
                      {getTimeAgo(item.createdAt)}
                    </time>
                  </p>
                </div>
                
                {/* <div
                  id="dropdownComment1"
                  class="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    class="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownMenuIconHorizontalButton"
                  >
                    <li>
                      <a
                        href="#"
                        class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Edit
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Remove
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block py-2 px-4 bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Report
                      </a>
                    </li>
                  </ul>
                </div> */}
              </footer>
              <p>{item.comment}</p>
              {/* <div class="flex items-center mt-4 space-x-4">
                <button
                  type="button"
                  class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
                >
                  <svg
                    aria-hidden="true"
                    class="mr-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    ></path>
                  </svg>
                  Reply
                </button> */}
              {/* </div> */}
            </article>
          ))}
        </>
      ) : (
        <>
          <article class="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
            <p>No comments yet</p>
          </article>
        </>
      )}
    </section>
  );
};

export default Comments;
