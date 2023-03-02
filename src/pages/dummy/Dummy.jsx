import Image from "../../assets/img.png";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import NavigatioBar from "../../components/NavigatioBar";

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

const CreateBlog = () => {
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

  const MAX_FILE_SIZE = 1024 * 1024 * 2; // 2MB
  const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

  const uploadBlog = async (e ) => {


    if (image.size > MAX_FILE_SIZE) {
      console.error('File size is too large');
      toast.error('File size is too large')
      return;
    }
  
    // Validate the file type
    if (!ALLOWED_FILE_TYPES.includes(image.type)) {
      toast.error('Invalid file type')
      console.error('Invalid file type');
      return;
    }


    e.preventDefault();
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'blogapp');
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
      const token = localStorage.getItem('token');
      console.log(token, 'token here ');
      await axios.post(
        '/api/blog/createBlog',
        {
          imageUrl,
          title,
          content,
          category: selectedcategory,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
   
      navigate('/'); 
    } catch (error) {
      console.error(error);
    }
  };
  
  return (

    <div className="share">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
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

export default CreateBlog;
