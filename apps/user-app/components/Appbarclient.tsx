// "use client"

// import { Appbar } from "@repo/ui/appbar";
// import { signIn, signOut, useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";


// export default function AppbarClient() {
//   const session = useSession()
// //   const router = useRouter()
//   console.log("session in frontend is ",session );

// //   if(session){
// //      router.push("/dashboard")
// //   }else{
// //     router.push("/")
// //   }

//   return (
//     <div>
//       <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user}/> 
//     </div>
//   );
// }
"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AppbarClient() {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session.data) {
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  }, [session, router])
  return (
   <div>
      <Appbar onSignin={signIn} onSignout={signOut} user={session?.data?.user} />
   </div>
  );
}
