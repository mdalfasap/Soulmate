import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/LoginPage";
import "./App.css";
import Otp from "./components/Otp";
import UserHome from "./components/userHome/UserHome";
import UserInfo from "./components/userInfo/UserInfo";
import UserProfile from "./components/userHome/UserProfile";
import DetailedProfile from "./components/userHome/DetailedProfile";
import Message from "./components/userHome/message/message";



function App() {

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,

    },
    {
      path: "/login",
      element: <Otp />,

    },
    {
      path: '/userinfo',
      element:<UserInfo />,
    },
    
    {
      path: "/userhome",
      element: <UserHome  />,

    },
    {
      path: "/profile",
      element: <UserProfile  /> ,

    },
    {
      path: "/message/:userId",
      element: <Message  /> ,

    },
    {
      path: "/user/:userId",
      element: <DetailedProfile  /> ,

    },

  ],
  {
    redirectTo: "/",
  }
);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;


// import React, { useState, useEffect, Fragment } from 'react';
// import io from 'socket.io-client';

// function App() {
//   const [name, setName] = useState('');
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const socket = io('http://localhost:8080');
//   useEffect(() => {

//     socket.on('message', (message) => {
//       setMessages((messages) => [...messages, message]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (name && message) {
//       socket.emit('sendMessage', { name, message });
//       setName('');
//       setMessage('');
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input type="text" value={name} placeholder="Your name" onChange={(event) => setName(event.target.value)} />
//         <input type="text" value={message} placeholder="Your message" onChange={(event) => setMessage(event.target.value)} />
//         <button type="submit">Send</button>
//       </form>
//       <ul>
//         {messages.map((message, index) => (
//           <li key={index}>
//             {message.name}: {message.message}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;
