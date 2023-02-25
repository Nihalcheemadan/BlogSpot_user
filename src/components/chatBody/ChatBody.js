import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import jwt_decode from "jwt-decode";
import { io } from "socket.io-client";
import Navbar from "../nav/Nav";

function ChatBody() {
  const [following, setFollowing] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState({});
  const [inputMessage, setInputMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const token = localStorage.getItem("token");
  const { userId, username } = jwt_decode(token);
  console.log(username, "username");
  const scrolRef = useRef();
  const socket = useRef();

  useEffect(() => {
    const getFollowing = async () => {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        "/api/blog/following",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      setFollowing(data.Following);
    }
    getFollowing();
  }, [])

  const handleSelect = (user) => {
    setCurrentChat(user);
  };

  useEffect(() => {
    const getMessages = async (user) => {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`/api/user/getMessages?to=${user}`, {
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
      socket.current = io("http://localhost:5000");
      socket.current.emit("addUser", userId);
    }
  }, [userId]);

  const sendmsg = async () => {
    const message = {
      myself: true,
      messages: inputMessage,
    };

    socket.current.emit("send-msg", {
      to: currentChat._id,
      messages: inputMessage,
    });

    let token = localStorage.getItem("token");
    let data = {
      to: currentChat._id,
      messages: inputMessage,
    };

    await axios.post("/api/user/sendMessage", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMessages(messages.concat(message));
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ myself: false, messages: msg });
      });
    }
  }, [arrivalMessage])

  useEffect(() => {
    arrivalMessage && setMessages((pre) => [...pre, arrivalMessage]);
  }, [arrivalMessage]);


  const [search, setSearch] = useState("");
  const searchData = (following) => {
    return search === ""
      ? following
      : following.username.toLowerCase().includes(search) 
  };

  return (
    
    <div>
      
      <div class="flex  h-screen antialiased text-gray-800">
        <div class="flex flex-row h-full w-full overflow-x-hidden ">
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
                <span class="font-bold">Active Conversations</span>
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
          <div class="flex flex-col flex-auto h-full p-6">
            <div class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
              <div class="flex flex-col h-full overflow-x-auto mb-4">
                <div class="flex flex-col h-full">
                  {Object.keys(currentChat).length !== 0 && (
                    <div class="grid grid-cols-12 gap-y-2">
                      {messages.map((msg) =>
                        msg.myself ? (
                          <div
                            key={msg.message}
                            class="col-start-6 col-end-13 p-3 rounded-lg"
                          >
                            <div class="flex items-center justify-start flex-row-reverse">
                              <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                Me
                                {console.log(msg, "message logged")}
                              </div>
                              <div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                <div>{msg.message}</div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div
                            key={msg.message}
                            class="col-start-1 col-end-8 p-3 rounded-lg"
                          >
                            <div class="flex flex-row items-center">
                              <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                {currentChat.username[0]}
                              </div>
                              <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                <div>{msg.message}</div>
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
              <div class="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                <div>
                  <button class="flex items-center justify-center text-gray-400 hover:text-gray-600">
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div class="flex-grow ml-4">
                  <div class="relative w-full">
                    <input
                      onChange={(e) => setInputMessage(e.target.value)}
                      type="text"
                      class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                    />
                    <button class="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
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
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="ml-4">
                  <button
                    onClick={sendmsg}
                    class="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                  >
                    <span>Send</span>
                    <span class="ml-2">
                      <svg
                        class="w-4 h-4 transform rotate-45 -mt-px"
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


