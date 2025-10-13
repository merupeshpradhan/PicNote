import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import PostOwnerDetails from "./Posts/PostOwnerDetails";
import UserPostImages from "./Posts/UserPostImages";

function UserProfile() {

  const hideLayout = ["/login", "/register"].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content */}
      <div className="flex flex-col flex-grow min-h-[100vh]">
        <PostOwnerDetails />
        <UserPostImages />
      </div>
       {!hideLayout && <div className="z-50"><Footer /></div>}
    </div>
  );
}

export default UserProfile;
