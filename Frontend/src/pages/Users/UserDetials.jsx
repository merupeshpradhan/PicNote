import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../components/Footer";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function UserDetials() {
  const hideLayout = ["/login", "/register"].includes(location.pathname);
  const [userDetails, setUserDetials] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showPasswordPanel, setShowPasswordPanel] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    avatar: null,
    userName: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

   const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserDetials(user);
      setFormData({
        avatar: null,
        userName: user.userName,
        email: user.email,
        password: "",
      });
      setPreviewAvatar(user.avatar);
    }
  }, []);

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
      if (formData.userName) data.append("userName", formData.userName);
      if (formData.email) data.append("email", formData.email);

      const res = await axios.put(
        "http://localhost:4000/api/v1/users/update-profile",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      const updateUser = res.data.data;
      localStorage.setItem("user", JSON.stringify(updateUser));
      setUserDetials(updateUser);
      toast.success("Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoadinging(false);
    }
  };

  // Change password
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New password do not match!");
      return;
    }
    try {
      const res = await axios.put(
        "http://localhost:4000/api/v1/users/change-password",
        passwordData,
        { withCredentials: true }
      );

      toast.success(res.data?.message || "Password change successfully!");
      setShowPasswordPanel(false);
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Password change failed!");
    }
  };

  return (
    <div className="min-h-[100vh] flex flex-col items-center justify-between bg-indigo-50 relative overflow-hidden">
      {!userDetails ? (
        <div>Loading...</div>
      ) : (
        <div className="pt-20 flex flex-col items-center">
          <img
            src={previewAvatar}
            alt="user avatar"
            className="h-[40vh] border-2 border-amber-500 rounded-xl object-cover"
          />

          {editMode ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center mt-5 space-y-3"
            >
              <input
                type="file"
                name="avatar"
                onChange={handleChange}
                className="border-2 border-lime-500 w-full px-2 py-2 rounded-md"
              />
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Enter name"
                className="border-2 border-lime-500 w-full px-2 py-2 rounded-md"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="border-2 border-lime-500 w-full px-2 py-2 rounded-md"
              />
              <div className="flex gap-3 mt-2">
                {/* Cancel Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200 cursor-pointer"
                >
                  {loading ? "Saving..." : "Save"}
                </button>

                {/* Cancel Button */}
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition duration-200 cursor-pointer" 
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col items-center mt-4">
              <h1 className="text-2xl font-bold">{userDetails.userName}</h1>
              <h1 className="text-lg text-gray-700">{userDetails.email}</h1>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => setShowPasswordPanel(true)}
                  className="bg-orange-500 text-white px-4 py-2 rounded-md cursor-pointer"
                >
                  Change Password
                </button>
              </div>
            </div>
          )}
        </div>
      )}

       {/* Password side panel */}
      {showPasswordPanel && (
        <div className="fixed top-0 right-0 w-[30vw] h-full bg-white shadow-2xl p-6 z-50 flex flex-col justify-center animate-slide-left">
          <h2 className="text-2xl font-bold mb-4">Change Password</h2>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            {/* Old Password */}
            <div className="relative">
              <input
                type={showPassword.old ? "text" : "password"}
                name="oldPassword"
                placeholder="Current password"
                value={passwordData.oldPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    oldPassword: e.target.value,
                  })
                }
                className="w-full border-2 border-gray-400 px-3 py-2 rounded-md"
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-gray-600"
                onClick={() =>
                  setShowPassword({ ...showPassword, old: !showPassword.old })
                }
              >
                {showPassword.old ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* New Password */}
            <div className="relative">
              <input
                type={showPassword.new ? "text" : "password"}
                name="newPassword"
                placeholder="New password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
                }
                className="w-full border-2 border-gray-400 px-3 py-2 rounded-md"
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-gray-600"
                onClick={() =>
                  setShowPassword({ ...showPassword, new: !showPassword.new })
                }
              >
                {showPassword.new ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showPassword.confirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm new password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full border-2 border-gray-400 px-3 py-2 rounded-md"
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-gray-600"
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    confirm: !showPassword.confirm,
                  })
                }
              >
                {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={() => setShowPasswordPanel(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-md cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer"
              >
                Save Password
              </button>
            </div>
          </form>
        </div>
      )}

      {!hideLayout && <Footer />}
    </div>
  );
}

export default UserDetials;
