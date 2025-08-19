import React, { useState } from "react";
import { Link } from "react-router-dom";
import landing_image from "../../assets/Images/landing_image2.png";
import Footer from "../../components/Footer.jsx";
import Lottie from "lottie-react";
import lottieFile from "../../assets/aminmation/Animation - 1751788086444.json";
import lottiefile2 from "../../assets/aminmation/landing_animation.json";
import Registor from "../Auth/Registor.jsx";
import Login from "../Auth/Login.jsx";
// import './modal.css'; // ✅ adjust path if it's in another folder

function Landing() {
  const [registrationmdaol, setregistrationmdaol] = useState(false);
  const [loginmodal, setloginmodal] = useState(false);

  return (
    <>
      {/* Hero Section */}
      <div className="bg-orange-200 relative flex flex-col md:flex-row items-center justify-between p-6">
        <div>
          <div className="absolute w-40 h-40 md:w-55 md:h-55 md:scale-x-[-1] md:rotate-70 rotate-200">
            <Lottie
              animationData={lottieFile}
              loop
              autoplay
              className="w-full h-full"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 z-10 md:w-1/2">
        <h1 className="text-3xl md:text-5xl font-bold text-orange-900">FurGetNot 🐾</h1>
          <h1 className="text-2xl md:text-4xl font-bold text-orange-900">
            Never forget your furry friend's care needs again
          </h1>
          <p className="text-lg text-gray-700">
            Caring for your pets, made simple.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => setregistrationmdaol(true)}
              className="bg-amber-700 text-white px-6 py-3 rounded-xl hover:rounded-3xl hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 md:hover:bg-amber-900"
            >
              Register Now!
            </button>

            <button
              onClick={() => setloginmodal(true)}
              className="bg-green-800 text-white px-6 py-3 rounded-xl hover:rounded-3xl hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 md:hover:bg-green-900"
            >
              Login
            </button>
          </div>
        </div>

        <Registor
          isOpen={registrationmdaol}
          onClose={() => setregistrationmdaol(false)}
        />
        <Login isOpen={loginmodal} onClose={() => setloginmodal(false)} />

        <div className="relative md:w-1/2 mt-6 md:mt-0">
          <img
            src={landing_image}
            alt="pets"
            className="w-200 md:h-100  mix-blend-multiply opacity-90 rounded-xl "
          />
          <div className="absolute md:top-4 md:right-4 md:w-65 md:h-65 md:scale-x-[-1] w-45 h-45 md:rotate-250 rotate-30">
            <Lottie
              animationData={lottieFile}
              loop
              autoplay
              className="w-full h-full"
            />
          </div>
          <hr className="my-10 w-3/4 mx-auto border-t-2 border-gray-300" />
        </div>
      </div>

      {/* Features */}
      <div className="bg-orange-100 py-5">
        <h2 className="text-3xl font-semibold text-orange-900 text-center mb-15 pt-10">
          Key Features
        </h2>
        <ul className="flex flex-wrap justify-center items-center gap-7 pb-15">
          {[
            "🐶 Add & Manage Pets",
            "💉 Vaccination Reminders",
            "📈 We Provide Pet Foods Store",
            "🩺 Health & Vet Logs",
            "🔔 Push/Email Alerts",
          ].map((feature, index) => (
            <li
              key={index}
              className="bg-white text-gray-800 rounded-3xl shadow-lg px-6 py-4 text-md text-center w-64"
            >
              {feature}
            </li>
          ))}
        </ul>
        <hr className="w-3/5 mx-auto border-t-2 border-orange-200" />
      </div>

      {/* Why Section */}
      <div className="bg-orange-100">
        <h2 className="text-3xl font-semibold text-orange-900 text-center mb-8 pt-5">
          Why FurGetNot?
        </h2>
        <ul className="flex flex-col items-center gap-3 text-lg text-gray-700 pb-10">
          <li>✅ Secure and Reliable</li>
          <li>✅ Easy to Use</li>
          <li>✅ Designed for Pet Parents</li>
        </ul>
        <hr className="w-3/6 mx-auto border-t-2 border-orange-200" />
      </div>

      {/* Testimonials */}
      <div className="bg-orange-100 py-16">
        <h2 className="text-3xl font-semibold text-orange-900 text-center mb-8">
          What Pet Parents Say
        </h2>
        <div className="flex flex-wrap justify-center gap-6 px-4 pt-5">
          {[
            `"FurGetNot helped me never miss my dog's vaccine again!"`,
            `"Perfect app for managing my 3 cats' health!"`,
            `"The reminders are life-saving. Highly recommended!"`,
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-md p-6 w-80 text-center text-gray-600 italic"
            >
              {testimonial}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Lottie */}
      <div className="fixed bottom-0 -right-8 md:w-40 md:h-40 z-50 w-30 h-30">
        <Lottie
          animationData={lottiefile2}
          loop
          autoplay
          className="w-full h-full"
        />
      </div>

      <Footer />
    </>
  );
}

export default Landing;
