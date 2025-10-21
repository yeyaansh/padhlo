import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { Adminlogin, loginUser } from "../../redux/authSlice";
import { useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";

// ## Reusable Components (Ideally, these would be in their own files) ##

const InputField = ({
  id,
  label,
  register,
  error,
  required = false,
  ...props
}) => (
  <div>
    <label htmlFor={id} className="text-sm font-bold text-gray-700 mb-1 block">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      id={id}
      {...register(id)}
      {...props}
      className={`w-full px-4 py-3 bg-slate-100 border-2 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 transition ${
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

const PasswordInputField = ({
  id,
  label,
  register,
  error,
  required = false,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <label htmlFor={id} className="text-sm font-bold text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <Link
          to="/auth/forgot-password"
          className="text-xs text-blue-600 hover:underline font-semibold"
        >
          Forgot password?
        </Link>
      </div>
      <div className="relative">
        <input
          id={id}
          {...register(id)}
          {...props}
          type={isPasswordVisible ? "text" : "password"}
          className={`w-full px-4 py-3 bg-slate-100 border-2 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 transition ${
            error
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-800 focus:ring-yellow-300"
          }`}
        />
        <button
          type="button"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-800"
          aria-label={isPasswordVisible ? "Hide password" : "Show password"}
        >
          {isPasswordVisible ? (
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

export default function AdminAuthLoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const loginSchema = z.object({
    email_id: z.email("Please enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    role: z.enum(["admin", "user"]).default("admin"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  function submitForm(value) {
    dispatch(Adminlogin(value));
  }

  return (
    <div className="min-h-screen bg-slate-50 font-['Comic_Neue'] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl sketch-border-1 shadow-2xl grid md:grid-cols-2 overflow-hidden">
        {/* Left Panel (Visual/Welcome) */}
        <div className="hidden md:flex flex-col items-center justify-center p-10 bg-blue-100 border-r-4 border-dashed border-gray-300">
          <h2 className="text-4xl font-bold text-gray-800 text-center">
            Welcome Back to the Sketchboard! - Admin
          </h2>
          <p className="mt-4 text-center text-gray-600">
            Pick up your laptop and let's change this world from your
            countributions. And make a creative world...
          </p>
          <div className="text-7xl mt-8">👋</div>
        </div>

        {/* Right Panel (Form) */}
        <div className="p-8 sm:p-12">
          <div className="text-center md:text-left mb-8">
            <h1 className="text-5xl font-bold text-gray-800">Sign In</h1>
            <p className="text-gray-600 mt-2">
              Hello Admin, let's get back to help people...
            </p>
          </div>

          <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
            <InputField
              id="email_id"
              label="Email Address"
              type="email"
              register={register}
              error={errors.email_id}
              placeholder="amisha@example.com"
              required
            />

            <PasswordInputField
              id="password"
              label="Password"
              register={register}
              error={errors.password}
              placeholder="•••••••••••••"
              required
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 px-6 py-4 bg-yellow-400 text-gray-900 text-xl font-bold rounded-lg sketch-button flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing In...
                </>
              ) : (
                "Continue Adventure"
              )}
            </button>
            <div className="flex items-center">
              <p className="text-center text-gray-600 text-sm pt-4">
                Don't have an account?{" "}
                <Link
                  to="/auth/register"
                  className="text-blue-600 hover:underline font-bold"
                >
                  Create Now
                </Link>
              </p>
              <p className="pt-4">&nbsp; | &nbsp;</p>
              <p className="text-center text-gray-600 text-xs  pt-4">
                User{" - "}
                <Link
                  to="/auth/login"
                  className="text-blue-600 hover:underline font-bold"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
