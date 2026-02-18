import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
import { getAvatar } from "../utils/avatar";

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);

  const isOnline = onlineUsers.includes(String(user._id));
  const isSelected = selectedUser?._id === user._id;

  return (
    <>
      <div
        onClick={() => dispatch(setSelectedUser(user))}
        className={`flex items-center gap-3 px-3 py-3 cursor-pointer
          ${isSelected ? "bg-white/10" : "hover:bg-white/5"}`}
      >
        <div className="relative">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-black dark:border-white">
            <img
              src={getAvatar(user)}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-black rounded-full" />
          )}
        </div>

        <div className="flex flex-col">
          <p className="text-white font-medium">{user.fullName}</p>
          {isOnline && <span className="text-xs text-green-400">Online</span>}
        </div>
      </div>

      <div className="w-full h-px bg-white/20" />
    </>
  );
};

export default OtherUser;
