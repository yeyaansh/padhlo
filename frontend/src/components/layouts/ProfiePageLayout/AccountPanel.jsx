import React from 'react';

// You would reuse your InputField component from the register page
const InputField = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-bold text-gray-700 mb-1 block">{label}</label>
    <input {...props} className="w-full px-4 py-3 bg-slate-100 border-2 border-gray-800 rounded-lg" />
  </div>
);

export default function AccountPanel({ user }) {
  return (
    <div className="bg-white p-8 rounded-xl sketch-border-1 space-y-8">
      <div>
        <h2 className="text-2xl font-['Permanent_Marker'] text-gray-800">Profile Information</h2>
        <div className="mt-4 grid sm:grid-cols-2 gap-6">
          <InputField label="Username" type="text" defaultValue={user.username} />
          <InputField label="Email Address" type="email" defaultValue={user.email} disabled />
        </div>
        <button className="mt-4 px-6 py-2 bg-yellow-400 text-gray-900 font-['Permanent_Marker'] rounded-lg sketch-button">
          Save Changes
        </button>
      </div>
      <hr className="border-dashed border-gray-300" />
      <div>
        <h2 className="text-2xl font-['Permanent_Marker'] text-gray-800">Change Password</h2>
        <div className="mt-4 grid sm:grid-cols-2 gap-6">
          <InputField label="New Password" type="password" placeholder="••••••••" />
          <InputField label="Confirm New Password" type="password" placeholder="••••••••" />
        </div>
         <button className="mt-4 px-6 py-2 bg-yellow-400 text-gray-900 font-['Permanent_Marker'] rounded-lg sketch-button">
          Update Password
        </button>
      </div>
    </div>
  );
}