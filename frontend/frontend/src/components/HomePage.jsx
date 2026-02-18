import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import MessageContainer from "../components/MessageContainer";

const HomePage = () => {
  const { selectedUser } = useSelector((store) => store.user);

  return (
    <div className="w-full h-screen bg-[#0b0f19] flex items-center justify-center px-6">
      <div
        className="
          w-full
          max-w-7xl
          h-[88vh]
          bg-zinc-900
          rounded-2xl
          shadow-2xl
          flex
          overflow-hidden
        "
      >
        <div
          className={`
            w-[320px]
            shrink-0
            border-r
            border-white/10
            ${selectedUser ? "hidden md:block" : "block"}
          `}
        >
          <Sidebar />
        </div>

        <div
          className={`
            flex-1
            bg-zinc-950
            ${selectedUser ? "block" : "hidden md:flex"}
          `}
        >
          <MessageContainer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
