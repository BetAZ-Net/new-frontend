// import BN from "bn.js";
// import toast from "react-hot-toast";
// import { Keyring } from "@polkadot/api";
import { ContractPromise } from "@polkadot/api-contract";

let contract;

export const setStakingPoolContract = (api, data) => {
  contract = new ContractPromise(
    api,
    data?.CONTRACT_ABI,
    data?.CONTRACT_ADDRESS
  );
};