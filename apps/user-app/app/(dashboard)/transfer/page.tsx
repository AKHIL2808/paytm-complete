import prisma from "@repo/database/client";
import { AddMoney } from "../../../components/Addmoneycard";
import { BalanceCard } from "../../../components/Balancecard";
import { OnRampTransactions } from "../../../components/Onramptransaction";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/Auth";

async function getBalance() {
    const session = await getServerSession(authOptions);
    // console.log("getbalance",session)
    const balance = await prisma.balance.findFirst({
        where: {
            userId: session?.user?.id
        }
    });
    // console.log("balance is",balance)
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    // console.log("get transaction",session)
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: session?.user?.id
        }
    });
    // console.log("txns are",txns)
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

export default async function() {
    const balance = await getBalance();
    // console.log("balance is",balance)
    const transactions = await getOnRampTransactions();
    // console.log("transactions are",transactions)
    return <div className="w-screen">
        <div className="text-4xl text-black pt-8 mb-8 font-bold">
            Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <AddMoney />
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked} />
                <div className="pt-4">
                    <OnRampTransactions transactions={transactions} page="credit"/>
                </div>
            </div>
        </div>
    </div>
}