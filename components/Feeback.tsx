"use client";

import React, { useEffect, useState } from "react";
import { IoMdArrowRoundForward } from "react-icons/io";

const feedbacks = [
  {
    name: "John Doe",
    review: "The food was absolutely amazing! Highly recommend the pizza.",
    rating: "⭐⭐⭐⭐⭐",
  },
  {
    name: "Jane Smith",
    review: "The service was excellent, and the ambiance was great.",
    rating: "⭐⭐⭐⭐⭐",
  },
  {
    name: "Michael Brown",
    review: "I loved the pasta, but the dessert stole the show!",
    rating: "⭐⭐⭐⭐⭐",
  },
  {
    name: "Emily Davis",
    review: "Good food, but the wait time was a bit long.",
    rating: "⭐⭐⭐⭐",
  },
  {
    name: "Chris Wilson",
    review: "Affordable prices and delicious meals. Will visit again!",
    rating: "⭐⭐⭐⭐⭐",
  },
  {
    name: "Sophia Johnson",
    review: "A wonderful dining experience with family. Loved it!",
    rating: "⭐⭐⭐⭐⭐",
  },
];

const Feedback = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % feedbacks.length);
  };

  const goToPreviousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? feedbacks.length - 1 : prevIndex - 1
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
    <div className="flex flex-col items-center gap-6 p-6 relative bg-gray-50 rounded-lg shadow-md">
      {/* Top Header */}
      <div className="flex justify-between w-full items-center">
        <h1 className="text-2xl font-bold text-gray-800">Feedback</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          onClick={() => alert("Feedback button clicked!")}
        >
          Feedback
        </button>
      </div>

      {/* Feedback Slider */}
      <div className="relative w-full max-w-xl overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {feedbacks.map((feedback, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full text-center p-4 bg-white rounded-lg shadow-lg"
            >
              <p className="text-lg italic text-gray-700">{feedback.review}</p>
              <h3 className="mt-4 text-xl font-bold text-gray-900">
                - {feedback.name}
              </h3>
              <p className="text-yellow-500 mt-2">{feedback.rating}</p>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={goToPreviousSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300"
        >
          <IoMdArrowRoundForward className="rotate-180" />
        </button>
        <button
          onClick={goToNextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300"
        >
          <IoMdArrowRoundForward />
        </button>
      </div>

      {/* Indicators */}
      <div className="flex justify-center space-x-2 mt-4">
        {feedbacks.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex
                ? "bg-blue-600"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
