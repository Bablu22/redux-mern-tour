import React from "react";
import { MenuIcon } from "@heroicons/react/solid";
import { LoginIcon } from "@heroicons/react/solid";
import { LogoutIcon } from "@heroicons/react/solid";
import { UserCircleIcon } from "@heroicons/react/solid";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/features/authSlice";
import { toast } from "react-toastify";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setLogout());
    toast.success("You are loged out");
    navigate("/login");
  };
  return (
    <>
      <nav className="sticky top-0 flex flex-wrap items-center justify-between px-2 py-3 bg-gray-800">
        <div className="container flex flex-wrap items-center justify-between px-4 mx-auto">
          <div className="relative flex justify-between w-full lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="inline-block py-2 mr-4 text-sm font-bold leading-relaxed text-white uppercase whitespace-nowrap"
              to="/"
            >
              Safeer Tour
            </Link>

            <button
              className="block px-3 py-1 text-xl leading-none text-white bg-transparent border border-transparent border-solid rounded outline-none cursor-pointer lg:hidden focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <MenuIcon className="w-7 h-7" />
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col list-none lg:flex-row lg:ml-auto">
              <li className="nav-item">
                <Link
                  className="flex items-center px-3 py-2 text-sm font-medium leading-snug text-white uppercase hover:opacity-75"
                  to="/"
                >
                  Home
                </Link>
              </li>

              {!user ? (
                <li className="nav-item">
                  <Link
                    className="flex items-center px-3 py-2 text-sm font-medium leading-snug text-white uppercase hover:opacity-75"
                    to="/login"
                  >
                    Login
                    <LoginIcon className="w-5 ml-1" />
                  </Link>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="flex items-center px-3 py-2 text-sm font-medium leading-snug text-white uppercase hover:opacity-75"
                      to="/addtour"
                    >
                      Add Tour
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="flex items-center px-3 py-2 text-sm font-medium leading-snug text-white uppercase hover:opacity-75"
                      to="/dashboard"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      onClick={handleLogout}
                      className="flex items-center px-3 py-2 text-sm font-medium leading-snug text-red-500 uppercase hover:opacity-75"
                    >
                      Logout
                      <LogoutIcon className="w-5 ml-1" />
                    </button>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="flex items-center px-3 py-2 text-sm font-medium leading-snug text-white uppercase hover:opacity-75"
                      to="/"
                    >
                      <UserCircleIcon className="w-6 mr-1" />
                      <span>{user?.user?.name}</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
