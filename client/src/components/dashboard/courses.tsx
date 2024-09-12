import React from 'react';

const Courses = () => {
  return (
    <div className="mt-8 bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Your Courses</h2>
      <div className="grid grid-cols-3 gap-4">
        <CourseCard
          title="Complete Physiology Test"
          status="Active"
          btnText="Join Meeting"
        />
        <CourseCard
          title="Complete Cardiology Test"
          status="Active"
          btnText="Join Meeting"
        />
        <CourseCard
          title="Complete Pathology Test"
          status="Premium"
          btnText="Join Meeting"
        />
      </div>
    </div>
  );
};

const CourseCard = ({ title, status, btnText }: { title: string, status: string, btnText: string }) => (
  <div className="p-4 bg-gray-100 shadow-md rounded-lg">
    <img src="https://via.placeholder.com/150" alt="Course" className="w-full h-32 object-cover rounded-md" />
    <h3 className="mt-2 font-bold">{title}</h3>
    <p className="text-sm text-gray-500">{status}</p>
    <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md">{btnText}</button>
  </div>
);

export default Courses;
