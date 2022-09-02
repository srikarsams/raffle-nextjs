// import { useEffect } from "react";

import { ConnectButton } from "web3uikit";

export default function Header() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2>Decentralised lottery</h2>
      <ConnectButton moralisAuth={false} />
    </div>
  );
}

// export default function Header() {
//   const {
//     enableWeb3,
//     account,
//     isWeb3Enabled,
//     deactivateWeb3,
//     isWeb3EnableLoading,
//   } = useMoralis();

//   useEffect(() => {
//     if (isWeb3Enabled) return;
//     if (window.localStorage.getItem("connected") === "injected") {
//       enableWeb3();
//     }
//   }, [isWeb3Enabled, enableWeb3]);

//   useEffect(() => {
//     if (account === null) {
//       window.localStorage.removeItem("connected");
//       deactivateWeb3();
//     }
//   }, [account, deactivateWeb3]);

//   return (
//     <div>
//       {!account ? (
//         <button
//           disabled={isWeb3EnableLoading}
//           onClick={async () => {
//             await enableWeb3();
//             window.localStorage.setItem("connected", "injected");
//           }}
//         >
//           {isWeb3EnableLoading ? "Connecting" : "Connect"}
//         </button>
//       ) : (
//         <p>
//           Connected to {account.slice(0, 6)}...
//           {account.slice(account.length - 4)}
//         </p>
//       )}
//     </div>
//   );
// }
