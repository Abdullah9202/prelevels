"use client"
import React, { use, useState } from "react";


export default function Page() {
  const [user, setuser] = useState()
  const [formData,setFormData] = useState({
    phoneNumber: '',
    password: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;
      setFormData({
        ...formData,
        [name]: value,
    });
    
  }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const res = await fetch('your link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formData
        })
      });

      const data = await res.json()
      if (res.ok) {
        console.log("server responded")
      }
      console.log(formData)
    };
    
    
    // return value

    return (
      <section className="w-full min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Phone</label>
            <input
              type="tel"
              name="phoneNumber"
              id="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="+92319"
              value={formData.phoneNumber}
              onChange={handleChange}
              
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
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
              Dont have an account? <a href="/auth/sign-up" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign Up here</a>
          </p>
        </form>
      </div>
    </section>
    )
  
  
  }
  


