import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsCart4 } from "react-icons/bs";

import useMobile from "../hooks/useMobile";
import Logo from "../assets/BinkitLogo.png";
import Search from "./Search";

export default function Header() {
  const [isMobile] = useMobile();
  const { pathname } = useLocation();
  const isSearchPage = pathname === "/search";
  const navigate = useNavigate();

  const redirectToLoginPage = () => {
    navigate("/login");
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
            <button className="text-neutral-600 lg:hidden">
              <FaRegCircleUser size={26} />
            </button>
            {/* Desktop */}
            <div className="hidden lg:flex items-center gap-10">
              <button
                className="cursor-pointer text-lg px-2"
                onClick={redirectToLoginPage}
              >
                Login
              </button>
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
