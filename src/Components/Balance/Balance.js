import React from "react";
import "./Balance.css";

const walletsBallance = () => {
  return [
    { Name: "Main", Value: 100 },
    { Name: "Main1", Value: 200 },
    { Name: "Main2", Value: 600 },
    { Name: "Main3", Value: 400 }
  ];
};

const Balance = () => {
  const wallets = walletsBallance();
  return (
    <div className="Balance">
      <div>Wallets:</div>
      <div className="WalletsList">
        {wallets.map(wallet => (
          <div>
            {wallet.Name}: <span>{wallet.Value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Balance;
