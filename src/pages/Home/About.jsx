import React from 'react';

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold mb-4">About eTutionbd</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          eTutionbd is a modern tuition management platform designed to connect
          students and tutors through a single, easy-to-use system.
        </p>
      </div>

      {/* Content Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            A Complete Tuition Management Solution
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            eTutionbd simplifies the process of finding and managing tuition.
            Students can post tuition requirements, while tutors can browse
            available tuitions and apply directly through the platform.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our goal is to create a transparent and efficient system where
            students find the right tutors and tutors get access to genuine
            tuition opportunities — all in one place.
          </p>
        </div>

        {/* Features */}
        <div className="grid gap-6">
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h3 className="font-semibold text-lg">For Students</h3>
              <p className="text-gray-600">
                Post tuition needs, review tutor applications, and select the
                best tutor with ease.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h3 className="font-semibold text-lg">For Tutors</h3>
              <p className="text-gray-600">
                Find suitable tuition opportunities, apply instantly, and grow
                your teaching career.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h3 className="font-semibold text-lg">Secure & Reliable</h3>
              <p className="text-gray-600">
                A trusted system with role-based access, secure authentication,
                and smooth communication.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="mt-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Our mission is to bridge the gap between students and tutors by
          providing a reliable, efficient, and user-friendly tuition management
          platform that benefits everyone.
        </p>
      </div>
    </div>
  );
};

export default About;
