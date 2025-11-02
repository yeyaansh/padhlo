import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { success, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useNavigate } from "react-router";
import { toast } from "sonner";
import axiosClient from "../../../axiosClient";
import { useDispatch } from "react-redux";
import { deleteAccount } from "../../../redux/authSlice";

// You can reuse these components from your other pages
const InputField = ({ id, label, register, error, ...props }) => (
  <div>
    <label htmlFor={id} className="text-sm font-bold text-gray-700 mb-1 block">
      {label}
    </label>
    <input
      id={id}
      // {{...register(id)}}
      // {...register(id)}
      {...props}
      className={`w-full px-4 py-3 bg-slate-100 border-2 rounded-lg text-gray-800 focus:outline-none focus:ring-4 transition ${
        error
          ? "border-red-500 focus:ring-red-300"
          : "border-gray-800 focus:ring-yellow-300"
      }`}
    />
    {error && (
      <p className="text-red-600 text-xs font-semibold mt-1">{error.message}</p>
    )}
  </div>
);

const PasswordInputField = ({ id, label, register, error, ...props }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div>
      <label
        htmlFor={id}
        className="text-sm font-bold text-gray-700 mb-1 block"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          {...register(id)}
          {...props}
          type={isVisible ? "text" : "password"}
          className={`w-full px-4 py-3 bg-slate-100 border-2 rounded-lg text-gray-800 focus:outline-none focus:ring-4 transition ${
            error
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-800 focus:ring-yellow-300"
          }`}
        />
        <button
          type="button"
          onClick={() => setIsVisible(!isVisible)}
          className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-800"
        >
          {isVisible ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                clipRule="evenodd"
              />
              <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.742L2.335 6.578A10.025 10.025 0 00.458 10c1.274 4.057 5.022 7 9.542 7 1.126 0 2.207-.245 3.232-.697z" />
            </svg>
          )}
        </button>
      </div>
      {error && (
        <p className="text-red-600 text-xs font-semibold mt-1">
          {error.message}
        </p>
      )}
    </div>
  );
};

const ToggleSwitch = ({ label }) => (
  <label className="flex items-center justify-between cursor-pointer">
    <span className="font-bold text-gray-700">{label}</span>
    <div className="relative">
      <input type="checkbox" className="sr-only peer" />
      <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-yellow-400 transition-colors"></div>
      <div className="absolute left-0 top-0 w-6 h-6 bg-white rounded-full border-2 border-gray-300 peer-checked:border-yellow-400 peer-checked:translate-x-full transition-all"></div>
    </div>
  </label>
);

