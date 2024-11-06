import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/member/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, password }),
      });
      const data = await response.json();
      if (data.status === "OK") {
        localStorage.setItem("token", data.token);
        navigate("/service");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-lg w-full">
        <div
          style={{
            boxShadow:
              "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
          className="bg-white rounded-lg shadow-xl overflow-hidden"
        >
          <div className="p-8">
            <h2 className="text-center text-3xl font-extrabold text-gray-800">
              Welcome Back
            </h2>
            <p className="mt-4 text-center text-gray-500">
              Sign in to continue
            </p>
            {error && (
              <div className="text-red-500 text-center mt-2">
                {error}
              </div>
            )}
            <form onSubmit={handleLogin} className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm">
                <div>
                  <label className="sr-only" htmlFor="id">
                    ID
                  </label>
                  <input
                    placeholder="ID"
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-300 bg-gray-100 text-gray-800 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    required
                    autoComplete="id"
                    type="text"
                    name="id"
                    id="id"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <label className="sr-only" htmlFor="password">
                    Password
                  </label>
                  <input
                    placeholder="Password"
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-300 bg-gray-100 text-gray-800 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    required
                    autoComplete="current-password"
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <input
                    className="h-4 w-4 text-indigo-500 focus:ring-indigo-400 border-gray-300 rounded"
                    type="checkbox"
                    name="remember-me"
                    id="remember-me"
                  />
                  <label
                    className="ml-2 block text-sm text-gray-600"
                    htmlFor="remember-me"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    className="font-medium text-indigo-500 hover:text-indigo-400"
                    href="/"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                <button
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  type="submit"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
          <div className="px-8 py-4 bg-gray-50 text-center">
            <span className="text-gray-600">Don't have an account?</span>
            <a
              className="font-medium text-indigo-500 hover:text-indigo-400"
              href="/signup"
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
