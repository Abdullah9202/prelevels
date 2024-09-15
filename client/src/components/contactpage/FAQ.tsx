"use client";
import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpen(open === index ? null : index);
  };

  const faqs = [
    {
      question: "Le santon de espunera manos?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac libero sed mi elementum mattis. Donec facilisis.",
    },
    {
      question: "Lioko lam se de nora leortoan?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac libero sed mi elementum mattis. Donec facilisis.",
    },
    {
      question: "Diamo laner se kann` de lora ma?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac libero sed mi elementum mattis. Donec facilisis.",
    },
    {
      question: "Lorem ipsum dolor sir amet?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac libero sed mi elementum mattis. Donec facilisis.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-16 px-6 lg:px-16 ">
      <div className="lg:flex lg:space-x-16">
        <div className="lg:w-1/2">
          <h2 className="text-gray-900 text-sm font-medium">FAQ</h2>
          <h1 className="text-4xl font-bold text-gray-900">
            Frequently <br />
            asked <br />{" "}
            <span className="relative inline-block">
              <span className="relative z-10">questions.</span>
              <span className="absolute -bottom-1.5 left-0 w-full h-2 bg-yellow-300 rotate-2"></span>
            </span>
          </h1>
        </div>
        <div className="lg:w-1/2 mt-8 lg:mt-0">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-6">
              <button
                onClick={() => toggle(index)}
                className="flex justify-between items-center w-full text-left text-gray-900 font-semibold focus:outline-none"
              >
                <span>{faq.question}</span>
                <span className="ml-4">
                  {open === index ? (
                    <FiMinus className="text-red-600" />
                  ) : (
                    <FiPlus className="text-red-600" />
                  )}
                </span>
              </button>
              {open === index && (
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              )}
              <hr className="mt-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
