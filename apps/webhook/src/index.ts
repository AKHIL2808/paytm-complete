import express from "express"
import client from "@repo/database/client"
const app = express()
app.use(express.json())
app.post("/fimoney",async (req,res)=>{
    const payment :{
        token: string;
        userId: string;
        amount: string
    }={
        token:req.body.token,
        userId:req.body.userId,
        amount:req.body.amount
    }
    try {
        await client.$transaction([
            client.balance.updateMany({
                where: {
                    userId: payment.userId
                },
                data: {
                    amount: {
                        // You can also get this from your DB
                        increment: Number(payment.amount)
                    }
                }
            }),
            client.onRampTransaction.updateMany({
                where: {
                    token: payment.token
                }, 
                data: {
                    status: "Success",
                }
            })
        ]);

        res.json({
            message: "Captured"
        })
    } catch(e) {
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }
})

app.listen(3003)