import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center p-4">
      <div className="w-full max-w-xs space-y-8 text-center">
        <h1 className="text-4xl font-bold text-black mb-8">
          Authentication + OTP Verification
        </h1>
        <br />
        <h1>Mern Stack</h1>
        <div className="space-y-4">
          <Link
            to="/login"
            className="block w-full px-6 py-3 text-lg font-semibold text-black bg-indigo-500 hover:bg-indigo-400 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-indigo-900/40"
          >
            Login{" "}
          </Link>
          <Link
            to="/register"
            className="block w-full px-6 py-3 text-lg font-semibold text-blackbg-purple-500 hover:bg-purple-400 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-900/40"
          >
            Register{" "}
          </Link>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default Home;