export default function AccountPanel(user) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeleteAccount = async () => {
    // const deleteAccount = await axiosClient.delete("/user/deleteProfile");
    // console.log(deleteAccount.data);
    // if (deleteAccount.data.success) {
    //   // dispatch()
    //   toast.success(deleteAccount.data.message)
    //   .then(setTimeout(()=>window.location.reload(),2000))
    //   // navigate("/");

    // }

    // if (!deleteAccount.data.success) {
    //   toast.warning(deleteAccount.data.message);
    //   // window.location.reload();
    // }
    dispatch(deleteAccount());
  };

  // console.log(user);

  // Form handling for Profile Information
  const profileSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters."),
  });
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: { username: user.username },
  });
  const onProfileSubmit = (data) => console.log("Profile update:", data);

  // Form handling for Password Change
  const passwordSchema = z
    .object({
      currentPassword: z.string().min(8, "Current password is required."),
      newPassword: z
        .string()
        .min(8, "New password must be at least 8 characters."),
      confirmPassword: z
        .string()
        .min("Password should be atleast 8 characters."),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });
  const onPasswordSubmit = (data) => {
    console.log("Password change:", data);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl sketch-border-1 space-y-12">
      {/* --- Avatar Section --- */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Sketch</h2>
        <div className="flex items-center gap-6">
          <img
            src={
              user?.user?.data.avatarUrl ||
              "https://avatar.iran.liara.run/public/boy"
            }
            alt="User Avatar"
            className="w-20 h-20 rounded-full border-4 border-gray-800"
          />
          <div>
            <button className="px-5 py-2 bg-yellow-400 text-gray-900 text-sm font-bold rounded-lg sketch-button">
              Upload New
            </button>
            <p className="text-xs text-gray-500 mt-2">
              PNG, JPG, GIF up to 5MB.
            </p>
          </div>
        </div>
      </div>

      {/* --- Profile Information Form --- */}
      <form onSubmit={handleSubmitProfile(onProfileSubmit)}>
        <h2 className="text-2xl font-bold text-gray-800">
          Profile Information
        </h2>
        <div className="mt-4 grid sm:grid-cols-2 gap-6">
          <InputField
            id="username"
            label="Username"
            register={registerProfile}
            defaultValue={user?.user?.data.email_id}
            error={profileErrors.username}
          />
          <InputField
            label="Email Address"
            type="email"
            defaultValue={user?.user?.data.email_id}
            disabled
          />
        </div>
        <button
          type="submit"
          className="mt-6 px-6 py-2 bg-yellow-400 text-gray-900 font-bold rounded-lg sketch-button"
        >
          Save Changes
        </button>
      </form>

      <hr className="border-dashed border-gray-300" />

      {/* --- Change Password Form --- */}

      {/* <form onSubmit={handleSubmitPassword(onPasswordSubmit)}>
        <h2 className="text-2xl font-bold text-gray-800">Change Password</h2>
        <div className="mt-4 grid sm:grid-cols-1 md:grid-cols-2 gap-6">
          <PasswordInputField
            id="currentPassword"
            label="Current Password"
            register={registerPassword}
            error={passwordErrors.currentPassword}
          />
          <div></div>
          <PasswordInputField
            id="newPassword"
            label="New Password"
            register={registerPassword}
            error={passwordErrors.newPassword}
          />
          <PasswordInputField
            id="confirmPassword"
            label="Confirm New Password"
            register={registerPassword}
            error={passwordErrors.confirmPassword}
          />
        </div>
        <button
          type="submit"
          className="mt-6 px-6 py-2 bg-yellow-400 text-gray-900 font-bold rounded-lg sketch-button"
        >
          Update Password
        </button>
      </form> */}

      {/* <hr className="border-dashed border-gray-300" /> */}

      {/* --- Notifications Section --- */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Notifications</h2>
        <div className="space-y-4 max-w-md">
          <ToggleSwitch label="Weekly progress reports" />
          <ToggleSwitch label="New challenge alerts" />
          <ToggleSwitch label="Playlist update reminders" />
        </div>
      </div>

      <hr className="border-dashed border-gray-300" />

      {/* --- Danger Zone --- */}
      {/* <div>
        <h2 className="text-2xl font-bold text-red-600">Danger Zone</h2>
        <div className="mt-4 p-4 border-4 border-dashed border-red-400 rounded-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-800">Delete Your Account</h3>
              <p className="text-sm text-gray-600">
                Once you delete your account, there is no going back. Please be
                certain.
              </p>
            </div>
            <button
              onClick={handleDeleteAccount}
              className="mt-4 sm:mt-0 px-5 py-2 bg-red-500 text-white font-bold rounded-lg sketch-button flex-shrink-0"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div> */}

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div>
            <h2 className="text-2xl font-bold text-red-600">Danger Zone</h2>
            <div className="mt-4 p-4 border-4 border-dashed border-red-400 rounded-lg">
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-800">
                    Delete Your Account
                  </h3>
                  <p className="text-sm text-gray-600">
                    Once you delete your account, there is no going back. Please
                    be certain.
                  </p>
                </div>
                <button className="mt-4 sm:mt-0 px-5 py-2 bg-red-500 text-white font-bold rounded-lg sketch-button flex-shrink-0">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove all of your data from our servers. You will not
              be able to recover your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              Delete Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
