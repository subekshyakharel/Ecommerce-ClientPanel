import Stack from "react-bootstrap/Stack";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUserApi } from "../../services/authapi";
import { setUser } from "../../features/user/userSlice";
import { IoIosLogOut } from "react-icons/io";

const Sidebar = () => {
  //   const { user } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const handleOnLogout = () => {
    logoutUserApi();

    sessionStorage.removeItem("accessJWT");
    localStorage.removeItem("refreshJWT");
    dispatch(setUser({}));
  };
  return (
    <Stack gap={3} className="">
      {/* <div className="p-2">
        <Link to="/user" className="nav-link">
          Dashboard
        </Link>
      </div> */}

      <div className="p-2">
        <Link to="/user/order-history" className="nav-link">
          Order History
        </Link>
      </div>

      {/* <div className="p-2">
        <Link to="/user/profile" className="nav-link">
          Profile
        </Link>
      </div> */}
      <div className="p-2">
        <Link to="/" onClick={handleOnLogout} className="text-dark">
          Logout <IoIosLogOut size={20} />
        </Link>
      </div>
    </Stack>
  );
};
export default Sidebar;
