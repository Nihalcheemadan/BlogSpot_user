// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const Chat = () => {
//   // const [messages, setMessages] = useState([]);
//   // const [message, setMessage] = useState('');
//   // const [username, setUsername] = useState('');

//   // useEffect(() => {
//   //   // Connect to the server
//   //   const socket = io('http://localhost:5000/');

//   //   // Listen for incoming messages
//   //   socket.on('message', (message) => {
//   //     setMessages((prevMessages) => [...prevMessages, message]);
//   //   });
//   //   // Cleanup function
//   //   return () => {
//   //     socket.disconnect();
//   //   };
//   // }, []);

//   // const handleSendMessage = (event) => {
//   //   event.preventDefault();

//   //   // Send the message to the server
//   //   io('http://localhost:5000').emit('message', {
//   //     username: username,
//   //     message: message,
//   //   });

//   //   // Reset the message input
//   //   setMessage('');
//   // };

//   return (
//     <div>
//       <div>
//         <h1>Chat</h1>
//         <form onSubmit={handleSendMessage}>
//           <input
//             type="text"
//             placeholder="Enter your username"
//             value={username}
//             onChange={(event) => setUsername(event.target.value)}
//             required
//           />
//           <br />
//           <textarea
//             placeholder="Enter your message"
//             value={message}
//             onChange={(event) => setMessage(event.target.value)}
//             required
//           /> 
//           <br />
//           <button type="submit">Send</button>
//         </form>
//       </div>
//       <div>
//         <h2>Messages:</h2>
//         {messages.map((message, index) => (
//           <div key={index}>
//             <strong>{message.username}: </strong>
//             <span>{message.message}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Chat;
