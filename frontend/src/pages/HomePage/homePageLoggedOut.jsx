// HomepageSketchbookFinal.jsx
import React from "react";
import { Link } from "react-router";

/* Small decorative SVGs (marker strokes) */
function MarkerScribble({ className = "", color = "#0ea5e9" }) {
  return (
    <svg
      className={className}
      width="140"
      height="28"
      viewBox="0 0 140 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M2 16c24-14 60-12 98-2 20 5 36 8 40 6"
        stroke="#111"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.95"
      />
      <path
        d="M10 20c30-8 70-6 120 2"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="3 4"
        opacity="0.85"
      />
    </svg>
  );
}

function DoodleArrow({ className = "", color = "#0ea5e9" }) {
  return (
    <svg
      className={className}
      width="110"
      height="36"
      viewBox="0 0 110 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4 18 C28 2, 72 2, 100 18"
        stroke="#111"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="4 3"
      />
      <path
        d="M98 16 L108 18 L98 20"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Polaroid frame component for polaroid-like rotated screenshots */
function Polaroid({ src, alt, rotate = 0, width = "100%", caption = null }) {
  const rot = `rotate(${rotate}deg)`;
  return (
    <div className="relative inline-block" style={{ transform: rot }}>
      <div className="bg-white p-3 rounded-md sketch-border-1 shadow-[8px_8px_0_rgba(0,0,0,0.12)]">
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-cover rounded-sm block"
          loading="lazy"
        />
        {caption && <div className="mt-2 text-xs text-gray-600">{caption}</div>}
      </div>
      {/* little tape at top */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-3">
        <div className="w-14 h-4 rounded-sm bg-yellow-100 border border-gray-300 transform rotate-[-6deg] shadow-sm" />
      </div>
    </div>
  );
}

export default function HomepageSketchbookFinal() {
  return (
    <div className="min-h-screen font-['Comic_Neue'] text-gray-900 bg-[linear-gradient(#fffaf0,#fbfbfd)]">
      {/* Page container */}
      <div className="max-w-7xl mx-auto">
        {/* HERO */}
        <header className="px-6 md:px-12 lg:px-20 py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left text column */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-3">
              <div className="text-sm px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 sketch-border-1">
                Sketchbook
              </div>
              <div className="text-xs text-gray-600">Designer’s edition</div>
            </div>

            <h1 className="mt-6 text-4xl md:text-5xl font-extrabold leading-tight">
              A designer’s sketchbook for problem solvers.
              <span className="block text-blue-600 mt-1">
                Code in our editor. Collect from anywhere. Practice beautifully.
              </span>
            </h1>

            <p className="mt-4 text-gray-700 max-w-xl">
              SketchEditor pairs a live multi-language editor and gentle AI
              hints with powerful organization tools. Import problems' metadata
              from other sites using Osmosis and keep your study flow in one
              playful workspace.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 items-start">
              <Link
                to="/auth/register"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg sketch-button font-bold"
              >
                Start Sketching — Free
              </Link>
              <Link
                to="/auth/login"
                className="inline-block px-6 py-3 bg-white border border-gray-200 rounded-lg sketch-button font-bold"
              >
                Log in
              </Link>
            </div>

            <div className="mt-6 flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-gray-100 rounded">JS</span>
                <span className="px-2 py-1 bg-gray-100 rounded">Python</span>
                <span className="px-2 py-1 bg-gray-100 rounded">Java</span>
                <span className="px-2 py-1 bg-gray-100 rounded">C++</span>
              </div>
              <div className="text-xs text-gray-500">
                • AI hints (no full solutions)
              </div>
            </div>
          </div>

          {/* Right visual column (polaroid stack) */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
            {/* background faint paper clip doodle */}
            <div className="absolute -left-6 -top-6 opacity-30 hidden md:block">
              <MarkerScribble className="opacity-90" color="#0ea5e9" />
            </div>

            <div className="relative w-full max-w-[520px]">
              <div className="absolute -right-8 -top-6 hidden md:block">
                <Polaroid
                  src="/assets/problems-grid.png"
                  alt="Problems grid"
                  rotate={-8}
                  width="220px"
                  caption="Problems listing"
                />
              </div>

              <div className="relative">
                <Polaroid
                  src="/assets/live-editor.png"
                  alt="Live editor"
                  rotate={0}
                  width="100%"
                  caption="Live editor — run & test · AI hints"
                />
                {/* hint bubble mock */}
                <div className="absolute right-6 bottom-6 bg-white p-2 rounded-md sketch-border-1 text-sm max-w-[220px]">
                  <div className="font-bold text-sm">Hint</div>
                  <div className="text-xs text-gray-700">
                    Check boundary conditions for empty input arrays.
                  </div>
                </div>
              </div>

              <div className="absolute -left-6 bottom-[-18px] hidden md:block">
                <div className="transform rotate-6">
                  <Polaroid
                    src="/assets/osmosis-card.png"
                    alt="Osmosis preview"
                    rotate={6}
                    width="180px"
                    caption="Osmosis card preview"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Hosted Problems section — primary */}
        <section className="px-6 md:px-12 lg:px-20 py-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                Hosted Problems — solve directly in SketchEditor
              </h2>
              <Link
                to="/problem/all"
                className="text-sm text-blue-600 underline"
              >
                Browse all problems
              </Link>
            </div>
            <p className="mt-2 text-gray-600 max-w-2xl">
              Open, edit, run, and submit — our problems are hosted and can be
              solved right inside the editor.
            </p>

            {/* three cards grid */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card A */}
              <article className="bg-white rounded-xl p-5 sketch-border-1 shadow-lg">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold">Reverse a String</h3>
                  <span className="px-2 py-1 rounded-full difficulty-easy-icon text-xs">
                    easy
                  </span>
                </div>
                <div className="mt-3 text-sm text-gray-600">
                  Acceptance: 72%
                </div>
                <div className="mt-3 flex gap-2 flex-wrap">
                  <span className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded-full">
                    strings
                  </span>
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <Link
                    to="/problem/all"
                    className="px-4 py-2 bg-yellow-400 rounded-lg sketch-button font-bold"
                  >
                    Let's Code!
                  </Link>
                  <div className="text-xs text-gray-500">Asked in: Meta</div>
                </div>
              </article>

              {/* Card B */}
              <article className="bg-white rounded-xl p-5 sketch-border-1 shadow-lg">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold">
                    Find Median from Data Stream
                  </h3>
                  <span className="px-2 py-1 rounded-full difficulty-hard-icon text-xs">
                    hard
                  </span>
                </div>
                <div className="mt-3 text-sm text-gray-600">
                  Acceptance: 38%
                </div>
                <div className="mt-3 flex gap-2 flex-wrap">
                  <span className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded-full">
                    heaps
                  </span>
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <Link
                    to="/problem/all"
                    className="px-4 py-2 bg-yellow-400 rounded-lg sketch-button font-bold"
                  >
                    Let's Code!
                  </Link>
                  <div className="text-xs text-gray-500">
                    Asked in: Bloomberg
                  </div>
                </div>
              </article>

              {/* Card C */}
              <article className="bg-white rounded-xl p-5 sketch-border-1 shadow-lg">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold">Two Sum</h3>
                  <span className="px-2 py-1 rounded-full difficulty-easy-icon text-xs">
                    easy
                  </span>
                </div>
                <div className="mt-3 text-sm text-gray-600">
                  Acceptance: 84%
                </div>
                <div className="mt-3 flex gap-2 flex-wrap">
                  <span className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded-full">
                    arrays
                  </span>
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <Link
                    to="/problem/all"
                    className="px-4 py-2 bg-yellow-400 rounded-lg sketch-button font-bold"
                  >
                    Let's Code!
                  </Link>
                  <div className="text-xs text-gray-500">Asked in: Amazon</div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Osmosis — secondary but prominent */}
        <section className="px-6 md:px-12 lg:px-20 py-10 bg-blue-50">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold">
                Osmosis — collect problems from anywhere
              </h2>
              <p className="mt-3 text-gray-700 max-w-xl">
                Paste a link from LeetCode, GfG, HackerRank, Codeforces, SPOJ,
                CodingNinjas, InterviewBit, and more. Osmosis imports metadata
                only (title, difficulty, tags, companies when available) and
                saves a tidy problem card to your playlists. Click the card to
                open the original site and solve there.
              </p>

              <ol className="mt-4 list-decimal list-inside text-gray-700 space-y-2">
                <li>Paste link → fetch metadata (when available).</li>
                <li>Save to an Osmosis playlist for review.</li>
                <li>
                  Open the original site to solve — we don't host full text or
                  allow solving to avoid copyright issues.
                </li>
              </ol>

              <div className="mt-6 flex items-center gap-3">
                <Link
                  to="/osmosis"
                  className="px-5 py-3 bg-blue-600 text-white rounded-lg sketch-button font-bold"
                >
                  Open Osmosis
                </Link>
                <div className="text-sm text-gray-500">
                  Osmosis playlists contain imported problems only.
                </div>
              </div>
            </div>

            <div>
              <div className="relative bg-white rounded-xl p-4 sketch-border-1">
                <Polaroid
                  src="/assets/osmosis-card.png"
                  alt="Osmosis card example"
                  rotate={5}
                  caption="Imported metadata card"
                />
                {/* blue accent annotation */}
                <div className="absolute -top-3 right-6">
                  <div className="bg-white px-2 py-1 rounded-full sketch-border-1 text-xs">
                    metadata only
                  </div>
                </div>
                <div className="mt-3 text-xs text-gray-600">
                  Clicking "Open on original site" takes you to the official
                  platform to solve.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Playlists & Progress */}
        <section className="px-6 md:px-12 lg:px-20 py-10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold">
                Playlists — your study sketchbook
              </h2>
              <p className="mt-3 text-gray-700">
                Group problems into themed playlists. Track accuracy per
                playlist and re-open original links when you want to practice.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl sketch-border-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold">Solve Later</div>
                      <div className="text-xs text-gray-500">
                        Personal playlist
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">8 problems</div>
                  </div>
                  <div className="mt-3 text-xs text-gray-600">Accuracy</div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="h-4 rounded-full bg-blue-600"
                      style={{ width: "67%" }}
                    />
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl sketch-border-1">
                  <img
                    src="/assets/playlist.png"
                    alt="Playlist"
                    className="w-full rounded-md object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl sketch-border-1">
              <h3 className="text-lg font-bold">Track progress</h3>
              <p className="mt-2 text-gray-700 text-sm">
                See solved vs attempted, watch accuracy improve, and keep a
                streak going (streaks coming soon).
              </p>

              <div className="mt-6">
                <div className="text-xs text-gray-600">Accuracy (overall)</div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="h-4 rounded-full bg-blue-600"
                    style={{ width: "54%" }}
                  />
                </div>

                <div className="mt-4 text-sm">
                  Solved: <strong>42</strong> · Attempted: <strong>78</strong>
                </div>

                <div className="mt-6 flex gap-3">
                  <Link
                    to="/auth/register"
                    className="px-4 py-2 bg-blue-600 text-white rounded sketch-button font-bold"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/auth/login"
                    className="px-4 py-2 bg-white border rounded sketch-button"
                  >
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* final CTA */}
        <section className="px-6 md:px-12 lg:px-20 py-12 bg-gradient-to-b from-white to-[#fff8ec]">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold">
              Ready to build your sketchbook?
            </h3>
            <p className="mt-2 text-gray-700">
              Import, collect, practice, and track — all in one playful
              workspace.
            </p>

            <div className="mt-6">
              <Link
                to="/auth/register"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg sketch-button font-bold"
              >
                Create an account — it’s free
              </Link>
            </div>

            <div className="mt-6 flex justify-center">
              <DoodleArrow className="mx-auto" />
            </div>
          </div>
        </section>

        {/* footer */}
        <footer className="py-8 text-center text-gray-600">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-1">
              <span className="text-2xl"> ©</span>
              <span className="text-md">
                {new Date().getFullYear()} Sketch Editor
              </span>
            </div>
            <div className="text-sm text-gray-500">
              Paste links, sketch ideas, solve problems — Osmosis imports
              metadata only.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
