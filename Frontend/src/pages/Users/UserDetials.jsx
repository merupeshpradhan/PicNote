import React, { useEffect, useState } from "react";

function UserDetials() {
  const [userDetials, setUserDetials] = useState(null);

  useEffect(() => {
    const storedUserDetials = localStorage.getItem("user");
    if (storedUserDetials) {
      setUserDetials(JSON.parse(storedUserDetials));
    }
  }, []);
  return (
    <div className="min-h-[100vh] flex justify-center ">
      {!userDetials ? (
        <div>Please wait</div>
      ) : (
        <div className="pt-10">
          {userDetials.avatar && (
            <img
              src={userDetials.avatar}
              alt="user avatar"
              className="h-[40vh] border-2 border-amber-500 rounded-xl"
            />
          )}
          <div className="flex items-center flex-col ">
            <h1 className="text-2xl font-bold mt-4">{userDetials.userName}</h1>
            <h1 className="text-xl font-semibold tracking-wider mt-1">{userDetials.email}</h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDetials;
