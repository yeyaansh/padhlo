import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { registerUser } from "../../redux/authSlice";
import { useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";

export default function RegisterPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("isAuthenticated: " + isAuthenticated);
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated]);

  const registerSchema = z.object({
    first_name: z.string().min(3, "name should be atleast 3 chars."),
    last_name: z.string(),
    gender: z.enum(["male", "female", "other"]),
    email_id: z.email("enter a valid email-address"),
    password: z.string().min(8, "password should be atleast 8 chars."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  function submitForm(value) {
    console.log(value);
    dispatch(registerUser(value));
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black py-8 px-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Create Account
            </h1>
            <p className="text-gray-400">Join our community today</p>
          </div>

          {/* Form Container */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-2xl">
            <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col">
                  <label
                    htmlFor="first_name"
                    className="text-sm font-medium text-gray-300 mb-1"
                  >
                    First Name *
                  </label>
                  <input
                    {...register("first_name", {
                      required: "First name is required",
                    })}
                    type="text"
                    id="first_name"
                    placeholder="Rohit"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  />
                  {errors.first_name && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.first_name.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="last_name"
                    className="text-sm font-medium text-gray-300 mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    {...register("last_name")}
                    type="text"
                    id="last_name"
                    placeholder="Patel"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Gender Field */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-300 mb-2">
                  Gender *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <label className="flex items-center p-3 text-white bg-gray-700 border border-gray-600 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors has-[:checked]:bg-amber-500 has-[:checked]:border-amber-500 has-[:checked]:text-white">
                    <input
                      {...register("gender", {
                        required: "Please select your gender",
                      })}
                      type="radio"
                      value="male"
                      className="sr-only"
                    />
                    <div className="flex items-center justify-center w-full">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span className="text-sm">Male</span>
                    </div>
                  </label>

                  <label className="flex items-center p-3 text-white bg-gray-700 border border-gray-600 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors has-[:checked]:bg-amber-500 has-[:checked]:border-amber-500 has-[:checked]:text-white">
                    <input
                      {...register("gender", {
                        required: "Please select your gender",
                      })}
                      type="radio"
                      value="female"
                      className="sr-only"
                    />
                    <div className="flex items-center justify-center w-full">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      <span className="text-sm">Female</span>
                    </div>
                  </label>

                  <label className="flex items-center p-3 text-white bg-gray-700 border border-gray-600 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors has-[:checked]:bg-amber-500 has-[:checked]:border-amber-500 has-[:checked]:text-white">
                    <input
                      {...register("gender", {
                        required: "Please select your gender",
                      })}
                      type="radio"
                      value="other"
                      className="sr-only"
                    />
                    <div className="flex items-center justify-center w-full">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                        />
                      </svg>
                      <span className="text-sm">Other</span>
                    </div>
                  </label>
                </div>
                {errors.gender && (
                  <p className="text-red-400 text-xs mt-2 flex items-center">
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.gender.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="flex flex-col">
                <label
                  htmlFor="email_id"
                  className="text-sm font-medium text-gray-300 mb-1"
                >
                  Email Address *
                </label>
                <input
                  {...register("email_id", {
                    required: "Please enter email address",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  id="email_id"
                  placeholder="xyz@example.com"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                />
                {errors.email_id && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.email_id.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-300 mb-1"
                >
                  Password *
                </label>
                <input
                  {...register("password", {
                    required: "Please enter the password",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                />
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Create Account
              </button>

              {/* Additional Links */}
              <div className="text-center pt-4">
                <p className="text-gray-400 text-sm">
                  Already have an account?{" "}
                  <Link
                    to="/auth/login"
                    className="text-amber-500 hover:text-amber-400 font-medium transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Terms Notice */}
          <p className="text-gray-500 text-xs text-center mt-6">
            By creating an account, you agree to our Terms of Service and
            Privacy Policy.
          </p>
        </div>
      </div>
    </>
  );
}
