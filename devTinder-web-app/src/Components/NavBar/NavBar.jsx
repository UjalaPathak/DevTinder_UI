import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constant";
import { removeUser } from "../../slice/userSlice";

const NavBar = () => {
  const navigate = useNavigate();
  const User = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {}
  };

  const handleProfile = async () => {
    await axios.get(BASE_URL + "/profile/view", { withCredentials: true });
    navigate("/profile");
  };
  return (
    <div className="navbar bg-base-200 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">👩🏻‍💻DevTinder</a>
      </div>
      <div className="flex gap-2">
        {User && (
          <div
            className="dropdown dropdown-end flex"
            style={{ alignItems: "center" }}
          >
            <p> Hello {User.firstName}</p>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar mx-10"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={User.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link onClick={handleProfile} className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
