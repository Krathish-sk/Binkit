import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsCart4 } from "react-icons/bs";
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";
import { useSelector } from "react-redux";

import useMobile from "../hooks/useMobile";
import Logo from "../assets/BinkitLogo.png";
import Search from "./Search";
import UserMenu from "./UserMenu";

export default function Header() {
  const [isMobile] = useMobile();
  const { pathname } = useLocation();
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const isSearchPage = pathname === "/search";
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);

  const redirectToLoginPage = () => {
    navigate("/login");
  };

  const handleCloseMenu = () => {
    setOpenUserMenu(false);
  };

  const handleMobileUser = () => {
    if (!user._id) {
      navigate("/login");
      return;
    }
    navigate("/user");
  };

  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-0 flex flex-col justify-center gap-1 bg-white">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center px-2 justify-between">
          {/**Logo */}
          <div className="h-full">
            <Link to={"/"} className="h-full flex justify-center items-center">
              <img
                className="hidden lg:block"
                src={Logo}
                alt="Logo"
                width="170"
                height={60}
              />
              <img
                className="lg:hidden"
                src={Logo}
                alt="Logo"
                width="170"
                height={60}
              />
            </Link>
          </div>

          {/**Search */}
          <div className="hidden lg:block">
            <Search />
          </div>

          {/**Login and my cart */}
          <div className="">
            {/* user icons display in only mobile version */}
            <button
              className="text-neutral-600 lg:hidden"
              onClick={handleMobileUser}
            >
              <FaRegCircleUser size={26} />
            </button>
            {/* Desktop */}
            <div className="hidden lg:flex items-center gap-10">
              {user?._id ? (
                <div className="relative">
                  <div
                    onClick={() => setOpenUserMenu((prev) => !prev)}
                    className="select-none flex items-center gap-1 hover:cursor-pointer"
                  >
                    <p>Account</p>
                    {openUserMenu ? (
                      <GoTriangleUp size={25} />
                    ) : (
                      <GoTriangleDown size={25} />
                    )}
                  </div>
                  {openUserMenu && (
                    <div className="absolute right-0 top-10">
                      <div className="bg-white rounded p-4 min-w-52 lg:shadow-lg ">
                        <UserMenu close={handleCloseMenu} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  className="cursor-pointer text-lg px-2"
                  onClick={redirectToLoginPage}
                >
                  Login
                </button>
              )}
              <button className="flex items-center gap-2 px-4 py-3 rounded text-white bg-green-800 hover:bg-green-700 cursor-pointer">
                {/* Add to Cart Icon */}
                <div className="animate-bounce">
                  <BsCart4 size={26} />
                </div>
                <div className="font-semibold">
                  <p>1 Item</p>
                  <p>Total Price</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
      {/** Serach tab in case of Mobile mode */}
      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
}
