"use client";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Caveat, Chakra_Petch, Cinzel, Satisfy } from "next/font/google";
import { IoCartSharp } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { IoMdArrowRoundForward } from "react-icons/io";
import Feedback from "./Feeback";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import MainSection from "./MainSection";

interface SpecialMenu {
  id: number;
  food: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  popular: string;
  image_url: string;
}

const caveat = Caveat({ weight: "600", subsets: ["latin"] });
const satisfy = Satisfy({ weight: "400", subsets: ["latin"] });
const chakra_petch = Chakra_Petch({ weight: "700", subsets: ["latin"] });
const cinzel = Cinzel({ weight: "800", subsets: ["latin"] });

const Food = () => {
  const [menu, setMenu] = useState<SpecialMenu[]>([]);
  const [filteredMenu, setFilteredMenu] = useState<SpecialMenu[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { user } = useUser();

  const addHandleMultipleFunction = () => {
    const now = new Date();
    const formattedDateTime = `${now.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })} at ${now.toLocaleTimeString()}`;

    toast("Your order has been Added", {
      description: formattedDateTime,
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
  };

  const subHandleMultipleFunction = () => {
    const now = new Date();
    const formattedDateTime = `${now.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })} at ${now.toLocaleTimeString()}`;

    toast("Your order has been Removed", {
      description: formattedDateTime,
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
  };

  useEffect(() => {
    const fetchMenu = async () => {
      const response = await fetch("/api/special-menu");
      const data = await response.json();
      setMenu(data);
      setFilteredMenu(data);
      setLoading(false);
    };

    fetchMenu();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = menu.filter((item) =>
      item.food.toLowerCase().includes(query)
    );
    setFilteredMenu(filtered);
  };

  const toggleSearch = () => {
    setIsExpanded((prev) => !prev);
  };

  const slides = [
    { id: 1, image: "/weekly-images/slider01.png", url: "/weekly-menu" },
    { id: 2, image: "/weekly-images/slider02.png", url: "/special-menu" },
    { id: 3, image: "/weekly-images/slider03.png", url: "/our-menu" },
    { id: 4, image: "/weekly-images/slider04.png", url: "/" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const goToPreviousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen px-4 w-full">
      <div className="flex justify-end items-center gap-2 fixed z-10 pr-10 md:pr-12 bg-opacity-10 backdrop-blur-md py-3  bg-darkpeach h-max w-full">
          <div
            className={`flex items-center duration-300 transition-all pr-2 py-1 rounded-xl ${
              isExpanded ? " bg-[#f0d5a6]" : "w-max"
            }`}
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              className={`ml-2 rounded px-3 py-1 transition-all duration-300 focus:outline-none bg-[#f0d5a6] text-[#8f613c] ${
                caveat.className
              } ${isExpanded ? "w-48 md:w-72 opacity-100" : "w-0 opacity-0"}`}
            />
            <FaSearch
              onClick={toggleSearch}
              size={24}
              className="text-[#8f613c] hover:text-[#744732] hover:scale-125 duration-200 transition-all cursor-pointer ml-2 mr-2"
            />
          </div>
          <Link
            href={user ? "/cart" : "/sign-in"}
            className="w-max cursor-pointer  text-[#8f613c] hover:text-[#744732] hover:scale-125 duration-200 transition-all"
          >
            <div className="w-4 h-4 flex justify-center items-center bg-[#e9b966] rounded-full fixed ml-4 -mt-0.5 border border-[#744732]">
              <span
                className={`text-xs text-[#744732] fixed ${chakra_petch.className}`}
              >
                0
              </span>
            </div>
            <IoCartSharp size={28} />
          </Link>
        </div>
      <div className="flex flex-col w-full ml-2 md:ml-14">
        <div>
          <MainSection />
        </div>

        

        <div className="relative max-w-full overflow-hidden top-20 rounded-xl">
          <div
            className="relative w-full flex transition-transform duration-500 rounded-md"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="w-full h-80 flex-shrink-0 flex items-center justify-center rounded-md"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <Link
                  href={`${slide.url}`}
                  className="text-sm absolute top-[40%] right-[30%] md:right-[40%] button-hover-effect bg-transparent rounded-full"
                >
                  <span className="px-4"> Check now</span>
                </Link>
              </div>
            ))}
          </div>

          <button
            onClick={goToPreviousSlide}
            className="absolute w-10 h-10 top-1/2 left-2 rotate-180 flex justify-center items-center -translate-y-1/2 bg-[#8f592d] bg-opacity-50 duration-150 transition text-white p-2 rounded-full hover:bg-opacity-75"
          >
            <IoMdArrowRoundForward />
          </button>

          <button
            onClick={goToNextSlide}
            className="absolute w-10 h-10 top-1/2 right-2 flex justify-center items-center -translate-y-1/2 bg-[#8f592d] bg-opacity-50 duration-150 transition text-white p-2 rounded-full hover:bg-opacity-75"
          >
            <IoMdArrowRoundForward />
          </button>

          <div className="absolute flex justify-center items-center bottom-4 right-5 space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`border-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-darkorange w-3 h-3 border-darkpeach"
                    : "bg-peach w-2 h-2 border-darkpeach"
                }`}
              ></button>
            ))}
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2`"></div>

        <div className="flex flex-col items-center w-full mt-40">
          <h1
            className={`text-4xl font-bold text-center mb-8 text-[#8f613c] relative z-10 ${chakra_petch.className}`}
          >
            Special Menu
          </h1>

          {loading ? (
            <div className="w-full flex justify-center items-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-4xl">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-between items-center max-w-sm rounded-xl shadow-lg bg-[#8f613c] animate-pulse"
                  >
                    <div className="w-full h-56 bg-[#e9b966] rounded-t-lg"></div>

                    <div className="p-4 w-full">
                      <div className="w-3/4 h-6 bg-[#e1d3b6] rounded mb-2"></div>
                      <div className="w-full h-4 bg-[#e9b966] rounded mb-2"></div>
                      <div className="flex items-center justify-between mt-5">
                        <div className="w-1/3 h-6 bg-[#e1d3b6] rounded"></div>
                        <div className="w-1/4 h-6 bg-[#e9b966] rounded"></div>
                      </div>
                      <div className="flex -space-x-1 w-full mt-4">
                        <div className="w-1/3 h-10 bg-[#e9b966] rounded-l-xl"></div>
                        <div className="w-1/3 h-10 bg-[#e1d3b6]"></div>
                        <div className="w-1/3 h-10 bg-[#e9b966] rounded-r-xl"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full flex justify-center items-center slide-in-bottom">
              {filteredMenu.length > 0 ? (
                <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-4xl">
                  {filteredMenu.slice(0, 8).map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col slide-in-bck-center justify-between items-center max-w-sm rounded-xl shadow-lg bg-white transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                    >
                      <div className="bg-[#7e502b] absolute top-2 right-2 text-white px-2 py-1 rounded-full text-xs">
                        <span className={`${chakra_petch.className}`}>
                          {" "}
                          {item.popular}
                        </span>
                      </div>
                      <Image
                        className="w-full h-56 object-cover rounded-t-lg"
                        src={item.image_url}
                        alt={item.food}
                        width={1000}
                        height={1000}
                      />

                      <div className="p-4">
                        <h3
                          className={`text-xl font-extrabold ${satisfy.className}`}
                        >
                          {item.food}
                        </h3>
                        <p
                          className={`text-gray-600 text-sm mt-1 line-clamp-3 ${satisfy.className}`}
                        >
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between mt-5">
                          <span
                            className={`flex items-center font-extrabold text-lg ${satisfy.className}`}
                          >
                            Rs {item.price}
                          </span>
                          <span className="text-lg font-bold">
                            {item.rating}/5 ⭐
                          </span>
                        </div>
                        <div className="flex -space-x-1 w-full">
                          <button
                            onClick={subHandleMultipleFunction}
                            className="mt-4 button-hover-effect w-full rounded-l-xl"
                          >
                            <span
                              className={`${cinzel.className} relative left-[40%]`}
                            >
                              <FaMinus size={20} />
                            </span>
                          </button>

                          <button className="mt-4 border-4 border-[#8f613c] w-full">
                            <span
                              className={`${cinzel.className} text-md lg:text-sm text-[#8f613c]`}
                            >
                              Items
                            </span>
                          </button>

                          <button
                            onClick={addHandleMultipleFunction}
                            className=" mt-4 button-hover-effect  rounded-r-xl w-full"
                          >
                            <span
                              className={`${cinzel.className} relative left-[40%]`}
                            >
                              <FaPlus size={20} />
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-600 text-lg">
                  No items match from the search.
                </p>
              )}
            </div>
          )}

          <Link
            href={"/special-menu"}
            className="text-sm button-hover-effect mt-10 mb-20 w-32 bg-transparent rounded-full"
          >
            <span
              className={`flex justify-center items-center gap-2 ${cinzel.className}`}
            >
              See More <IoMdArrowRoundForward />
            </span>
          </Link>
        </div>

        <div>
          <Feedback />
        </div>
      </div>
    </div>
  );
};

export default Food;