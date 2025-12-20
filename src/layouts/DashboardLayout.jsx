import React from "react";
import { BsBoxSeam, BsCreditCard2BackFill, BsFillBoxSeamFill } from "react-icons/bs";
import { CiCreditCard1 } from "react-icons/ci";
import { FaLink, FaMotorcycle, FaTasks, FaUsers } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router";
import useRole from "../hook/useRole";
import { IoMdHome } from "react-icons/io";
import { RiHome7Fill, RiSettings5Fill } from "react-icons/ri";
import { MdTaskAlt } from "react-icons/md";

const DashboardLayout = () => {
  const { role } = useRole();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300 flex items-center justify-between">
          <div className="flex items-center">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <div className="px-4">Zap-Shift DashBoard</div>
          </div>
          <div>
            <Link to="/" className="btn btn-primary rounded-xl text-black mr-4">
              Back to Home
            </Link>
          </div>
        </nav>
        {/* Page content here */}
        <Outlet />
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <NavLink
              to="/dashboard"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                {/* Home icon */}
                <RiHome7Fill size={20} className="-ml-0.5"/>

                <span className="is-drawer-close:hidden">Homepage</span>
              </NavLink>
            </li>

            {/* my parcels */}
            <li>
              <NavLink
                to="/dashboard/my-parcels"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Parcels"
              >
                <BsFillBoxSeamFill size={18} />
                <span className="is-drawer-close:hidden">My Parcels</span>
              </NavLink>
            </li>
            {/* payment_history */}
            <li>
              <NavLink
                to="/dashboard/payment-history"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Payment History"
              >
                <BsCreditCard2BackFill size={18} className="-ml-0.5" />
                <span className="is-drawer-close:hidden">Payment History</span>
              </NavLink>
            </li>
            {/* rider only links */}
            {
             role?.role === "rider" && (
                // assigned tasks
                <>
                <li>
                  <NavLink
                    to="/dashboard/assigned-tasks"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Assigned Tasks"
                  >
                    <FaTasks size={18} className="-ml-0.5" />
                    <span className="is-drawer-close:hidden">
                      Assigned Tasks
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/completed-deliveries"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Completed Delivery"
                  >
                    <MdTaskAlt size={20} className="-ml-0.5" />
                    <span className="is-drawer-close:hidden">
                      Completed Delivery
                    </span>
                  </NavLink>
                </li>
                </>
              )
            }

            {/* admin only links */}
            {role?.role === "admin" && (
              <>
                {/* riders */}
                <li>
                  <NavLink
                    to="/dashboard/approve-riders"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Approve Riders"
                  >
                    <FaMotorcycle size={18} className="-ml-0.5" />
                    <span className="is-drawer-close:hidden">
                      Approve Riders
                    </span>
                  </NavLink>
                </li>
                {/* assign riders */}
                <li>
                  <NavLink
                    to="/dashboard/assign-riders"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Assign Riders"
                  >
                    <FaLink size={16} className="-ml-0.5" />
                    <span className="is-drawer-close:hidden">
                      Assign Riders
                    </span>
                  </NavLink>
                </li>
                {/* users */}
                <li>
                  <NavLink
                    to="/dashboard/users-management"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Users Management"
                  >
                    <FaUsers size={18} className="-ml-0.5" />
                    <span className="is-drawer-close:hidden">
                      Users Management
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            {/* List item */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                <RiSettings5Fill size={22} className="-ml-0.5" />
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
