import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../components/Footer";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

function UserDetials() {
  const [userDetails, setUserDetials] = useState(null);
  const [userImages, setUserImages] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    avatar: null,
    firstName: "",
    lastName: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log(storedUser);

    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserDetials(user);
      setFormData({
        avatar: null,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
      });
      setPreviewAvatar(user.avatar);
    }
  }, []);

  useEffect(() => {
    if (!userDetails) return;

    fetchUserImages();
  }, [userDetails]);

  const fetchUserImages = async () => {
    const token = localStorage.getItem("accessToken");
    const userId = userDetails.id;
    console.log("userId :- ", userId);

    try {
      const res = await axios.get(
        `http://localhost:4000/api/v1/posts/user/${userId}`,
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      console.log("User Image's :- ", res.data.data);
      setUserImages(res.data.data);
    } catch (error) {
      toast.error("Somthing went wrong");
    }
  };

  // Handle image or text input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setFormData({ ...formData, [name]: file });

      const reader = new FileReader();
      reader.onloadend = () => setPreviewAvatar(reader.result);
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Update user profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      if (formData.avatar) data.append("avatar", formData.avatar);
      if (formData.firstName) data.append("firstName", formData.firstName);
      if (formData.lastName) data.append("lastName", formData.lastName);
      if (formData.email) data.append("email", formData.email);

      const token = localStorage.getItem("accessToken");

      const res = await axios.put(
        "http://localhost:4000/api/v1/users/update-profile",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      const updateUser = res.data.data;
      localStorage.setItem("user", JSON.stringify(updateUser));

      window.dispatchEvent(new Event("userUpdated"));

      setUserDetials(updateUser);
      toast.success("Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100vh] flex flex-col items-center justify-between bg-indigo-50 relative overflow-hidden">
      {!userDetails ? (
        <div>Loading...</div>
      ) : (
        <div className="pt-20 flex flex-col items-center">
          {editMode ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-row items-center mt-4 space-x-6"
            >
              <img
                src={previewAvatar}
                alt="user avatar"
                className="w-[80%] md:w-[18vw] md:h-[40vh] border-2 border-amber-500 rounded-xl"
              />
              <div className="flex flex-col items-center space-y-2 w-[20vw]">
                <div className="new-avatar-input">
                  <button
                    type="button"
                    onClick={() => document.getElementById("newAvatar").click()}
                    className="bg-lime-600 hover:bg-lime-800 text-white tracking-widest italic cursor-pointer px-1.5 py-2 text-[17px] md:text-[12px] font-semibold rounded-md transition duration-100"
                  >
                    {previewAvatar ? "Change Avatar" : "Choose Avatar"}
                  </button>
                  <input
                    className="hidden"
                    type="file"
                    name="avatar"
                    id="newAvatar"
                    onChange={handleChange}
                  />
                </div>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  className="border-2 border-lime-500 w-[80%] md:w-full px-2 py-1 rounded-md"
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  className="border-2 border-lime-500 w-[80%] md:w-full px-2 py-1 rounded-md"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="border-2 border-lime-500 w-[80%] md:w-full px-2 py-1 rounded-md"
                />
                <div className="flex gap-3 mt-2">
                  {/* Save Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-500 text-white text-[15px] md:text-[16px] px-3 py-1 rounded-md hover:bg-green-600 transition duration-200 cursor-pointer md:font-semibold tracking-wider"
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>

                  {/* Cancel Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setEditMode(false);
                      setFormData({
                        avatar: null,
                        firstName: userDetails.firstName,
                        lastName: userDetails.lastName,
                        email: userDetails.email,
                      });
                      setPreviewAvatar(userDetails.avatar);
                    }}
                    className="bg-gray-400 text-white px-3 py-1 rounded-md hover:bg-gray-500 transition duration-200 cursor-pointer md:font-semibold tracking-wider"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="w-full flex flex-col justify-center items-center">
              <div className="w-full flex items-center justify-center mt-4 space-x-6">
                <img
                  src={userDetails.avatar}
                  alt="user avatar"
                  className="w-[80%] md:w-[18vw] md:h-[40vh] border-2 border-amber-500 rounded-xl"
                />
                <div className="flex flex-col items-center justify-center w-[20vw]">
                  <h1 className="text-2xl font-bold mt-2">
                    {userDetails.firstName} {userDetails.lastName}
                  </h1>
                  <h1 className="text-sm md:text-lg mt-1 text-gray-700">
                    {userDetails.email}
                  </h1>
                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => setEditMode(true)}
                      className="bg-blue-500 text-white text-[12px] md:text-[16px] px-1 py-1 md:px-2.5  rounded-md cursor-pointer hover:bg-blue-600 transition duration-200"
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center mt-15">
                <h1>All Images</h1>
                <div className="w-full bg-indigo-50 items-center grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-5 pt-[160px] lg:pt-[20px]  mt-[85px] lg:mt-0">
                  {userImages.map((userImage) => (
                    <div
                      key={userImage._id}
                      className="flex flex-col gap-1 items-center bg-white shadow-md rounded-2xl p-3"
                    >
                      <img
                        src={userImage.image}
                        className="h-56 object-cover rounded-xl cursor-pointer"
                      />
                      <p className="text-xl font-bold">{userImage.imageName}</p>
                      <p className="w-full text-sm font-medium truncate">
                        <span className="text-md">Description</span> : -{" "}
                        <span className=" text-[12px]">
                          {userImage.description}
                        </span>
                      </p>
                      {/* Show Update/Delete only if current user is owner */}
                        <div className="flex gap-3 mt-3">
                          <div className="flex justify-between gap-5">
                            <NavLink
                              to={`/update/${userImage._id}`}
                              className="border rounded-sm px-3 py-1 text-yellow-500 hover:bg-yellow-500 hover:text-white font-bold transition duration-200"
                            >
                              Update post
                            </NavLink>
                          </div>
                          <button
                            onClick={() => handleDelete(userImage._id)}
                            className="border rounded-sm px-3 py-1 text-red-500 hover:bg-red-500 hover:text-white font-bold transition duration-200 cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
}

export default UserDetials;
