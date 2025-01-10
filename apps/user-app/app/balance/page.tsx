"use client"

import { useBalance } from "@repo/stores/useBalance"

export default function () {
  const balance = useBalance()
  return <div>
    hiiii there {balance}
    <div>
    </div>
  </div>
}
