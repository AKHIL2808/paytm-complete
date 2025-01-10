import { getServerSession } from "next-auth";
import { OnRampTransactions } from "../../../components/Onramptransaction";
import { SendCard } from "../../../components/Sendcard";
import { authOptions } from "../../../lib/Auth";
import prisma from "@repo/database/client";

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.p2pTransfer.findMany({
    where: {
      fromUserId: session.user.id,
    },
  });
  return txns.map((t) => ({
    time: t.timestamp,
    amount: t.amount,
  }));
}

export default async function Peer() {
  const transactions = await getOnRampTransactions();
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="m-3">
        <SendCard />
      </div>
      <div>
        <OnRampTransactions transactions={transactions} page="debit" />
      </div>
    </div>
  );
}
