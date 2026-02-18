import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((store) => store.user.authUser);

  useEffect(() => {
    if (!authUser?._id) return;

    const fetchUsers = async () => {
      try {
        const res = await axios.get("https://chat-backend-h890.onrender.com/api/v1/user", {
          withCredentials: true,
        });

        dispatch(setOtherUsers(res.data));
      } catch (error) {
        console.error("Fetch users failed:", error);
      }
    };

    fetchUsers();
  }, [authUser, dispatch]);
};

export default useGetOtherUsers;
