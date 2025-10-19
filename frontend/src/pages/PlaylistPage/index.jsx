import { useParams } from "react-router";

import { useState, useEffect } from 'react';
import axiosClient from '../../axiosClient';

// Import the helper components we'll create below
import PlaylistHeader from "./PlaylistHeader";
import ProblemListItem from "./ProblemListItem";
import PlaylistPageSkeleton from "../../components/skeleton/playlistPageSkeleton";

export default function PlaylistPageById() {
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { playlistId } = useParams();

  useEffect(() => {
    async function fetchPlaylist() {
      try {
        const response = await axiosClient.get(`/playlist/id/${playlistId}`);
        console.log(response.data)
        if (response.data.success === false) {
          throw new Error("Playlist not found.");
        }
        setPlaylist(response.data);
      } catch (err) {
        console.error("Failed to fetch playlist:", err);
        setError(err.message || "Could not load the playlist.");
      } finally {
        setLoading(false);
      }
    }
    fetchPlaylist();
  }, [playlistId]);

  if (loading) return <PlaylistPageSkeleton />;
//   if (error) return <ErrorState message={error} />;
//   if (!playlist) return <ErrorState message="Playlist data is unavailable." />;

  return (
    <div className="bg-slate-50 min-h-screen p-4 sm:p-8 font-['Comic_Neue']">
      <div className="max-w-4xl mx-auto">
        {/* Playlist Header Section */}
        <PlaylistHeader playlist={playlist.playlistInfo} />

        {/* List of Problems Section */}
        <div className="mt-8">
          {/* <h2 className="text-3xl font-bold text-gray-800 mb-4">Problems in this Sketchbook</h2> */}
          <div className="space-y-4">
            {playlist?.playlistInfo?.problemStore?.length > 0 ? (
              playlist?.playlistInfo.problemStore.map(problem => (
                <ProblemListItem key={problem._id} problem={problem} />
              ))
            ) : (
              <p className="text-center text-gray-500 py-10">This playlist is empty!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}