import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts";
import HomePage from "./pages/home";
import Predict from "./pages/predict";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { ApiPromise, WsProvider } from "@polkadot/api";
import jsonrpc from "@polkadot/types/interfaces/jsonrpc";
import { initialApi, toastMessages } from "utils/contracts";
import { useWallet } from "contexts/useWallet";
import { formatChainStringToNumber } from "utils";
import betaz_core_contract from "utils/contracts/betaz_core";
import { setBetazCoreContract } from "utils/contracts/betaz_core_calls";
import betaz_token_contract from "utils/contracts/betaz_token";
import { setBetazTokenContract } from "utils/contracts/betaz_token_calls";
import staking_pool_contract from "utils/contracts/staking_pool";
import { setStakingPoolContract } from "utils/contracts/staking_pool_calls";
import { delay } from "utils";
import {
  fetchUserBalance,
  fetchRollNumbers,
  fetchBalance,
  fetchRates,
  fetchBuyStatus,
} from "store/slices/substrateSlice";
import { web3Enable } from "@polkadot/extension-dapp";
import AdminPage from "pages/admin";

const providerUrl = process.env.REACT_APP_PROVIDER_URL;

const App = () => {
  const dispatch = useDispatch();

  const { currentAccount } = useSelector((s) => s.substrate);
  const { setCurrentApi } = useWallet();
  const [api, setApi] = useState(null);
  const setupProvider = async () => {
    toast(`Connecting to ${providerUrl}...`);
    const provider = new WsProvider(providerUrl);

    const wsApi = await ApiPromise.create({
      provider,
      rpc: jsonrpc,
      throwOnConnect: true,
    });

    if (!wsApi) return;

    console.log(`Successfully connected to: ${providerUrl}`);
    toast.success(`Successfully connected !`);

    setApi(wsApi);

    initialApi(wsApi);

    setCurrentApi(wsApi);

    setBetazCoreContract(wsApi, betaz_core_contract);

    setBetazTokenContract(wsApi, betaz_token_contract);

    setStakingPoolContract(wsApi, staking_pool_contract);

    await wsApi.rpc.chain.subscribeNewHeads((lastHeader) => {
      // eslint-disable-next-line no-unused-vars
      const lastBlock = formatChainStringToNumber(
        JSON.stringify(lastHeader.number.toHuman())
      );

      // setLastChainBlock(lastBlock);
      // setLastBlockParent(lastHeader.parentHash.toRawType);
    });

    await web3Enable(process.env.REACT_APP_NAME);
  };

  useEffect(() => {
    setupProvider().catch((error) => {
      toast.error(toastMessages.ERR_API_CONN);
      console.error("@_@ setupProvider error", error);
    });
  }, [dispatch]);

  useEffect(() => {
    delay(100);
    if (!currentAccount?.balance) {
      dispatch(fetchUserBalance({ currentAccount }));
    }

    if (api) {
      // dispatch(fetchUserBalance({ currentAccount, api }));
      dispatch(fetchBalance({ currentAccount }));
      dispatch(fetchRollNumbers({ currentAccount }));
      dispatch(fetchRates({ currentAccount }));
      dispatch(fetchBuyStatus({ currentAccount }));
    }
  }, [api, currentAccount?.address]);

  return (
    <DefaultLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/app" element={<Predict />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </DefaultLayout>
  );
};

export default App;
