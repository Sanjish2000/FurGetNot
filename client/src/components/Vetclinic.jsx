import React from "react";
import Header from "./Header";
import Vet from "../assets/Images/vet.png";

const Vetclinic = () => {
  const clinicDetails = {
    name: "ॐ Veterinary Pet Clinic & Home visit",
    address:
      "Kishor kirti kala bhawan, Street 33, Sector 7, Bhilai, Chhattisgarh 490020, India",
    phone: "+91 97527 47774",
    rating: "⭐ 4.5 / 5",
    review:
      "My cat was unable to walk properly, I was extremely worried, but Dr Akash's expertise and guidance have made a significant difference in his recovery. His prescribed medications worked remarkably well.",
    openingHours: [
      { day: "Monday", hours: "7:30 AM - 10:30 PM" },
      { day: "Tuesday", hours: "7:30 AM - 10:30 PM" },
      { day: "Wednesday", hours: "7:30 AM - 10:30 PM" },
      { day: "Thursday", hours: "5:30 AM - 10:30 PM" },
      { day: "Friday", hours: "7:30 AM - 10:30 PM" },
      { day: "Saturday", hours: "7:30 AM - 10:30 PM" },
      { day: "Sunday", hours: "7:30 AM - 10:30 PM" },
    ],
    mapUrl:
      "https://maps.google.com/maps?q=ॐ+Veterinary+Pet+Clinic+&_Home+visit+Bhilai&output=embed",
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen font-sans antialiased text-gray-800">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Title */}
        {/* Title Section with Background Image */}
        <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-lg mb-10">
          <img
            src={Vet}
            alt="Vet Clinic"
            className="w-full h-full object-cover mix-blend-multiply"
          />
          <h1 className="absolute inset-0 flex items-center justify-center text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg text-center px-4">
            {clinicDetails.name}
          </h1>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Clinic Info */}
          <section className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col justify-between">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">
              Clinic Info
            </h2>
            <div className="space-y-3">
              <p>
                <span className="font-medium text-gray-600">📍 Address:</span>{" "}
                {clinicDetails.address}
              </p>
              <p>
                <span className="font-medium text-gray-600">📞 Phone:</span>{" "}
                <a
                  href={`tel:${clinicDetails.phone}`}
                  className="text-blue-500 hover:underline"
                >
                  {clinicDetails.phone}
                </a>
              </p>
              <p>
                <span className="font-medium text-gray-600">⭐ Rating:</span>{" "}
                {clinicDetails.rating}
              </p>
              <div>
                <h3 className="font-medium text-gray-600 mb-2">
                  ⏰ Opening Hours:
                </h3>
                <ul className="space-y-1 text-sm">
                  {clinicDetails.openingHours.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between border-b border-gray-100 pb-1"
                    >
                      <span>{item.day}</span>
                      <span className="text-gray-700">{item.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Review Section */}
          <section className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 lg:col-span-2 flex flex-col justify-between">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">
              Customer Review
            </h2>
            <blockquote className="text-lg italic text-gray-700 leading-relaxed relative">
              <span className="text-5xl text-blue-200 absolute -top-4 left-0">
                “
              </span>
              {clinicDetails.review}
              <span className="text-5xl text-blue-200 absolute -bottom-6 right-0">
                ”
              </span>
            </blockquote>
            <p className="mt-6 text-right text-sm text-gray-500">
              - A Happy Pet Owner 🐾
            </p>
          </section>
        </div>

        {/* Map Section */}
        <section className="mt-10 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">
            Location Map
          </h2>
          <div className="rounded-xl overflow-hidden shadow-md">
            <iframe
              title="Clinic Location"
              src={clinicDetails.mapUrl}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-xl"
            ></iframe>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Vetclinic;
