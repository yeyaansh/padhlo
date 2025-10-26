import React, { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
// import axiosClient from '../../axiosClient'; // Uncomment for real API calls

// Import the modular components
import UploadVideoModal from "./helper/uploadVideoModal.jsx"; // Adjust path if needed
import ProblemVideoCard from "./helper/problemVideoCard.jsx"; // Adjust path if needed
import ManagementListSkeleton from "./helper/managementSkeleton.jsx"; // Adjust path if needed
import axiosClient from "../../../../axiosClient/index.js";

// Mock data (keep for testing or remove when using API)
// const MOCK_PROBLEMS_LIST = [
//   {
//     _id: "68d7de1c145901efe52cd50d",
//     title: "Two Sum Challenge",
//     createdAt: "2025-10-25T10:00:00.000Z",
//     videoUrl: null,
//   },
//   {
//     _id: "68d6b2f376ce1facac6fb6cf",
//     title: "Reverse a Linked List",
//     createdAt: "2025-10-24T11:30:00.000Z",
//     videoUrl: "https://www.youtube.com/embed/example2",
//   },
//   {
//     _id: "68d6b38076ce1facac6fb6de",
//     title: "Validate Binary Search Tree",
//     createdAt: "2025-10-22T09:45:00.000Z",
//     videoUrl: null,
//   },
//   {
//     _id: "68d7de1c145901efe52cd50d",
//     title: "Container With Most Water",
//     createdAt: "2025-10-20T15:20:00.000Z",
//     videoUrl: "https://www.youtube.com/embed/example3",
//   },
// ];

export default function VideoSubmissionsPanel() {
  const [problems, setProblems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);

  useEffect(() => {
    const fetchProblems = async () => {
      setLoading(true);
      try {
        // --- REAL API CALL ---
        const response = await axiosClient.get(
          "/user/admin/createdProblemList"
        );
        console.log("response for admin's created problems", response.data);
        // setProblems(response.data);
        // ---
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setProblems(response.data.result);
      } catch (err) {
        toast.error(`${err.message}` || "Could not load problems list.");
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  const filteredProblems = useMemo(() => {
    if (!searchQuery) return problems;
    return problems.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [problems, searchQuery]);

  // --- Handlers remain the same ---
  const handleOpenUploadModal = (problem) => {
    setSelectedProblem(problem);
    setIsModalOpen(true);
  };

  const handleVideoAdd = async ({ videoUrl }) => {
    if (!selectedProblem) return;
    console.log(
      `Adding URL: ${videoUrl} for problem ID: ${selectedProblem._id}`
    );
    const promise = new Promise((resolve) => setTimeout(resolve, 1500));
    toast.promise(promise, {
      loading: "Saving video link...",
      success: () => {
        setProblems((prev) =>
          prev.map((p) =>
            p._id === selectedProblem._id ? { ...p, videoUrl } : p
          )
        );
        setIsModalOpen(false);
        return "Video link saved!";
      },
      error: (err) => "Failed to save video.",
    });
  };

  const handleVideoDelete = async (videoID) => {
    if (
      window.confirm(
        `Are you sure you want to delete the video for problem ID ${videoID}?`
      )
    ) {
      console.log(`Initiating delete for video ID: ${videoID}`);

      // Create the promise by calling the delete function, DON'T await it here.
      const promiseToDelete = axiosClient.delete(`/video/delete/${videoID}`);
      toast.promise(promiseToDelete, {
        loading: "Deleting video...",
        success: () => {
          setProblems((prev) =>
            prev.map((p) =>
              p.videoURL === videoID ? { ...p, videoURL: null } : p
            )
          );
          return "Video deleted!";
        },
        error: (err) => "Failed to delete video.",
      });
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl sketch-border-1">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Manage Video Solutions
      </h1>

      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search problems by title..."
          className="w-full px-4 py-3 bg-slate-100 border-2 border-gray-800 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-300 transition"
        />
      </div>

      <div className="space-y-4">
        {loading && <ManagementListSkeleton />}
        {!loading &&
          filteredProblems.length > 0 &&
          filteredProblems.map((problem) => (
            <ProblemVideoCard
              key={problem._id}
              problem={problem}
              onUpload={() => handleOpenUploadModal(problem)}
              onDelete={() => handleVideoDelete(problem.videoURL)}
            />
          ))}
        {!loading && filteredProblems.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            <p className="text-5xl mb-2">🤷</p>
            <p className="font-bold">
              {searchQuery
                ? "No problems match search."
                : "No problems created yet."}
            </p>
          </div>
        )}
      </div>

      {isModalOpen && selectedProblem && (
        <UploadVideoModal
          problemTitle={selectedProblem.title}
          problemId={selectedProblem._id || ""}
          onClose={() => setIsModalOpen(false)}
          onUploadSuccess={handleVideoAdd}
        />
      )}
    </div>
  );
}
