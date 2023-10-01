import {
  web3Accounts,
  web3Enable,
  web3FromSource,
} from "@polkadot/extension-dapp";
import { useNetwork } from "components/Network/useNetWork";
import { NetworkProvider } from "components/Network/useNetWork";
import WalletConnectModal from "components/wallet/WalletConnectModal";
// import toast from "react-hot-toast";

import React, { createContext, useContext, useState, useEffect } from "react";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [currentExtensions, setCurrentExtensions] = useState([]);
  const [walletAccounts, setWalletAccounts] = useState(null);

  const updateWalletAccount = async (account) => {
    try {
      setCurrentAccount(account);
      localStorage.setItem("localCurrentAccount", JSON.stringify(account));
    } catch (error) {
      // toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };
  const logoutAccountHandler = () => {
    setCurrentAccount(null);
    setWalletAccounts(null);
    localStorage.setItem("localCurrentAccount", null);
  };

  const initAlephNetwork = async (keyWallet) => {
    const extentions = await web3Enable(process.env.REACT_APP_NAME);
    const accounts = await web3Accounts();
    setWalletAccounts(accounts?.filter((e) => e?.meta?.source == keyWallet));
    setCurrentExtensions(extentions);
  };

  const connectWallet = async (network, key) => {
    if (network == "aleph-zero") initAlephNetwork(key);
  };

  const initWallet = () => {
    const accountData = localStorage.getItem("localCurrentAccount");
    if (accountData) {
      // toast.success("Account connected");
      setCurrentAccount(JSON.parse(accountData));
    }
  };

  useEffect(() => {
    initWallet();
  }, []);
  return (
    <NetworkProvider>
      <WalletContext.Provider
        value={{
          currentAccount,
          updateWalletAccount,
          logoutAccountHandler,
          updateExtentions: setCurrentExtensions,
          currentExtensions,
          updateWalletAccounts: setWalletAccounts,
          walletAccounts,
          connectWallet,
        }}
      >
        {children}
      </WalletContext.Provider>
    </NetworkProvider>
  );
};

export const useWallet = () => useContext(WalletContext);
