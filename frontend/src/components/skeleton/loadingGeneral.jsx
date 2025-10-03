
export default function LoadingGeneral(){
  return(<div className="flex flex-col items-center justify-center min-h-[70vh]">
        <span className="text-6xl animate-bounce">🧠</span>
        <p className="mt-4 text-2xl font-bold text-gray-700">
          Brewing Up Challenges...
        </p>
        <p className="text-gray-500 font-['Comic_Neue']">
          Please wait a moment!
        </p>
      </div>)
}