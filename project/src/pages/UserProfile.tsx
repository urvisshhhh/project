import { useState, useEffect } from "react";
import { User, Lock, Save, LogOut, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();

  // ✅ State to store user details
  const [user, setUser] = useState({ fullName: "", email: "" });

  // ✅ Fetch user details from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Convert stored JSON string to an object
    }
  }, []);

  const tabs = [
    { id: "profile", name: "Profile", icon: User },
    ];

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    localStorage.removeItem("user"); // Remove user details
    alert("Logged out successfully!");
    navigate("/login"); // Redirect to login
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold text-white flex items-center gap-2">
          <User className="h-6 w-6" />
          User Profile
        </h1>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-900 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === tab.id
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
          >
            <tab.icon className="h-5 w-5 mr-2" />
            {tab.name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-gray-900 rounded-lg p-6">
        {/* ✅ Profile Section */}
        {activeTab === "profile" && (
          <form className="space-y-6">
            <h3 className="text-lg font-medium text-white">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={user.fullName || "Not Available"}
                  readOnly
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Email
                </label>
                <div className="flex items-center space-x-2 bg-gray-800 text-white px-3 py-2 rounded-lg">
                  <Mail className="w-5 h-5 text-gold" />
                  <span>{user.email || "Not Available"}</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Save className="h-5 w-5" />
                Save Changes
              </button>
            </div>
          </form>
        )}

       
      </div>

      {/* ✅ Logout Button */}
      <div className="pt-4">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
