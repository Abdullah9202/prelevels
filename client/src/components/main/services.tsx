import React from "react";
import { FaFlask } from "react-icons/fa";

const Service = () => {
  return (
    <section className="py-12 bg-gray-100">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-start lg:px-14 mb-8">What We Offer</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:px-14">
       {/* Feature 1  */}
      <div className="bg-[#D9D9D9] p-6 rounded-lg text-center">
        <div className="text-red-500 mb-4">
          {/* <!-- Red Icon (Example: Feather icon from react-feather library) -- */}
          <FaFlask size={30} />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-start">Live test</h3>
        <p className="text-gray-700 text-start text-sm">Register for the exam you want to appear.You can register in single click for the
          exam of your choice from dashboard.</p>
      </div>

      {/* <!-- Feature 2 --> */}
      <div className="bg-[#D9D9D9] p-6 rounded-lg text-center">
        <div className="text-red-500 mb-4">
          {/* <!-- Red Icon (Example: Feather icon from react-feather library) --> */}
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" className="bi bi-question-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94"/>
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2 text-start">High Yield Questions</h3>
        <p className="text-gray-700 text-start text-sm">Take live test on time,  you can take the
            missed test from dashboard. Live exam
            link appears only when the exam is live.</p>
      </div>

      {/* <!-- Feature 3 --> */}
      <div className="bg-[#D9D9D9] p-6 rounded-lg text-center">
        <div className="text-red-500 mb-4">
          {/* <!-- Red Icon (Example: Feather icon from react-feather library) --> */}
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" className="bi bi-bar-chart-line" viewBox="0 0 16 16">
            <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1zm1 12h2V2h-2zm-3 0V7H7v7zm-5 0v-3H2v3z"/>
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2 text-start">Insightful Analytics</h3>
        <p className="text-gray-700 text-start text-sm">Dashboard is true sense that help you
            analyze your performance. Everything
            you do at one place.</p>
      </div>
    </div>
  </div>
</section>

  );
};

export default Service;


