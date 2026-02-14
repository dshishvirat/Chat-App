import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";


const useGetMessages = () => {
  const { selectedUser } = useSelector(store=>store.user);
  const dispatch = useDispatch();
  useEffect(() => {
  if (!selectedUser?._id) return;

  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/message/${selectedUser._id}`,
        { withCredentials: true }
      );
      dispatch(setMessages(res.data || []));
    } catch (error) {
      console.log(error);
    }
  };

  fetchMessages();
}, [selectedUser, dispatch]);

};

export default useGetMessages;








// import { useEffect } from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { setMessages } from "../redux/messageSlice";

// const useGetMessages = () => {
//   const dispatch = useDispatch();
//   const { selectedUser } = useSelector((state) => state.user);

//   useEffect(() => {
//     if (!selectedUser) return;

//     const fetchMessages = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/message/${selectedUser._id}`,
//           { withCredentials: true }
//         );

//         // 🔥 YAHI LINE MISS HOTI HAI AKSAR
//         dispatch(setMessages(res.data.messages || []));
//       } catch (error) {
//         console.log("Error fetching messages", error);
//       }
//     };

//     fetchMessages();
//   }, [selectedUser, dispatch]);
// };

// export default useGetMessages;
