

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser, setJustLoggedIn } from "../redux/userSlice";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/login",
        user,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      dispatch(setAuthUser(res.data));
      dispatch(setJustLoggedIn(true)); // 🔥 KEY LINE
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-md p-6 sm:p-8 rounded-xl bg-white/10 backdrop-blur-md border border-white/30 shadow-xl text-white">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">
          Login
        </h1>

        <form onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <label className="block mb-1">Username</label>
            <input
              type="text"
              value={user.username}
              onChange={(e) =>
                setUser({ ...user, username: e.target.value })
              }
              className="w-full h-11 px-3 rounded-md bg-white/70 text-black outline-none"
              placeholder="Username"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              value={user.password}
              onChange={(e) =>
                setUser({ ...user, password: e.target.value })
              }
              className="w-full h-11 px-3 rounded-md bg-white/70 text-black outline-none"
              placeholder="Password"
            />
          </div>

          <p className="text-center text-sm mb-4">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-blue-400 hover:underline">
              Signup
            </Link>
          </p>

          <button
            type="submit"
            className="w-full h-11 rounded-md bg-black/80 hover:bg-black transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
