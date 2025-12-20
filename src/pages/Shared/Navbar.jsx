import { Link, NavLink } from "react-router";
import logo from "../../assets/zap-logo-black.png";
import { MdArrowOutward } from "react-icons/md";
import useAuth from "../../hook/useAuth";
import LogOut from "../Auth/LogOut";

const Navbar = () => {
  const { user } = useAuth();
  const links = (
    <>
      <li>
        <NavLink className="navLink" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className="navLink" to="/services">
          Services
        </NavLink>
      </li>
      <li>
        <NavLink className="navLink" to="/coverage">
          Coverage
        </NavLink>
      </li>
      <li>
        <NavLink className="navLink" to="/about-us">
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink className="navLink" to="/pricing">
          Pricing
        </NavLink>
      </li>
      <li>
        <NavLink className="navLink" to="/send-parcel">
          Send Parcel
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink className="navLink" to="/dashboard/my-parcels">
              My Parcels
            </NavLink>
          </li>
          <li>
            <NavLink className="navLink" to="/dashboard">
              Dashboard
            </NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <nav className="navbar bg-base-100 shadow-sm rounded-2xl my-8">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {/* submenu */}
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">
          <img src={logo} alt="logo" className="w-32" />
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {/* menu */}
          {links}
        </ul>
      </div>
      <div className="navbar-end space-x-4 text-xl font-bold">
        {user ? (
          <LogOut>
            <button className="btn rounded-xl text-accent">LogOut</button>
          </LogOut>
        ) : (
          <Link to="/login" className="btn rounded-xl text-accent">
            Login
          </Link>
        )}

        <div>
          <Link
            to="/be-a-rider"
            className="btn btn-primary rounded-xl text-black"
          >
            Be A Rider
          </Link>
          <Link
            to="/be-a-rider"
            className="btn btn-neutral size-10 text-primary rounded-full relative"
          >
            <MdArrowOutward size={20} className="absolute" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
