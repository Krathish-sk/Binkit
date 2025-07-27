import React from "react";
import UserMenu from "../components/UserMenu";

export default function Dashboard() {
  return (
    <section className="bg-white min-h-screen">
      <div className="conatiner mx-auto p-3 grid grid-cols-[250px_auto] min-h-screen">
        {/* Left for menu */}
        <div className="py-4 sticky top-24 overflow-y-auto hidden lg:block">
          <UserMenu />
        </div>
        {/* Right for content */}
        <div className="bg-white p-4">content display</div>
      </div>
    </section>
  );
}
