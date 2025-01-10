"use client";

import { Button } from "./button";
import { useRouter } from "next/navigation";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  onSignin: any;
  onSignout: any;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  console.log("in appbar")
  const router = useRouter();
  return (
    <div className="flex justify-between border-b px-4">
      <div className="text-lg flex flex-col justify-center">Paytm</div>
      <div className="flex justify-center pt-2">
        {!user && (
          <div className="flex flex-col justify-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
            <button
              onClick={() => {
                router.push("/signup");
              }}
            >
              Signup
            </button>
          </div>
        )}
        <Button onClick={user ? onSignout : onSignin}>
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
};
