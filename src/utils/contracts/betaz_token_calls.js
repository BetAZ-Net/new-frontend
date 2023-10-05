import BN from "bn.js";
import toast from "react-hot-toast";
import { web3FromSource } from "../wallets/extension-dapp";
import { getEstimatedGas, readOnlyGasLimit } from "../utils";

import { Keyring } from "@polkadot/api";

import { isValidAddressPolkadotAddress } from "../utils";
import { ContractPromise } from "@polkadot/api-contract";

let contract;

export const setBetazTokenContract = (api, data) => {
  contract = new ContractPromise(
    api,
    data?.CONTRACT_ABI,
    data?.CONTRACT_ADDRESS
  );
};