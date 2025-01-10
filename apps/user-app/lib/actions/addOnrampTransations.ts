"use server"
import { getServerSession } from "next-auth";
import prisma from "@repo/database/client"
import {authOptions} from "../Auth" 

export default async function addOnrampTransaction(provider:string,amount:number){
    console.log("in onramp")
    const session = await getServerSession(authOptions)
    console.log(session)
    if(!session?.user || !session.user?.id){
        console.log("unauth")
        return {
            message:"not authorised"
        }
    }
    
        const token = (Math.random() * 1000).toString();
        console.log("token is", token)
        await prisma.onRampTransaction.create({
            data:{
                status:"Processing",
                token:token,
                provider:provider,
                amount:amount * 100,
                startTime: new Date(),
                userId:session.user.id
            }
        })
}
// "use server";

// import prisma from "@repo/database/client";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../Auth";

// export async function addOnrampTransaction(provider: string, amount: number) {
//     console.log("in onramp")
//     // Ideally the token should come from the banking provider (hdfc/axis)
//     const session = await getServerSession(authOptions);
//     console.log(session)
//     if (!session?.user || !session.user?.id) {
//         console.log("in unauth")
//         return {
//             message: "Unauthenticated request"
//         }
//     }
//     const token = (Math.random() * 1000).toString();
//     console.log(token)
//     await prisma.onRampTransaction.create({
//         data: {
//             provider,
//             status: "Processing",
//             startTime: new Date(),
//             token: token,
//             userId: session?.user?.id,
//             amount: amount * 100
//         }
//     });
//     console.log("added")
//     return {
//         message: "Done"
//     }
// }
