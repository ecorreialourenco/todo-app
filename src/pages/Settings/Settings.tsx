import { useState } from "react";
import { BsChevronLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/Form/Button";
import { Layout } from "../../components/Layout";
import { useAuth } from "../../hooks/useAuth";
import { User } from "../../models/user.model";

interface SettingsProps {
  user: User;
}

export const Settings = ({ user }: SettingsProps) => {
  const navigate = useNavigate();
  const { updateUsername, updatePassword, loading, error } = useAuth();
  const [activeTab, setActiveTab] = useState<"username" | "password">(
    "username",
  );
  const [newUsername, setNewUsername] = useState(user.username);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState<string | null>(null);

  const handleUpdateUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);

    if (!newUsername.trim()) {
      return;
    }

    const result = await updateUsername(newUsername);
    if (result) {
      setSuccess("Username updated successfully!");
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);

    if (newPassword !== confirmPassword) {
      return;
    }

    if (newPassword.length < 6) {
      return;
    }

    const result = await updatePassword(newPassword);
    if (result) {
      setSuccess("Password updated successfully!");
      setNewPassword("");
      setConfirmPassword("");
      setCurrentPassword("");
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <Layout onClick={() => {}} user={user}>
      <div className="mx-auto max-w-2xl py-8">
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={handleBack}
            className="rounded-lg bg-cyan-500 text-white px-4 py-2 hover:bg-cyan-600 transition flex items-center gap-2"
          >
            <BsChevronLeft size={18} />
            Go back
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Definitions</h1>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-100 p-4 text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-md bg-green-100 p-4 text-green-700">
            {success}
          </div>
        )}

        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="mb-6 flex gap-4 border-b">
            <button
              onClick={() => setActiveTab("username")}
              className={`pb-4 px-4 font-semibold transition ${
                activeTab === "username"
                  ? "border-b-2 border-cyan-500 text-cyan-500"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Change username
            </button>
            <button
              onClick={() => setActiveTab("password")}
              className={`pb-4 px-4 font-semibold transition ${
                activeTab === "password"
                  ? "border-b-2 border-cyan-500 text-cyan-500"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Change password
            </button>
          </div>

          {activeTab === "username" && (
            <form onSubmit={handleUpdateUsername} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Current username
                </label>
                <input
                  type="text"
                  value={user.username}
                  disabled
                  className="w-full rounded-md border-2 border-gray-300 px-4 py-2 bg-gray-100 text-gray-600"
                />
              </div>

              <div>
                <label
                  htmlFor="newUsername"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  New username
                </label>
                <input
                  id="newUsername"
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="w-full rounded-md border-2 border-gray-200 px-4 py-2 focus:border-cyan-500 focus:outline-none"
                  placeholder="New username"
                  required
                />
              </div>

              <Button
                label={loading ? "Loading..." : "Update username"}
                type="submit"
                disabled={loading || newUsername === user.username}
                className="w-full bg-cyan-500 text-white hover:bg-cyan-600 disabled:opacity-50"
              />
            </form>
          )}

          {activeTab === "password" && (
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Current password
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full rounded-md border-2 border-gray-200 px-4 py-2 focus:border-cyan-500 focus:outline-none"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  New password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-md border-2 border-gray-200 px-4 py-2 focus:border-cyan-500 focus:outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Confirm password
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

              {newPassword !== confirmPassword &&
                newPassword &&
                confirmPassword && (
                  <p className="text-sm text-red-600">Password doesn't match</p>
                )}

              <Button
                label={loading ? "Loading..." : "Change password"}
                type="submit"
                disabled={
                  loading ||
                  !newPassword ||
                  !confirmPassword ||
                  newPassword !== confirmPassword ||
                  newPassword.length < 6
                }
                className="w-full bg-cyan-500 text-white hover:bg-cyan-600 disabled:opacity-50"
              />
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};
