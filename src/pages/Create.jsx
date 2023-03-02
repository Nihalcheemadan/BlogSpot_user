import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: [] }],
    [{ color: [] }],
    [{ align: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};


const Create = () => {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState();
  const [selectedcategory, setSelectedcategory] = useState();
  const [content, setContent] = useState();
  const [image, setImage] = useState();
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();
  console.log(selectedcategory);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/admin/getCategory");
      const data = await response.json();
      setCategories(data);
    }
    fetchData();
  }, []);
  const cloudAPI = "dudskpuk4";

  const MAX_FILE_SIZE = 1024 * 1024 * 2; // 2MB
  const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif"];

  const uploadBlog = async (e) => {
    if (image.size > MAX_FILE_SIZE) {
      console.error("File size is too large");
      toast.error("File size is too large");
      return;
    }
    // Validate the file type
    if (!ALLOWED_FILE_TYPES.includes(image.type)) {
      toast.error("Invalid file type");
      console.error("Invalid file type");
      return;
    }
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "blogapp");
    console.log(formData);
    let imageUrl = null;
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudAPI}/image/upload`,
        formData
      );
      console.log(response.data.secure_url);
      imageUrl = response.data.secure_url;
    } catch (error) {
      console.error(error);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      console.log(token, "token here ");
      await axios.post(
        "/api/blog/createBlog",
        {
          imageUrl,
          title,
          content,
          category: selectedcategory,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  function ImagePreview(e) {
    // Get the selected file
    const file = e.target.files[0];
    // Set the image state
    setImage(e.target.files[0]);
    // Set the preview state
    setPreview(URL.createObjectURL(file));
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={uploadBlog}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder={"Add your blog title here "}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-gray-700 font-bold mb-2"
          >
            Category
          </label>
          <div className="relative">
            <select
              id="category"
              name="category"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              onClick={(e) => setSelectedcategory(e.target.value)}
            >
              {categories.map((data, index) => (
                <option key={data.category} value={data.category}>
                  {data.category}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description
          </label>
          <ReactQuill
            style={{ height: "30vh" }}
            theme="snow"
            value={content}
            placeholder={"Write the content here..."}
            onChange={setContent}
            modules={modules}
          />
        </div>
        {/* <ImagePreview /> */}
        <div className="w-96 ">
          <label
            htmlFor="image"
            className="block mt-16 text-gray-700 font-bold mb-2"
          >
            Image
          </label>
          <div className="mt-1 flex items-center">
            <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
              {preview ? (
                <img
                  src={preview}
                  alt="Image preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <svg
                  className="h-full w-full text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              )}
            </span>
            <label
              htmlFor="image"
              className="ml-5 cursor-pointer font-medium text-blue-600 hover:text-blue-500"
            >
              {preview ? "Change" : "Upload"}
            </label>
            <input
              type="file"
              id="image"
              name="image"
              className="sr-only"
              onChange={ImagePreview}
            />
          </div>
        </div>
        <div className="flex mt-4 items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Create;

