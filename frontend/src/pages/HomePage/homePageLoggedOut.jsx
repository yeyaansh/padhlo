import { Link } from "react-router";

//for logged-out users
const MockProblemCardLoggedOut = ({ problem }) => (
  <div className="bg-white rounded-xl sketch-border-1 p-5 text-left font-['Comic_Neue'] h-full">
    <h3 className="text-xl font-bold text-gray-800 line-clamp-2">
      {problem.title}
    </h3>
    <span
      className={`inline-block mt-2 px-3 py-1 text-xs font-bold rounded-full ${
        problem.difficulty === "Easy"
          ? "bg-emerald-200 text-emerald-800"
          : "bg-amber-200 text-amber-800"
      }`}
    >
      {problem.difficulty}
    </span>
    <div className="mt-4 flex flex-wrap gap-1">
      {problem.tags.map((tag) => (
        <span
          key={tag}
          className="text-xs bg-purple-200 text-purple-800 px-2 py-0.5 rounded-full"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
);

export default function HomepageLoggedOut() {
  const showcaseProblems = [
    {
      title: "Reverse a Linked List",
      difficulty: "Easy",
      tags: ["Linked List", "Pointers"],
    },
    {
      title: "Find Median from Data Stream",
      difficulty: "Hard",
      tags: ["Heaps", "Data Streams"],
    },
    { title: "Two Sum", difficulty: "Easy", tags: ["Arrays", "Hash Table"] },
  ];

  return (
    <div className="font-['Comic_Neue'] text-gray-800">
      {/* 1. Hero Section */}
      <section className="text-center py-20 px-4 bg-yellow-50">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-800">
          {/* Stop Grinding. Start Sketching. */}
          Stop Grinding. Start Enjoying.
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
          The fun, visual way to conquer coding challenges, import problems from
          any platform, and turn practice into play.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/auth/register"
            className="px-8 py-4 bg-yellow-400 text-gray-900 text-lg font-bold rounded-lg sketch-button"
          >
            Start Your Quest (Sign Up)
          </Link>
          <Link
            to="/auth/login"
            className="px-8 py-4 bg-purple-300 text-purple-900 text-lg font-bold rounded-lg sketch-button"
          >
            Continue Adventure (Login)
          </Link>
        </div>
        {/* <div className="mt-12 text-5xl">🎨✏️✨</div> */}
      </section>

      {/* 2. Features Section */}
      <section className="py-20 px-4">
        <h2 className="text-center text-4xl font-bold  mb-12">
          How Your Adventure Unfolds...
        </h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded-lg sketch-border-1">
            <div className="text-5xl mb-4">✏️</div>
            <h3 className="text-2xl font-bold mb-2">Sketch & Solve</h3>
            <p className="text-gray-600">
              Tackle challenges in our unique, playful interface. The 'Problem
              Dossier' view keeps you organized and focused.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg sketch-border-1">
            <div className="text-5xl mb-4">✨</div>
            <h3 className="text-2xl font-bold mb-2">Problem Osmosis</h3>
            <p className="text-gray-600">
              Found a problem elsewhere? Paste any URL and instantly import it
              into your personal collection.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg sketch-border-1">
            <div className="text-5xl mb-4">🗺️</div>
            <h3 className="text-2xl font-bold mb-2">Track Your Journey</h3>
            <p className="text-gray-600">
              Watch your skills grow with a visual progress tracker, earn
              badges, and maintain your streak.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Showcase Section */}
      <section className="py-20 px-4 bg-blue-50">
        <h2 className="text-center text-4xl font-bold mb-12">
          Peek Inside the Sketchbook...
        </h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {showcaseProblems.map((p, i) => (
            <div key={i} className="relative group">
              <MockProblemCardLoggedOut problem={p} />
              <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                <Link
                  to="/auth/register"
                  className="px-6 py-3 bg-yellow-400 text-gray-900 text-lg font-bold rounded-lg sketch-button"
                >
                  Unlock & Solve
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Final CTA */}
      <section className="text-center py-20 px-4">
        <h2 className="text-4xl md:text-5xl font-bold">
          Ready to Draw Your Path?
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Your sketchbook is empty and your first challenge is waiting.
        </p>
        <div className="mt-8">
          <Link
            to="/auth/register"
            className="px-10 py-5 bg-yellow-400 text-gray-900 text-xl font-bold  rounded-lg sketch-button"
          >
            Sign Up For Free
          </Link>
        </div>
      </section>
    </div>
  );
}