import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import PostOwnerDetails from "./Posts/PostOwnerDetails";
import UserPostImages from "./Posts/UserPostImages";
import { FaSpinner } from "react-icons/fa";

function UserProfile() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="lg:text-4xl text-red-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content */}
      <div className="flex flex-col flex-grow min-h-[100vh] bg-[#edf5f0]">
        <PostOwnerDetails />
        <UserPostImages />
      </div>

      <div className="z-50">
        <Footer />
      </div>
    </div>
  );
}

export default UserProfile;
