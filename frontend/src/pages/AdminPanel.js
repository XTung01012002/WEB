import React, { useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== "ADMIN") {
      navigate("/");
    }
  }, [user, navigate]);

  // Function to apply active styles
  const linkStyle = ({ isActive }) =>
    `px-4 py-2 rounded-md transition-all ${
      isActive
        ? 'bg-white text-black shadow-md border border-black'
        : 'text-white hover:bg-red-500 hover:text-white'
    }`;

  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden">
      <aside className="bg-red-400 min-h-full w-full max-w-60 customShadow">
        <div className="h-32 flex justify-center items-center flex-col">
          <div className="text-5xl cursor-pointer relative flex justify-center">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                className="w-20 h-20 rounded-full"
                alt={user?.name}
              />
            ) : (
              <FaRegUserCircle />
            )}
          </div>
          <p className="capitalize text-lg font-semibold text-white">{user?.name}</p>
          <p className="text-sm text-white">{user?.role}</p>
        </div>

        {/***navigation */}
        <div>
          <nav className="grid p-4">
            <NavLink to={"all-users"} className={linkStyle}>
              All Users
            </NavLink>
            <NavLink to={"all-products"} className={linkStyle}>
              All Products
            </NavLink>
          </nav>
        </div>
      </aside>

      <main className="w-full h-full p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
