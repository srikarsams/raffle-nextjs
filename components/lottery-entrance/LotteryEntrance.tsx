import { useEffect, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { ethers } from "ethers";

import { abi, contractAddresses } from "../../contracts";
import { useNotification } from "web3uikit";

const webSocketProvider = new ethers.providers.WebSocketProvider(
  "ws://127.0.0.1:8545/"
);

export default function LotteryEntrance() {
  const { chainId, isWeb3Enabled, enableWeb3, provider } = useMoralis();
  const [entranceFee, setEntranceFee] = useState("0");
  const [numOfPlayers, setNumOfPlayers] = useState("0");
  const [recentWinner, setRecentWinner] = useState("");
  const dispatchNotification = useNotification();

  const parsedChainID = parseInt(chainId || "0");
  const raffleContractAddress =
    parsedChainID in contractAddresses
      ? contractAddresses[parsedChainID as 31337][0]
      : "";

  const { runContractFunction: enterRaffle } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleContractAddress,
    functionName: "enterRaffle",
    params: {},
    msgValue: entranceFee,
  });

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleContractAddress,
    functionName: "getEntranceFee",
    params: {},
  });

  const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleContractAddress,
    functionName: "getNumberOfPlayers",
    params: {},
  });

  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleContractAddress,
    functionName: "getRecentWinner",
    params: {},
  });

  async function updateUI() {
    if (isWeb3Enabled && raffleContractAddress.length > 1) {
      const entranceFee = getEntranceFee();
      const recentWinner = getRecentWinner();
      const numOfPlayers = getNumberOfPlayers();
      Promise.all([entranceFee, recentWinner, numOfPlayers]).then((data) => {
        setEntranceFee((data[0] as string).toString());
        setRecentWinner(data[1] as string);
        setNumOfPlayers((data[2] as string).toString());
      });
    }
  }

  useEffect(() => {
    updateUI();
    if (isWeb3Enabled) {
      const contract = new ethers.Contract(
        raffleContractAddress,
        abi,
        webSocketProvider
      );
      (contract as any)?.on("WinnerPicked", () => {
        setTimeout(updateUI, 5000);
      });
    }
  }, [isWeb3Enabled]);

  function handleNewNotification(tx: any) {
    dispatchNotification({
      type: "info",
      position: "topR",
      message: "Raffle entered Successfully",
      title: "Transaction status",
    });
  }

  async function handleSuccess(tx: any) {
    await tx.wait(1);
    updateUI();
    handleNewNotification(tx);
  }

  return (
    <div>
      {raffleContractAddress.length > 1 ? (
        <div>
          <p>Entrance Fee: {ethers.utils.formatEther(entranceFee)} ETH</p>
          <p>Number of Players: {numOfPlayers}</p>
          <p>Recent winner: {recentWinner}</p>
          <button
            onClick={async () => {
              await enterRaffle({
                onSuccess: handleSuccess,
                onError: (err) => console.log(err),
              });
            }}
          >
            Enter Raffle
          </button>
        </div>
      ) : (
        <p>No Raffle contract address found!</p>
      )}
    </div>
  );
}
