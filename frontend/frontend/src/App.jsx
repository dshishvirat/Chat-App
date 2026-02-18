// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";

// import HomePage from "./components/HomePage";
// import Login from "./components/Login";
// import Signup from "./components/Signup";

// import { setAuthUser, setOnlineUsers } from "./redux/userSlice";
// import { connectSocket, disconnectSocket } from "./socket";

// import useGetMe from "./hooks/useGetMe";

// const router = createBrowserRouter([
//   { path: "/", element: <HomePage /> },
//   { path: "/login", element: <Login /> },
//   { path: "/signup", element: <Signup /> },
// ]);

// function App() {
//   useGetMe()
//   const dispatch = useDispatch();
//   const authUser = useSelector((store) => store.user.authUser);

//   useEffect(() => {
//     const fetchMe = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/v1/user/me", {
//           withCredentials: true,
//         });
//         dispatch(setAuthUser(res.data));
//       } catch (err) {}
//     };
//     fetchMe();
//   }, [dispatch]);

//   useEffect(() => {
//     if (!authUser?._id) return;

//     const socket = connectSocket(authUser._id);

//     socket.on("getOnlineUsers", (users) => {
//       dispatch(setOnlineUsers(users));
//     });

//     return () => {
//       socket.off("getOnlineUsers");
//       disconnectSocket();
//     };
//   }, [authUser, dispatch]);

//   return <RouterProvider router={router} />;
// }

// export default App;





import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Signup from "./components/Signup";

import { setAuthUser, setOnlineUsers } from "./redux/userSlice";
import { connectSocket, disconnectSocket } from "./socket";

function App() {
  const dispatch = useDispatch();
  const authUser = useSelector((store) => store.user.authUser);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user on refresh
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await axios.get(
          "https://chat-backend-h890.onrender.com/api/v1/user/me",
          { withCredentials: true }
        );

        dispatch(setAuthUser(res.data));
      } catch (err) {
        dispatch(setAuthUser(null));
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, [dispatch]);

  // ✅ Router
  const router = createBrowserRouter([
    {
      path: "/",
      element: authUser ? <Navigate to="/home" /> : <Signup />,
    },
    {
      path: "/login",
      element: authUser ? <Navigate to="/home" /> : <Login />,
    },
    {
      path: "/home",
      element: authUser ? <HomePage /> : <Navigate to="/" />,
    },
  ]);

  // ✅ Socket
  useEffect(() => {
    if (!authUser?._id) return;

    const socket = connectSocket(authUser._id);

    socket.on("getOnlineUsers", (users) => {
      dispatch(setOnlineUsers(users));
    });

    return () => {
      socket.off("getOnlineUsers");
      disconnectSocket();
    };
  }, [authUser, dispatch]);

  if (loading) return <div>Loading...</div>;

  return <RouterProvider router={router} />;
}

export default App;
