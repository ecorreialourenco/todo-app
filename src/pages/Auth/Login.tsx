import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/Form/Button";
import { useAuth } from "../../hooks/useAuth";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await login(email, password);
    if (user) {
        setTimeout(()=> {

            navigate("/");
        }, 500)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Login</h2>
      </div>

      {error && (
        <div className="rounded-md bg-red-100 p-3 text-red-700">{error}</div>
      )}

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
          placeholder="ypur@email.com"
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

      <Button
        label={loading ? "Loading..." : "Login"}
        type="submit"
        disabled={loading}
        className="w-full bg-cyan-500 text-white hover:bg-cyan-600 disabled:opacity-50"
      />
    </form>
  );
};
