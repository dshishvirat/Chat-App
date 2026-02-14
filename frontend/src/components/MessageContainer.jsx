import { useDispatch, useSelector } from "react-redux";
import Messages from "./Messages";
import SendInput from "./SendInput";
import { getAvatar } from "../utils/avatar";
import { setSelectedUser } from "../redux/userSlice";

const MessageContainer = () => {
  const dispatch = useDispatch();
  const { selectedUser, authUser, justLoggedIn } = useSelector(
    (store) => store.user,
  );

  if (!selectedUser) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-white mb-3">
            {justLoggedIn && authUser
              ? `Hi, ${authUser.fullName} 👋`
              : "Welcome 🙏"}
          </h1>
          <p className="text-white/50 text-lg">
            Select a user to start chatting
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-zinc-950">
      <div className="flex items-center gap-4 px-6 py-4 bg-zinc-900 border-b border-white/10">
        <button
          onClick={() => dispatch(setSelectedUser(null))}
          className="md:hidden text-white text-xl"
        >
          ←
        </button>

        <img
          src={getAvatar(selectedUser)}
          alt=""
          className="w-10 h-10 rounded-full object-cover"
        />

        <p className="text-white font-medium text-lg truncate">
          {selectedUser.fullName}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        <Messages />
      </div>

      <SendInput />
    </div>
  );
};

export default MessageContainer;
