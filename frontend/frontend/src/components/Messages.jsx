import Message from "./Message";
import useGetMessages from "../hooks/useGetMessages";
import useGetRealTimeMessage from "../hooks/useGetRealTimeMessage";
import { useSelector } from "react-redux";

const Messages = () => {
  const { authUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);

  useGetMessages();
  useGetRealTimeMessage();

  if (!authUser) return null;
  if (!Array.isArray(messages)) return null;

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3">
      {messages.map((msg) => {
        if (!msg || !msg._id || !msg.senderId) return null;
        return <Message key={msg._id} message={msg} />;
      })}
    </div>
  );
};

export default Messages;
