import { useParams } from "react-router";

import { useState, useEffect, useMemo, useCallback } from 'react';
import axiosClient from '../../axiosClient';

// Import the helper components we'll create below
import PlaylistHeader from "./PlaylistHeader";
import ProblemListItem from "./ProblemListItem";
import PlaylistPageSkeleton from "../../components/skeleton/playlistPageSkeleton";
import FilterZone from "./FilterZone";

// ## NEW ##: State to hold the current filter values
export default function PlaylistPageById() {
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { playlistId } = useParams();
  // console.log("playlist hai...");
  // console.log(playlist);
  



  const [filters, setFilters] = useState({
    difficulty: 'all',
    topic: 'all',
    status: 'all',
    sortBy: 'dateAdded',
  });

// ## UPDATED ##: Wrap handleFilterChange in useCallback
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []); // Empty dependency array means this function never changes

  // ## NEW ##: Memoized calculation of filtered problems
 // ## UPDATED ##: Correct dependency for useMemo
  const filteredAndSortedProblems = useMemo(() => {
    let problems = playlist?.playlistInfo?.problemStore || [];

    // Apply filters
    if (filters.difficulty !== 'all') {
      problems = problems.filter(p => p.difficultyLevel?.toLowerCase() === filters.difficulty);
    }
    if (filters.topic !== 'all') {
      problems = problems.filter(p => p.tags?.includes(filters.topic));
    }
    // TODO: Add filtering for 'status'

    // Apply sorting (example logic, adjust as needed)
    // (Sorting logic from previous example remains here...)
    switch (filters.sortBy) {
        case 'difficultyAsc':
            problems.sort((a,b)=>{/*...*/}); break;
        case 'difficultyDesc':
            problems.sort((a,b)=>{/*...*/}); break;
        // ... other cases
    }


    return problems;
    // ## CORRECTED DEPENDENCY ##: Use the actual data source
  }, [playlist?.playlistInfo?.problemStore, filters]);




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
        <PlaylistHeader playlist={playlist?.playlistInfo} />
        
      <FilterZone playlist={playlist?.playlistInfo} onFilterChange={handleFilterChange}/>
        {/* List of Problems Section */}
        <div className="mt-8">
          {/* <h2 className="text-3xl font-bold text-gray-800 mb-4">Problems in this Sketchbook</h2> */}
          <div className="space-y-4">
            {/* ## UPDATED ##: Map over filteredAndSortedProblems */}
            {filteredAndSortedProblems.length > 0 ? (
              filteredAndSortedProblems.map(problem => (
                <ProblemListItem key={problem._id} problem={problem} />
              ))
            ) : (
              // ## UPDATED ##: More specific empty state message
              <p className="text-center text-gray-500 py-10 font-semibold">
                {playlist?.playlistInfo?.problemStore?.length === 0
                  ? "This playlist is empty!"
                  : "No problems match the current filters."}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}