import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import PostOwnerDetails from "./Posts/PostOwnerDetails";
import UserPostImages from "./Posts/UserPostImages";

function UserProfile() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading state for user content
    const timer = setTimeout(() => setIsLoaded(true), 1000); // show footer after 1s
    return () => clearTimeout(timer);
  }, []);

  const hideLayout = ["/login", "/register"].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content */}
      <div className="flex flex-col flex-grow min-h-[100vh]">
        <PostOwnerDetails />
        <UserPostImages />
      </div>

      {/* Footer appears only after content is loaded */}
      {!hideLayout && (
        <div
          className={`z-50 bottom-0 left-0 w-full transition-opacity duration-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <Footer />
        </div>
      )}
    </div>
  );
}

export default UserProfile;
