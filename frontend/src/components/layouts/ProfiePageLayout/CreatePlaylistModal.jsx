import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosClient from "../../../axiosClient/index";
import { toast } from "sonner";
import { useState } from "react";
// ## Reusable Components Refactored for React Hook Form ##

const ToggleSwitch = ({ watch, setValue }) => {
  const isPlaylistPublic = watch("isPlaylistPublic");
  return (
    <div>
      <label className="text-sm font-bold text-gray-700 mb-2 block">
        Visibility
      </label>
      <div className="flex items-center gap-4 p-1 bg-slate-200 rounded-lg">
        <button
          type="button"
          onClick={() => setValue("isPlaylistPublic", true)}
          className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${
            isPlaylistPublic ? "bg-white shadow" : "text-gray-600"
          }`}
        >
          Public
        </button>
        <button
          type="button"
          onClick={() => setValue("isPlaylistPublic", false)}
          className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${
            !isPlaylistPublic ? "bg-white shadow" : "text-gray-600"
          }`}
        >
          Private
        </button>
      </div>
    </div>
  );
};

// const ImageUploadField = ({ label, name, watch, setValue, error }) => {
//   const file = watch(name);
//   const preview = file ? URL.createObjectURL(file) : null;

//   return (
//     <div>
//       <label className="text-sm font-bold text-gray-700 mb-2 block">
//         {label}
//       </label>
//       <div className="flex items-center gap-4">
//         <div className="w-16 h-16 bg-slate-100 rounded-lg border-2 border-dashed flex items-center justify-center">
//           {preview ? (
//             <img
//               src={preview}
//               alt="Preview"
//               className="w-full h-full object-cover rounded-md"
//             />
//           ) : (
//             <span className="text-2xl">🖼️</span>
//           )}
//         </div>
//         <label className="cursor-pointer px-4 py-2 bg-slate-200 text-gray-800 text-sm font-bold rounded-lg sketch-button">
//           Choose File
//           <input
//             type="file"
//             accept="image/png, image/jpeg, image/webp"
//             className="sr-only"
//             onChange={(e) => setValue(name, e.target.files[0])}
//           />
//         </label>
//       </div>
//       {error && (
//         <p className="text-red-600 text-xs font-semibold mt-1">
//           {error.message}
//         </p>
//       )}
//     </div>
//   );
// };

// ## Zod Schema Definition ##
// const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
// const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const playlistSchema = z.object({
  playlistName: z
    .string()
    .min(3, { message: "Name must be at least 3 characters." }),
  playlistDescription: z.string().optional(),
  isPlaylistPublic: z.boolean().default(true),
  //   playlistProfileImage: z
  //     .any()
  //     .optional()
  //     .refine(
  //       (file) => !file || file.size <= MAX_FILE_SIZE,
  //       `Max file size is 2MB.`
  //     )
  //     .refine(
  //       (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
  //       "Only .jpg, .png, and .webp formats are supported."
  //     ),
  //   playlistCoverImage: z
  //     .any()
  //     .optional()
  //     .refine(
  //       (file) => !file || file.size <= MAX_FILE_SIZE,
  //       `Max file size is 2MB.`
  //     )
  //     .refine(
  //       (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
  //       "Only .jpg, .png, and .webp formats are supported."
  //     ),
});

export default function CreatePlaylistModal({ onClose }) {
  const [isAnimating, setIsAnimating] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(playlistSchema),
    defaultValues: { isPlaylistPublic: true },
  });

  // ## NEW ##: A close handler that can trigger exit animations in the future
  const handleClose = () => {
    // setIsAnimating(false);
    setTimeout(onClose, 200); // Match the longest duration
  };

  const onSubmit = async (data) => {
    const createdPlaylist = await axiosClient.post("/playlist/create", {
      ...data,
    });
    if (createdPlaylist.data.success == true) {
      toast.success(`${createdPlaylist.data.message}`);
    } else {
      toast.warning(`${createdPlaylist.data.message}`);
    }
    console.log("Submitting Playlist:", data);
    handleClose();
    // onClose(); //// Close modal after submission
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(true), 10);
    const handleEsc = (event) => {
      if (event.keyCode === 27) handleClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    // ## UPDATED ##: Backdrop with transition classes
    <div
      onClick={handleClose}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 font-['Comic_Neue'] transition-opacity duration-200 ease-in-out
          ${isAnimating ? "bg-black/60 opacity-100" : "bg-black/0 opacity-0"}
        `}
    >
      {/* ## UPDATED ##: Modal panel now slides up and has a slightly longer, delayed animation */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white w-full max-w-lg rounded-2xl sketch-border-1 p-8 transition-all duration-200 ease-in-out delay-200
          ${
            isAnimating
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-50 translate-y-4"
          }
        `}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Create a New Playlist
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-800 text-2xl"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label
              htmlFor="playlistName"
              className="text-sm font-bold text-gray-700 mb-1 block"
            >
              Playlist Name
            </label>
            <input
              id="playlistName"
              {...register("playlistName")}
              className="w-full px-4 py-3 bg-slate-100 border-2 border-gray-800 rounded-lg"
            />
            {errors.playlistName && (
              <p className="text-red-600 text-xs font-semibold mt-1">
                {errors.playlistName.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="playlistDescription"
              className="text-sm font-bold text-gray-700 mb-1 block"
            >
              Description
            </label>
            <textarea
              id="playlistDescription"
              {...register("playlistDescription")}
              className="w-full px-4 py-3 bg-slate-100 border-2 border-gray-800 rounded-lg h-24 resize-none"
            />
          </div>

          {/* <div className="grid sm:grid-cols-2 gap-5">
            <ImageUploadField
              label="Profile Image"
              name="playlistProfileImage"
              watch={watch}
              setValue={setValue}
              error={errors.playlistProfileImage}
            />
            <ImageUploadField
              label="Cover Image"
              name="playlistCoverImage"
              watch={watch}
              setValue={setValue}
              error={errors.playlistCoverImage}
            />
          </div> */}

          <ToggleSwitch watch={watch} setValue={setValue} />

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 bg-gray-200 text-gray-800 font-bold rounded-lg sketch-button"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-yellow-400 text-gray-900 font-bold rounded-lg sketch-button"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
