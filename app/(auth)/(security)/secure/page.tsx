"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Caveat, Chakra_Petch, Cinzel, Satisfy } from "next/font/google";

const caveat = Caveat({ weight: "600", subsets: ["latin"] });
const satisfy = Satisfy({ weight: "400", subsets: ["latin"] });
const chakra_petch = Chakra_Petch({ weight: "700", subsets: ["latin"] });
const cinzel = Cinzel({ weight: "800", subsets: ["latin"] });

const SecurePage = () => {
  const router = useRouter();

  const [answers, setAnswers] = useState({
    question1: "",
    question2: "",
    question3: "",
  });
  const [error, setError] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers({
      ...answers,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const key1 = process.env.NEXT_PUBLIC_CODE_KEY_1;
    const key2 = process.env.NEXT_PUBLIC_CODE_KEY_2;
    const key3 = process.env.NEXT_PUBLIC_CODE_KEY_3;

    if (
      answers.question1 === key1 &&
      answers.question2 === key2 &&
      answers.question3 === key3
    ) {
      router.push("/admin");
    } else {
      setError("Incorrect answers, try again!");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#e9b966] p-8 rounded-md shadow-lg w-96">
        <h2
          className={`text-3xl font-semibold text-center text-[#8f613c] mb-6 ${chakra_petch.className}`}
        >
          Secure Page
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 flex flex-col justify-center items-center w-full"
        >
          <div>
            <label
              htmlFor="question1"
              className={`${caveat.className} block text-lg font-medium text-black/70`}
            >
              - What is the secret key for the first question?
            </label>
            <input
              type="text"
              id="question1"
              name="question1"
              value={answers.question1}
              onChange={handleInputChange}
              className={`rounded px-3 py-1 transition-all duration-300 focus:outline-none bg-[#f0d5a6] text-[#8f613c] w-full opacity-100 ${satisfy.className}`}
            />
          </div>
          <div>
            <label
              htmlFor="question2"
              className={`${caveat.className} block text-lg font-medium text-black/70`}
            >
              - What is the secret key for the second question?
            </label>
            <input
              type="text"
              id="question2"
              name="question2"
              value={answers.question2}
              onChange={handleInputChange}
              className={`rounded px-3 py-1 transition-all duration-300 focus:outline-none bg-[#f0d5a6] text-[#8f613c] w-full opacity-100 ${satisfy.className}`}
            />
          </div>
          <div>
            <label
              htmlFor="question3"
              className={`${caveat.className} block text-lg font-medium text-black/70`}
            >
              - What is the secret key for the third question?
            </label>
            <input
              type="text"
              id="question3"
              name="question3"
              value={answers.question3}
              onChange={handleInputChange}
              className={`rounded px-3 py-1 transition-all duration-300 focus:outline-none bg-[#f0d5a6] text-[#8f613c] w-full opacity-100 ${satisfy.className}`}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full mt-6 button-hover-effect-border rounded-full"
          >
            <span className={`${cinzel.className}`}>Unlock Admin</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SecurePage;
