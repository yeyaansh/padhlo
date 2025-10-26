import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axiosClient from "../../../../../axiosClient"; // Your configured axios instance
import axios from "axios"; // Plain axios for Cloudinary upload

// --- Zod Schema for File Input ---
const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB
const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime", "video/ogg"];

const videoFileSchema = z.object({
  videoFile: z
    .any()
    .refine((files) => files?.length === 1, "Please select a video file.")
    .refine((files) => files?.[0]?.size <= MAX_VIDEO_SIZE, `Max video size is 50MB.`)
    .refine((files) => ACCEPTED_VIDEO_TYPES.includes(files?.[0]?.type), "Unsupported video format."),
});

// --- Main Modal Component ---
export default function UploadVideoModal({ problemId, problemTitle, onClose, onUploadSuccess }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false); // For drag-and-drop UI
  const fileInputRef = useRef(null);


console.log("problemID: ",problemId);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(videoFileSchema),
  });

  const videoFile = watch("videoFile");
  const selectedFile = videoFile?.[0];

  // Animation and Escape key listener
  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(true), 10);
    const handleEsc = (event) => { if (event.keyCode === 27 && !isUploading) handleClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => { clearTimeout(timer); window.removeEventListener('keydown', handleEsc); };
  }, [isUploading]);

  const handleClose = () => {
    if (isUploading) return;
    setIsAnimating(false);
    setTimeout(onClose, 300);
  };

  // Main Upload Logic
  const onSubmit = async (data) => {
    const file = data.videoFile[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);
    const uploadToastId = toast.loading("Preparing upload...");

    try {
      // 1. Get Signature from Your Backend
      toast.loading("Fetching upload signature...", { id: uploadToastId });
      const sigResponse = await axiosClient.get(`/video/create/${problemId}`);
      const { signature, timestamp, public_id, api_key, cloud_name, upload_url } = sigResponse.data;

      if (!signature || !timestamp || !public_id || !api_key || !upload_url) {
        throw new Error("Invalid signature data received from server.");
      }

      // 2. Prepare FormData for Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("public_id", public_id);
      formData.append("api_key", api_key);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);

      // 3. Upload Directly to Cloudinary
      toast.loading("Uploading video: 0%", { id: uploadToastId });
      const cloudinaryResponse = await axios.post(upload_url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
          toast.loading(`Uploading video: ${percentCompleted}%`, { id: uploadToastId });
        },
      });

      const { secure_url, duration, format, bytes, width, height } = cloudinaryResponse.data;

      // 4. Save Cloudinary URL and metadata to Your Backend
      toast.loading("Linking video to problem...", { id: uploadToastId });
      await axiosClient.post(`/video/save`, {
        problemId,
        cloudinaryPublicId: public_id,
        secureUrl: secure_url,
        duration, format, bytes, width, height
      });

      // 5. Success!
      toast.success("Video Upload Complete!", { id: uploadToastId });
      onUploadSuccess(problemId, secure_url);
    } catch (error) {
      console.error("Upload failed:", error);
      const errorMessage = error.response?.data?.error?.message || error.message || "Upload failed. Please try again.";
      toast.error(errorMessage, { id: uploadToastId });
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  // Drag and Drop Handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setIsDragging(true);
    else if (e.type === "dragleave") setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0] && !isUploading) {
      setValue("videoFile", e.dataTransfer.files, { shouldValidate: true });
    }
  };

  // This merges the ref from `register` with our own `fileInputRef`
  const { ref: registerRef, ...restRegister } = register("videoFile");

  // Helper to format file size
  const formatBytes = (bytes, decimals = 2) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-200 ease-in-out font-['Comic_Neue'] ${
        isAnimating ? "bg-black/60 opacity-100" : "bg-black/0 opacity-0"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white w-full max-w-lg rounded-2xl sketch-border-1 p-8 transition-all duration-300 ease-in-out delay-100 ${
          isAnimating ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Upload Video for "{problemTitle}"</h2>
          <button onClick={handleClose} disabled={isUploading} className="text-gray-500 hover:text-gray-800 text-2xl disabled:opacity-50">&times;</button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Drag and Drop UI */}
          <div
            onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
            onClick={() => !isUploading && fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              !isUploading ? 'cursor-pointer' : 'cursor-not-allowed opacity-70'
            } ${
              isDragging ? 'border-yellow-400 bg-yellow-50' :
              errors.videoFile ? 'border-red-500 bg-red-50' :
              'border-gray-400 hover:border-gray-600 hover:bg-slate-50'
            }`}
          >
            <input
              id="videoFile" type="file"
              accept={ACCEPTED_VIDEO_TYPES.join(",")}
              {...restRegister}
              ref={(e) => {
                registerRef(e);
                fileInputRef.current = e;
              }}
              className="sr-only"
              disabled={isUploading}
            />

            {!selectedFile ? (
              <div className="flex flex-col items-center pointer-events-none">
                <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                <p className="mt-2 text-sm text-gray-600">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">MP4, WebM, MOV, OGG (Max 50MB)</p>
              </div>
            ) : (
              <div className="flex flex-col items-center pointer-events-none">
                <p className="text-sm font-bold text-gray-800 break-all">{selectedFile.name}</p>
                <p className="text-xs text-gray-500">{formatBytes(selectedFile.size)}</p>
                {!isUploading && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setValue("videoFile", null, { shouldValidate: true });
                    }}
                    className="mt-2 text-xs text-red-600 hover:underline font-semibold pointer-events-auto"
                  >
                    Remove file
                  </button>
                )}
              </div>
            )}
          </div>
          {errors.videoFile && <p className="text-red-600 text-xs font-semibold -mt-2">{errors.videoFile.message}</p>}

          {/* Progress Bar */}
          {isUploading && (
            <div className="w-full">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-yellow-400 h-2.5 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
              </div>
              <p className="text-xs text-center text-gray-600 mt-1">{uploadProgress}% Uploaded</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-2">
            <button type="button" onClick={handleClose} disabled={isUploading} className="px-6 py-2 bg-gray-200 text-gray-800 font-bold rounded-lg sketch-button disabled:opacity-50">Cancel</button>
            <button type="submit" disabled={isUploading || !selectedFile} className="px-6 py-2 bg-yellow-400 text-gray-900 font-bold rounded-lg sketch-button disabled:bg-gray-400 disabled:cursor-not-allowed">
              {isUploading ? 'Uploading...' : 'Upload & Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}