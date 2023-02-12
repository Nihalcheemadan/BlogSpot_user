import Image from "../../assets/img.png";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Createblog.scss";

const Createblog = () => {
  const [ categories, setCategories ] = useState([]);
  const [ title, setTitle] = useState();
  const [ selectedcategory, setSelectedcategory] = useState();
  const [ content, setContent] = useState();
  const [ image,setImage ] = useState();

  const navigate = useNavigate();
  
  console.log(selectedcategory);

  useEffect(() => { 
    async function fetchData() {
      const response = await fetch("/api/admin/getCategory"); 
      const data = await response.json();
      setCategories(data);
      console.log(data);
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
        console.log(imageUrl,title,content,selectedcategory);
        const response1 = 
        await axios.post(
          "/api/admin/createBlog",
          {imageUrl,title,content,category:selectedcategory}
        ).then((res)=>{ 
          console.log(res); 
          navigate('/');
        })
        if (response1.data.success) {
          toast.success(response1.data.message);
        }
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
                <option key={index} className="inputField" value={data}>
                  {data}
                </option>
              ))}
            </select> 
          </div>
          <div className="top"> 
            <label className="title">Write content</label>
            <input
              onChange={(e) => {
                setContent(e.target.value);
              }}
              className="description" 
              type="textarea"
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
              {/* <div className="item">
              <img src={Map} alt="" />
              <span>Add Video</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Add Audio</span>
            </div> */}
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
