import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Comments = ({ post }) => {
  const [comment, setComment] = useState("");
  const [previousComments, setPreviousComments] = useState([]);
  const [commentsFetched, setCommentsFetched] = useState(false);


  const navigate = useNavigate();

  useEffect(() => {
    const getComment = () => {
      axios.post("/api/blog/comments", { id: post._id }).then((res) => {
        console.log(res.data);
        setPreviousComments(res.data.comments);
        setCommentsFetched(prev => !prev);
      });
    }; 
    getComment();
  }, [post._id,commentsFetched]);

  const some = previousComments.user;

  const uploadComment = async (e) => {
    try {
      e.preventDefault();
      const token = localStorage.getItem("token");
      console.log(token, "token here ");
      await axios
        .put(
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
        )
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
          {previousComments.reverse().map((item) => (
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

                
              </footer>
              <p>{item.comment}</p>
              
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
