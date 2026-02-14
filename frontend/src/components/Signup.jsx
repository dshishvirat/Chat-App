import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const navigate = useNavigate();

  const handleGenderChange = (gender) => {
    setUser({ ...user, gender });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/register",
        user,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 py-6">
      <div
        className="
          w-full max-w-md
          p-6 sm:p-8
          rounded-xl
          bg-white/10 backdrop-blur-md
          border border-white/30
          shadow-xl
          text-white
        "
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">
          Signup
        </h1>

        <form onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <label className="block mb-1 text-white/90">Full Name</label>
            <input
              type="text"
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              placeholder="Full Name"
              className="w-full h-11 px-3 rounded-md bg-white/70 text-black outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-white/90">Username</label>
            <input
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="Username"
              className="w-full h-11 px-3 rounded-md bg-white/70 text-black outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-white/90">Password</label>
            <input
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
              className="w-full h-11 px-3 rounded-md bg-white/70 text-black outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-white/90">Confirm Password</label>
            <input
              type="password"
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              placeholder="Confirm Password"
              className="w-full h-11 px-3 rounded-md bg-white/70 text-black outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-white/90">Gender</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  checked={user.gender === "male"}
                  onChange={() => handleGenderChange("male")}
                />
                Male
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  checked={user.gender === "female"}
                  onChange={() => handleGenderChange("female")}
                />
                Female
              </label>
            </div>
          </div>

          <p className="text-center text-sm mb-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>

          <button
            type="submit"
            className="w-full h-11 rounded-md bg-black/80 hover:bg-black transition text-white font-medium"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
