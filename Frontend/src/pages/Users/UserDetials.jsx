import { useEffect, useState } from "react";
// import axios from "axios";
// import Footer from "../../components/Footer";
import { toast } from "react-toastify";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import api from "../Api/api";

function UserDetials() {
  const { userId } = useParams(); // get userId from URL
  const [userDetails, setUserDetials] = useState(null);
  const [userImages, setUserImages] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // console.log(userId);

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
    if (!userId) return;

    fetchUserImages();
  }, [userId]);

  // Geting Usrer Post Images
  const fetchUserImages = async () => {
    // const userId = userDetails.id;
    console.log("userId :- ", userId);

    try {
      // const res = await axios.get(
      //   `http://localhost:4000/api/v1/posts/user/${userId}`,
      //   { withCredentials: true }
      // );
      const res = await api.get(`/posts/user/${userId}`);
      console.log("User Image's :- ", res);
      setUserImages(res.data.data);
    } catch (error) {
      console.log(error);

      if (error.response?.status !== 401) {
        toast.error("Something went wrong");
      }
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

      // const token = localStorage.getItem("accessToken");

      // const res = await api.put(`/users/update-profile`, data);
      // const res = await axios.put(`/users/update-profile`, data);
      const res = await api.put(`/users/update-profile`, data);
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

  // DELETE handler
  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    // const token = localStorage.getItem("accessToken");
    try {
      // await axios.delete(`http://localhost:4000/api/v1/posts/${postId}`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      //   withCredentials: true,
      // });
      await api.delete(`/posts/${postId}`);
      toast.success("Post deleted successfully!");

      // remove deleted post from the state
      setUserImages((prev) => prev.filter((post) => post._id !== postId));
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-[105vh] flex flex-col items-center justify-between bg-indigo-50 relative overflow-hidden">
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
                className="w-[80%] md:w-[23vw] md:h-[50vh] border-4 border-lime-500 rounded-xl"
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
                <div className="w-full flex flex-col gap-0.5">
                  <p>First Name</p>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    className="border-2 border-lime-500 w-[80%] md:w-full px-2 py-1 rounded-md"
                  />
                </div>
                <div className="w-full flex flex-col gap-0.5">
                  <p>Last Name</p>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                    className="border-2 border-lime-500 w-[80%] md:w-full px-2 py-1 rounded-md"
                  />
                </div>
                <div className="w-full flex flex-col gap-0.5">
                  <p>Email</p>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    className="border-2 border-lime-500 w-[80%] md:w-full px-2 py-1 rounded-md"
                  />
                </div>

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
                  className="w-[80%] md:w-[23vw] md:h-[50vh] border-4 border-green-500 rounded-xl"
                />
                <div className="flex flex-col items-center justify-center w-[20vw] cursor-default">
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
              <div className="flex flex-col items-center justify-center mt-20 mb-2">
                <div className="border-b-4 border-t-4 z-40 border-[#658C58] w-[100vw] text-center shadow-[#8ed38b] shadow-2xl/50 rounded-l-2xl rounded-r-2xl">
                  <h1 className="text-4xl mb-2.5 tracking-wider italic font-extrabold text-[#31694E] cursor-default">
                    Your Image's
                  </h1>
                </div>
                <div className="w-full">
                  {userImages.length === 0 ? (
                    <h2 className="text-center text-2xl font-semibold text-red-400 w-full mt-10 mb-20 cursor-default">
                      Oops! You don’t have any images yet 😃
                    </h2>
                  ) : (
                    <div className="w-full items-center grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8 pt-[160px] lg:pt-[36px] mt-[85px] lg:mt-0">
                      {userImages.map((userImage) => (
                        <div
                          key={userImage._id}
                          className="flex flex-col gap-0.5 items-center bg-[#d3ebcc] shadow-lg/70 shadow-[#b7c74e] rounded-2xl p-3 hover:scale-105 ease-in-out duration-300"
                        >
                          <img
                            src={userImage.image}
                            className="h-56 object-cover rounded-xl cursor-pointer"
                            onClick={() =>
                              navigate(`/postDetail/${userImage._id}`)
                            }
                          />
                          <p className="text-lg font-bold mt-3 text-indigo-700 tracking-wider">
                            {userImage.imageName}
                          </p>
                          <p className="w-full text-[13px] text-indigo-900 font-medium truncate px-2">
                            <span className="text-md  tracking-wider">
                              Photo Details
                            </span>{" "}
                            : -{" "}
                            <span className="text-[11px]  tracking-wider">
                              {userImage.description}
                            </span>
                          </p>
                          {/* Show Update/Delete only if current user is owner */}
                          <div className="flex gap-3 mt-3">
                            <div className="flex justify-between gap-5">
                              <NavLink
                                to={`/update/${userImage._id}`}
                                className="rounded-sm px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold transition duration-200"
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
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* <Footer /> */}
    </div>
  );
}

export default UserDetials;
