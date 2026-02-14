import useGetOtherUsers from "../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";
import OtherUser from "./OtherUser";

const OtherUsers = () => {
  useGetOtherUsers();

  const { otherUsers, authUser, onlineUsers } = useSelector(
    (store) => store.user,
  );

  if (!authUser || !Array.isArray(otherUsers)) return null;

  const online = otherUsers.filter((u) => onlineUsers.includes(String(u._id)));

  const offline = otherUsers.filter(
    (u) => !onlineUsers.includes(String(u._id)),
  );

  return (
    <div className="w-full">
      {online.map((user) => (
        <OtherUser key={user._id} user={user} />
      ))}

      {offline.map((user) => (
        <OtherUser key={user._id} user={user} />
      ))}
    </div>
  );
};

export default OtherUsers;
