"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import {
  User,
  Mail,
  Lock,
  Camera,
  Save,
  Edit3,
  Shield,
  Calendar,
  Bell,
  Globe,
  EyeOff,
  Settings,
  Star,
  Activity,
  Eye,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { getSingleUser, updateUser } from "@/services/user";
import { IUserType } from "@/types/user";
import { changePassword } from "@/services/authService";

interface ProfileForm {
  name: string;
  profileImage?: string;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ShowPassword {
  current: boolean;
  new: boolean;
  confirm: boolean;
}

interface Errors {
  name?: string;
  profileImage?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  [key: string]: string | undefined;
}

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface SettingItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
  checked: boolean;
}

interface ProfileField {
  label: string;
  value?: string;
  icon: React.ReactNode;
}

const MyProfilePage = () => {
  const [user, setUser] = useState<IUserType | null>(null);
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<ShowPassword>({
    current: false,
    new: false,
    confirm: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  // Initialize profile form with user data
  const [profileForm, setProfileForm] = useState<ProfileForm>({
    name: "",
    profileImage: undefined,
  });

  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getSingleUser();
        if (res?.data) {
          setUser(res.data);
          setProfileForm({
            name: res.data.name || "",
            profileImage: res.data.profileImage || undefined,
          });
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        toast.error("Failed to load user data");
      }
    };

    fetchUser();
  }, []);

  const handleProfileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handlePasswordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          profileImage: "Image size must be less than 5MB",
        }));
        return;
      }

      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          profileImage: "Please select a valid image file",
        }));
        return;
      }

      // Store the actual file for submission
      setSelectedImageFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileForm((prev) => ({
          ...prev,
          profileImage: e.target?.result as string,
        }));
        setErrors((prev) => ({ ...prev, profileImage: undefined }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateProfileForm = (): boolean => {
    const newErrors: Errors = {};
    if (!profileForm.name.trim()) {
      newErrors.name = "Name is required";
    } else if (profileForm.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = (): boolean => {
    const newErrors: Errors = {};
    if (!passwordForm.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }
    if (!passwordForm.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (passwordForm.newPassword.length < 5) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (passwordForm.currentPassword === passwordForm.newPassword) {
      newErrors.newPassword =
        "New password must be different from current password";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSave = async (): Promise<void> => {
    if (!validateProfileForm()) return;

    setIsLoading(true);
    try {
      // Prepare data similar to movie form submission
      const parsedData = {
        name: profileForm.name.trim(),
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(parsedData));

      // Add image file if selected
      if (selectedImageFile) {
        formData.append("file", selectedImageFile);
      }

      const res = await updateUser(user?.id as string, formData);

      console.log(res);
      if (res.success) {
        toast.success(res.message || "Profile updated successfully!");

        // Update local user state with response data
        if (res.data) {
          setUser(res.data);
          setProfileForm({
            name: res.data.name || "",
            profileImage: res.data.profileImage || undefined,
          });
        }

        setIsEditingProfile(false);
        setSelectedImageFile(null);
      } else if (res.error) {
        toast.error(res.error || "Profile update failed");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (): Promise<void> => {
    if (!validatePasswordForm()) return;
    setIsLoading(true);

    try {
      const passwordData = {
        oldPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      };

      const res = await changePassword(passwordData);

      console.log(res);

      if (res.success) {
        toast.success(res.message || "Password changed successfully!");

        // Reset password form
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setErrors({});
      } else {
        toast.error(res.message || "Password change failed");
      }
    } catch (error) {
      console.error("Password change error:", error);
      toast.error("Failed to change password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return "Unknown date";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const togglePasswordVisibility = (field: keyof ShowPassword): void => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const tabs: Tab[] = [
    {
      id: "profile",
      label: "Profile",
      icon: <User size={18} />,
    },
    {
      id: "password",
      label: "Password",
      icon: <Lock size={18} />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings size={18} />,
    },
  ];

  const settings: SettingItem[] = [
    {
      icon: <Bell className="text-red-400" size={24} />,
      title: "Email Notifications",
      desc: "Receive updates about your account activity",
      checked: true,
    },
    {
      icon: <Globe className="text-red-300" size={24} />,
      title: "Newsletter Subscription",
      desc: "Get weekly updates and promotions",
      checked: true,
    },
    {
      icon: <EyeOff className="text-red-200" size={24} />,
      title: "Private Profile",
      desc: "Hide your profile from public view",
      checked: false,
    },
  ];

  const profileFields: ProfileField[] = [
    {
      label: "Full Name",
      value: user?.name,
      icon: <User className="text-red-400" size={20} />,
    },
    {
      label: "Email Address",
      value: user?.email,
      icon: <Mail className="text-red-300" size={20} />,
    },
    {
      label: "Role",
      value: user?.role,
      icon: <Star className="text-red-200" size={20} />,
    },
    {
      label: "Status",
      value: user?.status,
      icon: <Activity className="text-green-400" size={20} />,
    },
    {
      label: "Member Since",
      value: formatDate(user?.createdAt),
      icon: <Calendar className="text-red-300" size={20} />,
    },
    {
      label: "Last Updated",
      value: formatDate(user?.updatedAt),
      icon: <Calendar className="text-red-400" size={20} />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-red-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-red-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-black rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      </div>

      {/* Header */}
      <div className="relative">
        <div className="absolute  inset-0 bg-gradient-to-r from-red-600 via-black to-red-600 opacity-40"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Enhanced Profile Image */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-600 via-black to-red-600 rounded-full opacity-75 group-hover:opacity-100 blur-sm group-hover:blur transition-all duration-300"></div>
              <div className="relative w-40 h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-white border-opacity-20 shadow-2xl bg-gradient-to-br from-gray-800 to-gray-900">
                {profileForm.profileImage || user?.profileImage ? (
                  <div className="w-full h-full relative">
                    <Image
                      src={profileForm.profileImage || user?.profileImage || ""}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-purple-400">
                    <User size={60} />
                  </div>
                )}
                {isEditingProfile && (
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <Camera
                      className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      size={32}
                    />
                  </div>
                )}
              </div>
              {isEditingProfile && (
                <label className="absolute bottom-2 right-2 bg-gradient-to-r from-red-600 to-black rounded-full p-3 cursor-pointer hover:from-red-700 hover:to-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110">
                  <Camera size={18} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
              {errors.profileImage && (
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-red-400 text-sm bg-red-900 bg-opacity-50 px-3 py-1 rounded-lg">
                  {errors.profileImage}
                </div>
              )}
            </div>

            {/* Enhanced User Info */}
            <div className="text-center lg:text-left flex-1 space-y-4">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-300 to-red-500">
                  {user?.name}
                </h1>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-4">
                  <div className="flex items-center gap-2 text-red-300">
                    <Mail size={16} />
                    <span className="text-sm">{user?.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-red-200">
                    <Calendar size={16} />
                    <span className="text-sm">
                      Joined {formatDate(user?.createdAt)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border ${
                    user?.status === "ACTIVE"
                      ? "bg-green-500 bg-opacity-20 border-green-500"
                      : "bg-red-500 bg-opacity-20 text-red-400 border-red-500"
                  }`}
                >
                  <Activity size={14} className="inline mr-2" />
                  {user?.status}
                </span>
                <span className="bg-gradient-to-r from-red-500 to-black bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium text-red-300 border border-red-500 backdrop-blur-sm">
                  <Star size={14} className="inline mr-2" />
                  {user?.role}
                </span>
              </div>

              {activeTab === "profile" && (
                <button
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="bg-gradient-to-r from-red-600 to-black text-white px-8 py-3 rounded-2xl hover:from-red-700 hover:to-gray-900 transition-all duration-300 flex items-center gap-3 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 mx-auto lg:mx-0"
                >
                  <Edit3 size={18} />
                  {isEditingProfile ? "Cancel Edit" : "Edit Profile"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          <div>
            {/* Enhanced Tab Navigation */}
            <div className="bg-gray-900 bg-opacity-80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-gray-700 mb-8 overflow-hidden">
              <div className="border-b border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900">
                <nav className="flex gap-1 p-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-red-600 to-black text-white shadow-lg transform scale-105"
                          : "text-gray-400 hover:text-white hover:bg-gray-800 hover:bg-opacity-50"
                      }`}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {activeTab === "profile" && (
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-300">
                        Profile Information
                      </h3>
                    </div>

                    {isEditingProfile ? (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-red-300 flex items-center gap-2">
                            <User size={20} />
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={profileForm.name}
                            onChange={handleProfileInputChange}
                            className={`w-full px-4 py-3 bg-gray-800 bg-opacity-50 border text-white rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 backdrop-blur-sm hover:bg-opacity-70 ${
                              errors.name
                                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                : "border-gray-600 focus:ring-red-500 focus:border-red-500"
                            }`}
                            placeholder="Enter your full name"
                          />
                          {errors.name && (
                            <p className="text-red-400 text-sm mt-1">
                              {errors.name}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                          <button
                            onClick={handleProfileSave}
                            disabled={isLoading}
                            className="bg-gradient-to-r from-red-600 to-black text-white px-8 py-3 rounded-xl hover:from-red-700 hover:to-gray-900 transition-all duration-300 flex items-center justify-center gap-3 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                          >
                            <Save size={18} />
                            {isLoading ? "Saving..." : "Save Changes"}
                          </button>
                          <button
                            onClick={() => {
                              setIsEditingProfile(false);
                              setProfileForm({
                                name: user?.name || "",
                                profileImage: user?.profileImage || undefined,
                              });
                              setErrors({});
                            }}
                            disabled={isLoading}
                            className="bg-gray-700 bg-opacity-50 text-gray-300 px-8 py-3 rounded-xl hover:bg-gray-600 hover:bg-opacity-70 transition-all duration-300 font-medium backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {profileFields.map((field, index) => (
                          <div
                            key={index}
                            className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105"
                          >
                            <div className="flex items-center gap-3 mb-2">
                              {field.icon}
                              <label className="text-sm font-medium text-gray-400">
                                {field.label}
                              </label>
                            </div>
                            <p className="text-lg text-white font-medium">
                              {field.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "password" && (
                  <div className="space-y-8">
                    <div className="flex items-center gap-3">
                      <Lock className="text-red-400" size={24} />
                      <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-300">
                        Change Password
                      </h3>
                    </div>

                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
                      <div className="space-y-6">
                        {[
                          {
                            name: "currentPassword",
                            placeholder: "Current Password",
                            label: "Current Password",
                          },
                          {
                            name: "newPassword",
                            placeholder: "New Password",
                            label: "New Password",
                          },
                          {
                            name: "confirmPassword",
                            placeholder: "Confirm New Password",
                            label: "Confirm New Password",
                          },
                        ].map((field) => (
                          <div key={field.name} className="space-y-2">
                            <label className="block text-sm font-medium text-red-300">
                              {field.label}
                            </label>
                            <div className="relative">
                              <input
                                type={
                                  showPassword[
                                    field.name.replace(
                                      "Password",
                                      ""
                                    ) as keyof ShowPassword
                                  ]
                                    ? "text"
                                    : "password"
                                }
                                name={field.name}
                                placeholder={field.placeholder}
                                value={
                                  passwordForm[field.name as keyof PasswordForm]
                                }
                                onChange={handlePasswordInputChange}
                                className={`w-full px-4 py-3 pr-12 bg-gray-800 bg-opacity-50 border text-white rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 backdrop-blur-sm hover:bg-opacity-70 ${
                                  errors[field.name]
                                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                    : "border-gray-600 focus:ring-red-500 focus:border-red-500"
                                }`}
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  togglePasswordVisibility(
                                    field.name.replace(
                                      "Password",
                                      ""
                                    ) as keyof ShowPassword
                                  )
                                }
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                              >
                                {showPassword[
                                  field.name.replace(
                                    "Password",
                                    ""
                                  ) as keyof ShowPassword
                                ] ? (
                                  <EyeOff size={20} />
                                ) : (
                                  <Eye size={20} />
                                )}
                              </button>
                            </div>
                            {errors[field.name] && (
                              <p className="text-red-400 text-sm mt-1">
                                {errors[field.name]}
                              </p>
                            )}
                          </div>
                        ))}

                        <div className="bg-gray-900 bg-opacity-50 border border-gray-600 rounded-xl p-4">
                          <div className="flex items-start gap-3">
                            <Shield
                              className="text-red-400 flex-shrink-0 mt-1"
                              size={20}
                            />
                            <div>
                              <h4 className="text-red-300 font-medium mb-1">
                                Password Requirements
                              </h4>
                              <ul className="text-red-200 text-sm space-y-1">
                                <li>• At least 5 characters long</li>
                                <li>• Different from your current password</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={handlePasswordChange}
                          disabled={
                            isLoading ||
                            !passwordForm.currentPassword ||
                            !passwordForm.newPassword ||
                            !passwordForm.confirmPassword
                          }
                          className="w-full bg-gradient-to-r from-red-600 to-black text-white px-8 py-3 rounded-xl hover:from-red-700 hover:to-gray-900 transition-all duration-300 flex items-center justify-center gap-3 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                          <Lock size={18} />
                          {isLoading
                            ? "Changing Password..."
                            : "Change Password"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "settings" && (
                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-300">
                      Account Settings
                    </h3>

                    <div className="space-y-4">
                      {settings.map((setting, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-6 border border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl hover:border-gray-600 transition-all duration-300 group hover:transform hover:scale-[1.02]"
                        >
                          <div className="flex items-center gap-4 flex-1">
                            <div className="p-3 rounded-xl bg-gray-700 bg-opacity-50 group-hover:bg-opacity-70 transition-all duration-300">
                              {setting.icon}
                            </div>
                            <div>
                              <h4 className="font-semibold text-white text-lg">
                                {setting.title}
                              </h4>
                              <p className="text-gray-400">{setting.desc}</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              defaultChecked={setting.checked}
                            />
                            <div className="w-14 h-7 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-red-600 peer-checked:to-black shadow-lg"></div>
                          </label>
                        </div>
                      ))}

                      {/* <div className="border-t border-gray-700 pt-8">
                        <h4 className="font-semibold text-red-400 mb-6 flex items-center gap-3 text-lg">
                          <AlertTriangle size={20} />
                          Danger Zone
                        </h4>

                        <div className="bg-gradient-to-r from-red-900 to-red-800 bg-opacity-30 border border-red-700 rounded-2xl p-6">
                          <h5 className="text-red-300 font-semibold mb-2">
                            Delete Account
                          </h5>
                          <p className="text-red-200 mb-4 text-sm">
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                          </p>
                          <button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            Delete Account
                          </button>
                        </div>
                      </div> */}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
