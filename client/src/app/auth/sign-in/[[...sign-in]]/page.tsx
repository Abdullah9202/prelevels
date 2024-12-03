"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../../../../../hooks/useUser";
import { useSignIn } from "../../../../../hooks/userSignedIn";
import { usePasswordStore } from "../../../../../hooks/usePassword";


export default function Page() {
  const router = useRouter();
  // const [user, setuser] = useState();
  const [formData, setFormData] = useState({
    phone_number: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const password = usePasswordStore.getState().setPassword(formData.password);
  console.log(password);

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customuser/login/`, { // AZAK
  //     // AZAK
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(formData),
  //   });

  //   const data = await res.json();
  //   if (res.ok) {
  //     useUser.getState().setUser(data);
  //     router.push("/");
  //     useSignIn.getState().setSignedIn(true);
  //     console.log("server responded");
  //   }
  //   console.log(formData);
  // };

  const handleSubmitButton = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      useUser.getState().setUser(data?.user_data);
      useSignIn.getState().setSignedIn(true);

      router.push("/");
      console.log("server responded", data);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  // return value

  return (
    <section className="w-full min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Login
        </h1>
        <form onSubmit={handleSubmitButton} className="space-y-6">
          <div>
            <label
              htmlFor="phone_number"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Phone number
            </label>
            <input
              type="tel"
              name="phone_number"
              id="phone_number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="+92XXXXXXXXXX"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Login
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Dont have an account?{" "}
            <a
              href="/auth/sign-up"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Sign Up here
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
