import React from 'react';

// Mock data - Replace with API call later
const mockProblems = [
  { _id: '1', title: 'Two Sum', difficultyLevel: 'Easy' },
  { _id: '2', title: 'Reverse Linked List', difficultyLevel: 'Easy' },
  { _id: '3', title: 'Validate BST', difficultyLevel: 'Medium' },
];

export default function ManageProblemsPanel() {
  // TODO: Fetch actual problems from API
  // TODO: Implement Edit functionality (likely opens a modal or new page)
  // TODO: Implement Delete functionality (with confirmation)

  return (
    <div className="bg-white p-8 rounded-xl sketch-border-1">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Problems</h1>

      {/* Add Search/Filter controls here later */}

      <div className="space-y-4">
        {mockProblems.map(problem => (
          <div key={problem._id} className="bg-slate-50 p-4 rounded-lg border-2 border-dashed flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">{problem.title}</h3>
              <span className="text-sm text-gray-600">{problem.difficultyLevel}</span>
            </div>
            <div className="space-x-2">
              <button className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded sketch-button">Edit</button>
              <button className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded sketch-button">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}