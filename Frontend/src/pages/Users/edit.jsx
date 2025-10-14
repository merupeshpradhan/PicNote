import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../components/Footer";
import { toast } from "react-toastify";

function UserDetails() {
  const hideLayout = ["/login", "/register"].includes(location.pathname);
  const [userDetails, setUserDetails] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showPasswordPanel, setShowPasswordPanel] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    avatar: null,
    userName: "",
    email: "",
    password: "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserDetails(user);
      setFormData({
        userName: user.userName,
        email: user.email,
        password: "",
        avatar: null,
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
      data.append("userName", formData.userName);
      data.append("email", formData.email);
      if (formData.password) data.append("password", formData.password);

      const res = await axios.put(
        "http://localhost:4000/api/v1/users/update-profile",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      const updatedUser = res.data.data;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUserDetails(updatedUser);
      toast.success("Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed!");
    } finally {
      setLoading(false);
    }
  };

  // Change password
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    try {
      const res = await axios.put(
        "http://localhost:4000/api/v1/users/change-password",
        passwordData,
        { withCredentials: true }
      );
      toast.success(res.data.message || "Password changed successfully!");
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
              <input type="file" name="avatar" onChange={handleChange} />
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Enter name"
                className="border-2 border-lime-500 px-3 py-2 rounded-md"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="border-2 border-lime-500 px-3 py-2 rounded-md"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center mt-4">
              <h1 className="text-2xl font-bold">{userDetails.userName}</h1>
              <h1 className="text-lg text-gray-700">{userDetails.email}</h1>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => setShowPasswordPanel(true)}
                  className="bg-orange-500 text-white px-4 py-2 rounded-md"
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
            <input
              type="password"
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
            <input
              type="password"
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
            <input
              type="password"
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
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setShowPasswordPanel(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md"
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

export default UserDetails;
