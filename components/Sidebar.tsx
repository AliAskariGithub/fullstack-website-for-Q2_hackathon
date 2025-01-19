"use client";
import Link from "next/link";
import { useState } from "react";
import { FaHome, FaInfoCircle } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { UserButton } from "@clerk/nextjs";
import { useAuth, useUser } from "@clerk/clerk-react";
import { FaPowerOff } from "react-icons/fa";
import { FiSidebar } from "react-icons/fi";
import { Caveat } from "next/font/google";
import { RiFilePaper2Line } from "react-icons/ri";
import { MdOutlineHistory } from "react-icons/md";

const caveat = Caveat({ weight: "600", subsets: ["latin"] });

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { userId } = useAuth();
  const { user } = useUser();

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div>
      <FiSidebar
        onClick={toggleSidebar}
        size={20}
        className={`fixed top-5 z-50 cursor-pointer duration-150 transition-all text-[#8f613c] ${
          isExpanded ? "left-[182px] " : "md:left-[70px] left-6"
        }`}
      />

      <div
        className={`flex flex-col h-full  z-20 bg-[#e9b966] md:px-4 md:pr-10 fixed top-0 left-0 overflow-hidden duration-200 transition-all ${
          isExpanded ? "w-44 px-4" : "w-3 "
        }`}
      >
        <div
          className={`flex items-center justify-start mt-4 mb-8 h-max w-full ${
            isExpanded
              ? "md:opacity-100 opacity-100"
              : "md:opacity-100 opacity-0"
          }`}
        >
          {userId ? (
            <div className="flex justify-center items-center gap-2">
              <div className="border border-white rounded-full w-8 h-8 flex justify-center items-center">
                <UserButton />
              </div>
              <div className="flex flex-col justify-center items-start -space-y-2">
                <span
                  className={`flex justify-center items-center w-max  ${
                    caveat.className
                  } ${isExpanded ? "block" : "hidden"}`}
                >
                  Welcome
                </span>
                <span
                  className={`flex justify-center items-center w-max font-extrabold text-xl ${
                    caveat.className
                  } ${isExpanded ? "block" : "hidden"}`}
                >
                  {user?.fullName}
                </span>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 bg-white/50 rounded-full animate-pulse">
              <span className="opacity-0">image</span>
            </div>
          )}
        </div>

        <ul
          className={`flex flex-col gap-4 justify-center items-start  ${
            isExpanded
              ? "md:opacity-100 opacity-100"
              : "md:opacity-100 opacity-0"
          }`}
        >
          <Link
            href={"/"}
            className="flex justify-center items-center gap-2 hover:scale-125 text-[#8f613c] hover:text-[#744732] duration-200 transition"
          >
            <FaHome size={22} />
            {isExpanded && (
              <span
                onClick={toggleSidebar}
                className={`${caveat.className} hover:underline-effect text-xl hover:font-bold`}
              >
                Home
              </span>
            )}
          </Link>

          <Link
            href={"/about"}
            className="flex justify-center items-center gap-2 hover:scale-125 text-[#8f613c] hover:text-[#744732] duration-200 transition"
          >
            <FaInfoCircle size={22} />
            {isExpanded && (
              <span
                onClick={toggleSidebar}
                className={`${caveat.className} hover:underline-effect text-xl hover:font-bold `}
              >
                About
              </span>
            )}
          </Link>

          <Link
            href={"/menu"}
            className="flex justify-center items-center gap-2 hover:scale-125 text-[#8f613c] hover:text-[#744732] duration-200 transition"
          >
            <RiFilePaper2Line size={22} />
            {isExpanded && (
              <span
                onClick={toggleSidebar}
                className={`${caveat.className} hover:underline-effect text-xl hover:font-bold `}
              >
                Menu
              </span>
            )}
          </Link>
          {userId ? (
            <Link
              href={"/order-history"}
              className="flex justify-center items-center gap-2 hover:scale-125 text-[#8f613c] hover:text-[#744732] duration-200 transition"
            >
              <MdOutlineHistory size={24} />
              {isExpanded && (
                <span
                  onClick={toggleSidebar}
                  className={`${caveat.className} hover:underline-effect text-xl hover:font-bold `}
                >
                  History
                </span>
              )}
            </Link>
          ) : (
            <Link
              href={"/sign-in"}
              className="flex justify-center items-center gap-2 hover:scale-125 text-[#8f613c] hover:text-[#744732] duration-200 transition"
            >
              <MdOutlineHistory size={24} />
              {isExpanded && (
                <span
                  onClick={toggleSidebar}
                  className={`${caveat.className} hover:underline-effect text-xl hover:font-bold `}
                >
                  History
                </span>
              )}
            </Link>
          )}
        </ul>

        {userId ? (
          <Link
            href={"/secure"}
            className={`absolute bottom-6 md:bottom-4 flex justify-center items-center gap-2 hover:scale-125 text-[#8f613c] hover:text-[#744732] duration-200 transition  ${
              isExpanded
                ? "md:opacity-100 opacity-100"
                : "md:opacity-100 opacity-0"
            }`}
          >
            <RiAdminFill size={22} />
            {isExpanded && (
              <button
                onClick={toggleSidebar}
                className={`${caveat.className} hover:underline-effect text-xl hover:font-bold `}
              >
                Admin Only
              </button>
            )}
          </Link>
        ) : (
          <Link
            href={"/sign-in"}
            className={`absolute bottom-6 md:bottom-4 flex justify-center items-center gap-2 hover:scale-125 text-[#8f613c] hover:text-[#744732] duration-200 transition  ${
              isExpanded
                ? "md:opacity-100 opacity-100"
                : "md:opacity-100 opacity-0"
            }`}
          >
            <FaPowerOff size={22} />
            {isExpanded && (
              <button
                onClick={toggleSidebar}
                className={`${caveat.className} hover:underline-effect text-xl hover:font-bold `}
              >
                Login
              </button>
            )}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
