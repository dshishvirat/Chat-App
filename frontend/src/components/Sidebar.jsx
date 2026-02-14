import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import {
  setAuthUser,
  setOtherUsers,
  setSelectedUser,
} from "../redux/userSlice";
import { disconnectSocket } from "../socket";

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useGetOtherUsers();

  const navigate = useNavigate();

  const { otherUsers } = useSelector((store) => store.user);

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    const filteredUsers = otherUsers.filter((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase()),
    );

    if (filteredUsers.length === 0) {
      toast.error("User not found");
      return;
    }

    dispatch(setOtherUsers(filteredUsers));
  };

  const resetSearchHandler = async (value) => {
    setSearch(value);

    if (value === "") {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/user", {
          withCredentials: true,
        });
        dispatch(setOtherUsers(res.data));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const logoutHandler = async () => {
    try {
      await axios.get("http://localhost:5000/api/v1/user/logout", {
        withCredentials: true,
      });

      disconnectSocket();
      dispatch(setAuthUser(null));
      dispatch(setOtherUsers([]));
      dispatch(setSelectedUser(null));

      navigate("/login");
      toast.success("Logged out");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full w-full bg-zinc-900 flex flex-col p-4">
      <form onSubmit={searchSubmitHandler} className="flex gap-2 mb-3">
        <input
          value={search}
          onChange={(e) => resetSearchHandler(e.target.value)}
          placeholder="Search..."
          className="flex-1 px-4 py-2 rounded-lg bg-zinc-800 text-white outline-none"
        />
        <button type="submit" className="p-2 rounded-lg bg-zinc-800 text-white">
          <BsSearch />
        </button>
      </form>

      <div className="flex-1 overflow-y-auto pr-1">
        <OtherUsers />
      </div>

      <button
        onClick={logoutHandler}
        className="mt-4 py-2 rounded-lg bg-black text-white hover:bg-zinc-800 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
