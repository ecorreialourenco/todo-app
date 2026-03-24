import { useState } from "react";

import { Login } from "./Login";
import { Signup } from "./Signup";

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-linear-to-r from-blue-600 to-cyan-500">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        {isLogin ? (
          <>
            <Login />
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                Don't have account yet?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="font-semibold text-cyan-500 hover:text-cyan-600"
                >
                  Create account
                </button>
              </p>
            </div>
          </>
        ) : (
          <>
            <Signup />
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                Already have account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="font-semibold text-cyan-500 hover:text-cyan-600"
                >
                  Login your account
                </button>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
