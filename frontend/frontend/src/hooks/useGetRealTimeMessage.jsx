import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../redux/messageSlice";
import { getSocket } from "../socket";

const useGetRealTimeMessage = () => {
  const dispatch = useDispatch();
  const { authUser, selectedUser } = useSelector((store) => store.user);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handler = (newMessage) => {
      console.log("RECEIVED MESSAGE:", newMessage);

      if (newMessage.receiverId === authUser?._id) {
        dispatch(addMessage(newMessage));
      }
    };

    socket.on("newMessage", handler);

    return () => {
      socket.off("newMessage", handler);
    };
  }, [authUser, selectedUser, dispatch]);
};

export default useGetRealTimeMessage;
