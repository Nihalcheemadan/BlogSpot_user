import Image from "../../assets/img.png";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Createblog.scss";

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

const Createblog = () => {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState();
  const [selectedcategory, setSelectedcategory] = useState();
  const [content, setContent] = useState();
  const [image, setImage] = useState();

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
  const uploadBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "blogapp ");
    console.log(formData);
    let imageUrl = null;
    await axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloudAPI}/image/upload`,
        formData
      )
      .then(async (response) => {
        console.log(response.data.secure_url);
        const imageUrl = response.data.secure_url;
        console.log(imageUrl, title, content, selectedcategory)
        const response1 = await axios
          .post("/api/admin/createBlog", {
            imageUrl,
            title,
            content,
            category: selectedcategory,
          })
          .then((res) => {
            navigate("/");
          });
      });
  };
  return (
    <div className="share">
      <form onSubmit={uploadBlog}>
        <div className="container">
          <div className="top">
            <label className="title">Add Title</label>
            <input
              type="text"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder={"Add your blog title here "}
            />
          </div>
          <div className="top">
            <label className="title">Select Category</label>
            <select
              className="cars"
              onClick={(e) => setSelectedcategory(e.target.value)}
            >
              {categories.map((data, index) => (
                <option key={data.category} className="inputField" value={data.category}>
                  {data.category} 
                </option> 
              ))} 
            </select>
          </div>  
          <div className="top">
            <label className="title">Write content</label>
            {/* <input
              
              label="Title"
            />   */}
          <ReactQuill
              style={{ height: "30vh" }}
              theme="snow"
              value={content}
              placeholder={"Write the content here..."}
              onChange={setContent}
              modules={modules}
              />
          </div>
          <hr />
          <div className="bottom">
            <div className="left">
              <input
                type="file"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
                id="file"
                style={{ display: "none" }}
              />
              <label htmlFor="file">
                <div className="item">
                  <img src={Image} alt="" />
                  <span>Add Image</span>
                </div>
              </label>
            </div>            
            <div className="right">
              <button type="submit">Share</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Createblog;
