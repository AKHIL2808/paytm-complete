"use client";

import { useState } from "react";
import { Input } from "./input";
import addUser from "@repo/actions/adduser";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
export function Signuppage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <a
          href="#"
          className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 "
        >
          <div>
            <div className="px-10">
              <div className="text-3xl font-extrabold">Sign up</div>
            </div>
            <div className="px-2">
              <Input
                label="Name"
                placeholder="Akhil"
                onchange={(e) => {
                  setName(e.target.value);
                }}
              />
              <Input
                label="Email"
                placeholder="akhil@gmail.com"
                onchange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Input
                label="Number"
                placeholder="9876543210"
                onchange={(e) => {
                  setNumber(e.target.value);
                }}
              />
              <Input
                label="Password"
                placeholder="akhil@12345"
                type="password"
                onchange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {/* <Input
        label="Retype-Password"
        placeholder="akhil@12345"
        onchange={(e) => {
          setPassword(e.target.value);
        }}
      /> */}
              <button
                className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                onClick={async () => {
                  console.log("from button");
                  const response = await addUser(email, name, number, password);
                  if (response) {
                    router.push("/api/auth/signin");
                  } else {
                    console.log("error");
                  }
                }}
              >
                Submit
              </button>
{/* 
              <button
                className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                onClick={async () =>
                  await signIn("google", {
                    callbackUrl: "http://localhost:3001",
                  })
                }
              >
                Sign Up with Google
              </button> */}
              {/* <button onClick={async() => {
       await signIn("google",{
        callbackUrl: "/",
       });
      }}>Google SignIn</button> */}
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
