import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/Form/Button";
import { useAuth } from "../../hooks/useAuth";

export const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup, loading, error } = useAuth();
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (password !== confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setValidationError("Password must be at least 6 characters");
      return;
    }

    const user = await signup(email, password, username);
    if (user) {
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Create account</h2>
      </div>

      {error && (
        <div className="rounded-md bg-red-100 p-3 text-red-700">{error}</div>
      )}

      {validationError && (
        <div className="rounded-md bg-red-100 p-3 text-red-700">
          {validationError}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="username" className="block text-gray-700 font-semibold">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full rounded-md border-2 border-gray-200 px-4 py-2 focus:border-cyan-500 focus:outline-none"
          placeholder="your username"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-gray-700 font-semibold">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border-2 border-gray-200 px-4 py-2 focus:border-cyan-500 focus:outline-none"
          placeholder="your@email.com"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-gray-700 font-semibold">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border-2 border-gray-200 px-4 py-2 focus:border-cyan-500 focus:outline-none"
          placeholder="••••••••"
          required
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="confirmPassword"
          className="block text-gray-700 font-semibold"
        >
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full rounded-md border-2 border-gray-200 px-4 py-2 focus:border-cyan-500 focus:outline-none"
          placeholder="••••••••"
          required
        />
      </div>

      <Button
        label={loading ? "Creating Account..." : "Create Account"}
        type="submit"
        disabled={loading}
        className="w-full bg-cyan-500 text-white hover:bg-cyan-600 disabled:opacity-50"
      />
    </form>
  );
};
