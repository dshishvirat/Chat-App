import io from "socket.io-client";

let socket = null;

export const connectSocket = (userId) => {
  if (!socket) {
    socket = io("https://chat-backend-h890.onrender.com", {
      query: { userId: String(userId) },
      withCredentials: true,
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;
