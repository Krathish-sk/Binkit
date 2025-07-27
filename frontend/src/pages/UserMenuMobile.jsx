import React from "react";
import { IoClose } from "react-icons/io5";

import UserMenu from "../components/UserMenu";

export default function UserMenuMobile() {
  return (
    <section className="bg-white h-full w-full py-4">
      <button
        className="text-neutral-800 block w-fit ml-auto mr-1"
        onClick={() => window.history.back()}
      >
        <IoClose size={25} />
      </button>
      <div className="container mx-auto px-3 pb-8">
        <UserMenu />
      </div>
    </section>
  );
}
