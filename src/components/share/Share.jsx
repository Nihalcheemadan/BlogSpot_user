import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";

const Share = () => {
  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <label className="title">Add Title</label>
          <input type="text" placeholder={"Add your blog title here "} />
        </div>
        <div className="top">
          <label className="title">Select Category</label>
          <select className="cars" >
            <option className="inputField" value="volvo" >Technology</option>
            <option className="inputField" value="saab">Food</option>
            <option className="inputField" value="mercedes">Travel</option>
            <option className="inputField" value="audi">Books</option>
          </select>
        </div>
        <div className="top">
          <label className="title">Write content </label>
          <input className="description" type="text" />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{ display: "none" }} />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Video</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Add Audio</span>
            </div>
          </div>
          <div className="right">
            <button>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
