import React from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  const socialIconsList = [
    {
      icon: <FaFacebook />,
      href: "",
    },
    {
      icon: <FaInstagram />,
      href: "",
    },
    {
      icon: <FaYoutube />,
      href: "",
    },
  ];

  const renderSocialIconList = socialIconsList.map((items, id) => {
    return (
      <React.Fragment key={id}>
        <a
          href={items.href}
          className="text-gray-600 hover:text-amber-400 transition-colors duration-200"
        >
          {items.icon}
        </a>
      </React.Fragment>
    );
  });

  return (
    <footer className="border-t">
      <div className="container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-2">
        <p>© All Rights Reserved 2025.</p>
        <div className="flex items-center gap-4 justify-center text-2xl">
          {renderSocialIconList}
        </div>
      </div>
    </footer>
  );
}
