
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";

const useGetMe = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await axios.get(
          "https://chat-backend-h890.onrender.com/api/v1/user/me",
          { withCredentials: true }
        );

        dispatch(setAuthUser(res.data));
      } catch (error) {
        console.log("User not logged in");
      }
    };

    fetchMe();
  }, [dispatch]);
};

export default useGetMe;
