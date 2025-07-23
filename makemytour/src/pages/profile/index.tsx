import React, { useEffect, useState } from "react";
import {
  User,
  Phone,
  Mail,
  Edit2,
  MapPin,
  Calendar,
  CreditCard,
  X,
  Check,
  LogOut,
  Plane,
  Building2,
  ChevronRight,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { clearUser, setUser } from "@/store";
import { editprofile } from "@/api";

const Index = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    bookings: [],
  });

  // Copy user data to local state on mount
  useEffect(() => {
    console.log("User from Redux:", user);
    if (user) {
      setUserData({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        bookings: user.bookings || [],
      });
    }
  }, [user]);

  const handleSave = async () => {
    try {
      const data = await editprofile(
        user?.id,
        userData.firstname,
        userData.lastname,
        userData.email,
        userData.phoneNumber
      );
      dispatch(setUser(data));
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleEditFormChange = (field: string, value: string) => {
    setUserData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const logout = () => {
    dispatch(clearUser());
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm">
            <a href="/" className="text-blue-500">
              Home
            </a>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-black">
              {user?.firstname} {user?.lastname}
            </span>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 mt-5 md:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl text-black font-bold">Profile</h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-red-600 flex items-center space-x-1 hover:text-red-700"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-black text-sm font-medium mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={userData.firstname}
                      onChange={(e) =>
                        handleEditFormChange("firstname", e.target.value)
                      }
                      className="w-full px-3 py-2 border text-black rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-black text-sm font-medium mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={userData.lastname}
                      onChange={(e) =>
                        handleEditFormChange("lastname", e.target.value)
                      }
                      className="w-full px-3 py-2 border text-black rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-black text-sm font-medium mb-">
                      Email
                    </label>
                    <input
                      type="email"
                      value={userData.email}
                      onChange={(e) =>
                        handleEditFormChange("email", e.target.value)
                      }
                      readOnly
                      className="w-full px-3 py-2 border text-black rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-black text-sm font-medium mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={userData.phoneNumber}
                      onChange={(e) =>
                        handleEditFormChange("phoneNumber", e.target.value)
                      }
                      className="w-full px-3 py-2 border text-black rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleSave}
                      className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Check className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setUserData({
                          firstname: user.firstname || "",
                          lastname: user.lastname || "",
                          email: user.email || "",
                          phoneNumber: user.phoneNumber || "",
                          bookings: user.bookings || [],
                        });
                      }}
                      className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 text-black">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium">
                        {userData.firstname} {userData.lastname}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <p>{userData.email}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <p>{userData.phoneNumber}</p>
                  </div>
                  <button
                    className="w-full mt-4 flex items-center justify-center space-x-2 text-red-600 hover:text-red-700"
                    onClick={logout}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Bookings Section */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl text-black font-bold mb-6">
                My Bookings
              </h2>
              <div className="space-y-6">
                {userData.bookings.map((booking: any, index: number) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {booking?.type === "Flight" ? (
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <Plane className="w-6 h-6 text-blue-600" />
                          </div>
                        ) : (
                          <div className="bg-green-100 p-2 rounded-lg">
                            <Building2 className="w-6 h-6 text-green-600" />
                          </div>
                        )}
                        <div>
                          <h3 className="font-semibold text-black">
                            {booking?.type === "Flight" ? "Flight" : "Hotel"}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Booking ID: {booking?.bookingId}
                          </p>
                          {booking?.type === "Hotel" && booking?.name && (
                            <p className="text-sm text-gray-700">
                              Hotel Name: {booking.name}{" "}
                            </p>
                            
                          )}
                            {booking?.type === "Flight" && booking?.name && (
                            <p className="text-bold text-gray-700">
                              Flight Name: {booking.name}{" "}
                            </p>
                            
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-black">
                          ₹ {booking?.totalPrice.toLocaleString("en-IN")}
                        </p>
                        <p className="text-sm text-gray-500">Paid</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(booking?.date)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{booking?.type}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CreditCard className="w-4 h-4" />
                        <span>Paid</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;