import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Signup from "./components/Signup";

import { setAuthUser, setOnlineUsers } from "./redux/userSlice";
import { connectSocket, disconnectSocket } from "./socket";

import useGetMe from "./hooks/useGetMe";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
]);

function App() {
  useGetMe()
  const dispatch = useDispatch();
  const authUser = useSelector((store) => store.user.authUser);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/user/me", {
          withCredentials: true,
        });
        dispatch(setAuthUser(res.data));
      } catch (err) {}
    };
    fetchMe();
  }, [dispatch]);

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

  return <RouterProvider router={router} />;
}

export default App;
