export const getAvatar = (user) => {
  const seed = encodeURIComponent(user?._id || user?.fullName || "user");
  
  return `https://i.pravatar.cc/150?u=${seed}`;
};
