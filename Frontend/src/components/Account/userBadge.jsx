import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../Store/Slices/userSlice";
import { Link } from "react-router-dom";
const UserBadge = () => {
  const user = useSelector(selectCurrentUser);

  if (!user) return null;

  const avatarLetter = user.email?.[0]?.toUpperCase() || "?";

  return (
    <Link to="/account">
      <div className="flex flex-col items-center px-2 p-1 bg-gray-100 rounded-sm shadow-md">
        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-500 text-white ">
          {avatarLetter}
        </div>
        <span className="text-sm text-gray-800">{user.email}</span>
      </div>
    </Link>
  );
};

export default UserBadge;
