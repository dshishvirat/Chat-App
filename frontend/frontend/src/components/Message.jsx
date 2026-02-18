import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { getAvatar } from "../utils/avatar";

const Message = ({ message }) => {
  const { authUser, selectedUser } = useSelector((store) => store.user);
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  if (!authUser) return null;

  const senderId =
    typeof message.senderId === "object"
      ? message.senderId._id
      : message.senderId;

  const isMyMessage = senderId === authUser._id;
  const avatarUser = isMyMessage ? authUser : selectedUser;

  return (
    <div
      ref={ref}
      className={`flex mb-2 ${isMyMessage ? "justify-end" : "justify-start"}`}
    >
      <div className="flex items-end gap-2">
        <div className="w-8 h-8 rounded-full overflow-hidden border border-white/40">
          <img
            src={getAvatar(avatarUser)}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div
          className={`px-3 py-2 rounded-lg max-w-[65%]
            ${
              isMyMessage
                ? "bg-blue-600 text-white rounded-br-none"
                : "bg-gray-300 text-black rounded-bl-none"
            }
          `}
        >
          {message.message}
        </div>
      </div>
    </div>
  );
};

export default Message;
