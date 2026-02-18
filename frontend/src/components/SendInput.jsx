import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { IoSend } from "react-icons/io5";
import { addMessage } from "../redux/messageSlice";

const SendInput = () => {
  const [message, setMessage] = useState("");
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const sendMessageHandler = async (e) => {
    e.preventDefault();

    if (!message.trim() || !selectedUser?._id) return;

    try {
      const res = await axios.post(
        `https://chat-backend-h890.onrender.com/api/v1/message/send/${selectedUser._id}`,
        { message },
        { withCredentials: true },
      );

      dispatch(addMessage(res.data));

      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={sendMessageHandler}
      className="flex items-center gap-2 p-3 bg-black/40 backdrop-blur-md"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={`Message ${selectedUser?.fullName}`}
        className="
          flex-1
          px-4
          py-3
          rounded-full
          bg-white
          text-black
          placeholder-gray-500
          outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      />

      <button
        type="submit"
        className="
          w-12
          h-12
          flex
          items-center
          justify-center
          rounded-full
          bg-blue-600
          hover:bg-blue-700
          text-white
          transition
        "
      >
        <IoSend size={20} />
      </button>
    </form>
  );
};

export default SendInput;
