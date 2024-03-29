import React, { useEffect, useState } from "react";
import NavigatioBar from "../components/NavigatioBar";
import PostPage from "../components/PostPage";
import instance from "../utils/baseUrl";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../redux/slices/categorySlice";
import { setBlogs } from "../redux/slices/blogSlice";

const PostBody = () => {
  const dispatch = useDispatch();
  const [blog, setBlog] = useState([]);
  const [tempBlog, setTempBlog] = useState([]);
  const [selectedButton, setSelectedButton] = useState("allButton");

  const [category, setCategory] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    const getBlog = async (req, res) => {
      await instance
        .get("/user/getBlogs", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
        )
        .then((res) => {
          const data = res.data.blog;
          setBlog(res.data.blog);
          dispatch(setBlogs(res.data.blog));
          category
            ? setTempBlog(data.filter((blog) => blog.category === category))
            : setTempBlog(data);
        });
    };
    getBlog();
  }, []);

  useEffect(() => {
    instance.get("/user/categories").then((res) => {
      setCategory(res.data);
      dispatch(setCategories(res.data));
    });
  }, []);

  const [search, setSearch] = useState("");

  const searchData = (blog) => {
    return search === "" ? blog : blog.title.toLowerCase().includes(search);
  };

  const filterByCategory = (category) => {
    setSelectedButton(category);
    const filteredCategory = blog.filter((blog) => blog.category === category);
    setTempBlog(filteredCategory);
  };

  console.log(selectedButton);

  const viewAll = () => {
    setTempBlog(blog);
    setSelectedButton("allButton");
  };

  // const followingPost = () => {
  //   setTempBlog(blog);
  //   setSelectedButton("followingPost");
  // }

  return (
    <>
      <form class="flex items-center p-5 ml-96 w-96">
        <div class="flex justify-center">
          <div class="ml-12 xl:w-96">
            <input
              type="search"
              class="relative m-0  block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-primary-600 focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
              id="exampleSearch"
              placeholder="Search"
              onChange={(e) => {
                let searchValue = e.target.value.toLocaleLowerCase();
                setSearch(searchValue);
              }}
            />
          </div>
        </div>
      </form>

      <div className="inline-flex gap-4 p-5 ml-96 w-{25rem}">
        {selectedButton === "allButton" ? (
          <div className="">
            <button
              onClick={viewAll}
              className="bg-teal-500  hover:bg-teal-500 text-white font-bold py-2 px-4 rounded"
            >
              View All posts
            </button>
            {/* <button
              onClick={followingPost}
              className="bg-teal-200 ml-4  hover:bg-teal-500 text-white font-bold py-2 px-4 rounded"
            >
              For You
            </button> */}
          </div>
        ) : (
          <div className="">
            <button
              onClick={viewAll}
              className="bg-teal-200  hover:bg-teal-500 text-white font-bold py-2 px-4 rounded"
            >
              View All posts
            </button>
            {/* <button
              onClick={followingPost}
              className="bg-teal-200 ml-4 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded"
            >
              For You
            </button> */}
          </div>
        )}

        {category &&
          category?.map((category) => (
            <div>
              {selectedButton === category.category ? (
                <button
                  onClick={() => filterByCategory(category.category)}
                  className=" bg-teal-500 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded"
                >
                  {category.category}
                </button>
              ) : (
                <button
                  onClick={() => filterByCategory(category.category)}
                  className="bg-teal-200 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded"
                >
                  {category.category}
                </button>
              )}
            </div>
          ))}
      </div>

      <div className="posts">
        {Array.isArray(tempBlog) &&
          tempBlog
            .filter(searchData)
            .map((post) => <PostPage post={post} key={post._id} />)}
      </div>
    </>
  );
};

export default PostBody;
