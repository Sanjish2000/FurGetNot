import Header from "./Header";
import { Mail, Phone, Clock } from "lucide-react";

function ContactUs() {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full text-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Us</h2>

          {/* Phone */}
          <div className="flex items-center justify-between border-b py-3">
            <div className="flex items-center space-x-3">
              <Phone className="text-green-600" />
              <span className="font-medium text-gray-700">Phone</span>
            </div>
            <a
              href="tel:+917000667878"
              className="text-blue-600 hover:underline font-semibold"
            >
              +91-7000667878
            </a>
          </div>

          {/* Email */}
          <div className="flex items-center justify-between border-b py-3">
            <div className="flex items-center space-x-3">
              <Mail className="text-red-600" />
              <span className="font-medium text-gray-700">Email</span>
            </div>
            <a
              href="mailto:chouhansanjish@gmail.com"
              className="text-blue-600 hover:underline font-semibold"
            >
              chouhansanjish@gmail.com
            </a>
          </div>

          {/* Working Hours */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-3">
              <Clock className="text-yellow-600" />
              <span className="font-medium text-gray-700">Working Hours</span>
            </div>
            <span className="text-gray-600 text-sm text-right">
              Mon - Fri <br />
              9:00 AM - 1:00 PM <br />
              4:00 PM - 8:00 PM
            </span>
          </div>
        </div>
      </div>

      {/* Developer Info Section */}
      <div className="bg-gray-50 py-4 text-center fixed right-0 left-0 bottom-0 ">
        <p className="text-gray-500 text-sm">
          This site is developed and managed by{" "}
          <span className="font-semibold text-orange-600">WobbleLab</span>
        </p>
      </div>
    </>
  );
}

export default ContactUs;
