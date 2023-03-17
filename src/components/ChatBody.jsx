import React, { useEffect, useRef, useState } from "react";
import jwt_decode from "jwt-decode";
import { io } from "socket.io-client";
import instance from "../utils/baseUrl";
import { toast } from "react-hot-toast";
import dateFormat, { masks } from "dateformat";
import InputEmoji from "react-input-emoji";
import { BiVideoPlus, BiImageAdd } from "react-icons/bi";


const toastConfig = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};



function ChatBody() {
  const [following, setFollowing] = useState([]);
  const [message, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState({});
  const [inputMessage, setInputMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState({});

  const [image, setImage] = useState(null);
  const [videoFile, setVideoFile] = useState(null);


  console.log(message,'messssssssssssssssssss');

  const token = localStorage.getItem("token");
  const receiverId = currentChat._id
  const scrolRef = useRef();
  const socket = useRef();

  const cloudAPI = "dudskpuk4";
  const imageRef = useRef();
  const videoRef = useRef();

  const { userId  } = jwt_decode(token)

  useEffect(() => {
    const getFollowing = async () => {
      const token = localStorage.getItem("token");
      const { data } = await instance.post(
        "/blog/following",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      setFollowing(data);
    }
    getFollowing();
  }, [])
  
  const handleSelect = (user) => {
    setCurrentChat(user);
  };

  useEffect(() => {
    const getMessages = async (user) => {
      const token = localStorage.getItem("token");
      const { data } = await instance.get(`/user/getMessages?to=${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(data);
    };
    getMessages(currentChat._id);
  }, [currentChat._id]);

  useEffect(() => {
    scrolRef.current.scrollIntoView({ behavior: "smooth" });
  });

  useEffect(() => {
    if (currentChat !== "") {
      // socket.current = io("https://www.server.blogsspot.site");
      socket.current = io("http://localhost:5000");
      socket.current.emit("addUser", receiverId);
    }
  }, [receiverId]);

  const sendmsg = async () => {
    const messages = {
      myself: true,
      message: inputMessage,
      time: Date.now(),
    };
    socket.current.emit("send-msg", {
      to: currentChat._id,
      message: inputMessage,
      // from: userId,
      type:"text",
    });
    let token = localStorage.getItem("token");
    let data = {
      to: currentChat._id,
      message: inputMessage,
      type:"text" 
    };
    await instance.post("/user/sendMessage", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMessages(message.concat(messages));
    setInputMessage("");
  };


  useEffect(() => {
    if(socket.current) {
      socket.current.on("msg-receive", (data) => {
        setArrivalMessage({ myself: false, message:data.message,type:data.type ,time: Date.now()});
      })
    }
  }, [arrivalMessage]) 

  useEffect(() => {
    if (arrivalMessage.message) {
      setMessages((pre) => [...pre, arrivalMessage]);
    }
  }, [arrivalMessage]);

  const UploadFile = async () => {
    if (videoFile === null && image === null) {
      return;
    }
    const type = !image ? "video" : "image";
    const file = !image ? videoFile : image;
    if (file.size > 7000000) {
      toast.info("🥵 Seems like a big file, take some time", toastConfig);
    }
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudAPI}/${type}/upload`;
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "blogapp");
    try {
      const res = await fetch(cloudinaryUrl, {
        method: "post",
        body: data,
      });
      const json = await res.json();
      const url = json.url;

      const messages = {
        myself: true,
        message: url,
        type: type,
      };
      socket.current.emit("send-msg", {
        to: currentChat._id,
        message: url,
        type: type,
      });
      let fileData = {
        to: currentChat._id,
        message: url,
        type,
      };
      await instance.post(
        "/user/sendMessage",
        fileData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessages(message.concat(messages));
    } catch (err) {
      toast.error("Oops, uploading failed");
    }
  };


  const [search, setSearch] = useState("");
  const searchData = (following) => {
    return search === ""
      ? following
      : following.username.toLowerCase().includes(search) 
  };

  return (
    <div>
      <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-scroll">
        <div class="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
            <div className="relative text-gray-600">
              <input
                type="search"
                name="serch"
                onChange={(e) => {
                  let searchValue = e.target.value.toLocaleLowerCase();
                  setSearch(searchValue);
                }}
                placeholder="Search"
                className="bg-slate-200 w-56 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-3 mr-4"
              >
                <svg
                  className="h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  id="Capa_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 56.966 56.966"
                  style={{ enableBackground: "new 0 0 56.966 56.966" }}
                  xmlSpace="preserve"
                  width="512px"
                  height="512px"
                >
                  <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                </svg>
              </button>
            </div>
            {Object.keys(currentChat).length !== 0 && (
              <div class="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
                <div class="h-20 w-20 rounded-full border overflow-hidden">
                  <img
                    src={currentChat.profileImg}
                    alt=""
                    class="h-full w-full"
                  />
                </div>
                <div class="text-sm font-semibold mt-2">
                  {currentChat.username ? currentChat.username : ""}{" "}
                </div>

                <div class="text-xs text-gray-500"></div>
              </div>
            )}
            <div class="flex flex-col mt-8">
              <div class="flex flex-row items-center justify-between text-xs">
                <span class="font-bold">Friends</span>
                <span class="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                  {following.length}
                </span>
              </div>
              <div class="flex flex-col space-y-1 mt-4 -mx-2 h-72 overflow-y-auto">
                {following &&
                  following.filter(searchData).map((user) => (
                    <button
                      onClick={() => handleSelect(user)}
                      class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                    >
                      <div class="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                        {user?.username[0]}
                      </div>
                      <div class="ml-2 text-sm font-semibold">
                        {user?.username}
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-auto h-full  min-w-[380px] p-6">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
              <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-screen">
                {Object.keys(currentChat).length !== 0 && (
                  <div className="grid grid-cols-12 gap-y-2">
                    {message.map((msg) =>
                      msg.myself ? (
                        <div
                          key={msg._id}
                          className="col-start-6 col-end-13 p-3 rounded-lg"
                        >
                          <div className="flex items-center justify-start flex-row-reverse">
                            <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                              {msg?.type === "video" ? (
                                <video src={msg.message} controls></video>
                              ) : msg.type === "image" ? (
                                <img  className="h-96 w-full" src={msg.message}></img>
                              ) : (
                                <div className="text-base font-semibold">
                                {msg.message ? msg.message : ""}
                              </div>
                              )}
                                <div className=" flex justify-end">
                                <p className="text-xs text-slate-500">
                                  {dateFormat(msg.createdAt, "shortTime")}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          key={msg._id}
                          className="col-start-1 col-end-8 p-3 rounded-lg"
                        >
                          <div className="flex flex-row items-center">
                            <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                              {msg?.type === "video" ? (
                                <video src={msg.message} controls></video>
                              ) : msg.type === "image" ? (
                                <img src={msg.message}></img>
                              ) : (
                                <div className="text-base font-semibold">
                                  {msg.message ? msg.message : ""}
                                </div>
                              )}
                              <div className=" flex justify-end">
                                <p className="text-xs text-slate-400">
                                  {dateFormat(msg.createdAt, "shortTime")}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                  )}
                  <div ref={scrolRef} />
                </div>
              </div>
              {Object.keys(currentChat).length !== 0 && (
              <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                <div className="flex-grow ml-4">
                  <div className="relative w-full">
                    <input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      type="text"
                      className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                    />
                    <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                      <InputEmoji
                        value={inputMessage}
                        onChange={setInputMessage}
                      />
                    </button>

                    <div
                      style={{
                        display: "block",
                        textAlign: "center",
                        height: "max-content",
                        position: "absolute",
                        marginTop: "-7em",
                        marginLeft: "-0.7em",
                      }}
                    >
                      <div
                        onClick={() => imageRef.current.click()}
                        style={{
                          backgroundColor: "#FFFFFF",
                          padding: "5px",
                          borderRadius: "50%",
                          // marginBottom: "0.1em",
                        }}
                      >
                        <BiImageAdd
                          style={{ fontSize: "2em", color: "#21F052" }}
                        />
                        <input
                          disabled={videoFile}
                          onChange={(e) => {
                            setImage(e.target.files[0]);
                          }}
                          type="file"
                          id="file"
                          ref={imageRef}
                          style={{ display: "none" }}
                          accept="image/x-png,image/gif,image/jpeg"
                        />
                      </div>

                      <div
                        onClick={() => videoRef.current.click()}
                        style={{
                          backgroundColor: "#FFFFFF",
                          padding: "5px",
                          borderRadius: "50%",
                          marginBottom: "0.2em",
                        }}
                      >
                        <BiVideoPlus
                          style={{ fontSize: "2em", color: "#EC4768" }}
                        />
                        <input
                          disabled={image}
                          onChange={(e) => {
                            setVideoFile(e.target.files[0]);
                          }}
                          type="file"
                          id="file"
                          ref={videoRef}
                          style={{ display: "none" }}
                          accept="video/mp4,video/x-m4v,video/*"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ml-4">
                  <button
                    onClick={() =>
                      inputMessage === "" ? UploadFile() : sendmsg()
                    }
                    className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                  >
                    {/* <spanv className=" ">Send</spanv> */}
                    <span className="ml-2">
                      <svg
                        className="w-4 h-4 transform = rotate-45 -mt-px"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBody;


