import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { IoSearch } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa6";

import useMobile from "../hooks/useMobile";

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isMobile] = useMobile();

  useEffect(() => {
    setIsSearchPage(location.pathname === "/search");
  }, [location]);

  const redirectToPage = (page) => {
    navigate(page);
  };

  return (
    <div className="w-full min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-amber-400 duration-100">
      {isMobile && isSearchPage ? (
        <Link
          to={"/"}
          className="flex justify-center items-center h-full p-2 m-1 hover:cursor-pointer group-focus-within:text-amber-400 bg-transparent rounded-full duration-100"
        >
          <FaArrowLeft size={20} />
        </Link>
      ) : (
        <Link
          to="/search"
          className="flex justify-center items-center h-full p-3 hover:cursor-pointer group-focus-within:text-amber-400 duration-100"
        >
          <IoSearch size={22} />
        </Link>
      )}
      <div className="w-full h-full">
        {isSearchPage ? (
          // When inside Search Page
          <div className="w-full h-full">
            <input
              type="text"
              placeholder="Search for aata dal and more"
              autoFocus
              className="w-full h-full bg-transparent outline-none"
            />
          </div>
        ) : (
          // When not in Search Page
          <div
            onClick={() => redirectToPage("search")}
            className="w-full h-full flex items-center hover:cursor-pointer"
          >
            <TypeAnimation
              sequence={[
                'Search "milk"',
                2000,
                'Search "bread"',
                2000,
                'Search "sugar"',
                2000,
                'Search "eggs"',
                2000,
                'Search "fruits"',
                2000,
                'Search "rice"',
                2000,
                'Search "veggies"',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
        )}
      </div>
    </div>
  );
}
