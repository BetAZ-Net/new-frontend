import BN from "bn.js";
import toast from "react-hot-toast";
import { Keyring } from "@polkadot/api";
import { readOnlyGasLimit, getEstimatedGas } from "./index";
import { ContractPromise } from "@polkadot/api-contract";
import { formatQueryResultToNumber, convertToBalance } from "utils";

let contract;

export const setStakingPoolContract = (api, data) => {
  contract = new ContractPromise(
    api,
    data?.CONTRACT_ABI,
    data?.CONTRACT_ADDRESS
  );
};

async function getRequestTimeUnstake(caller, amount) {
  if (!contract || !caller) {
    return null;
  }

  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  try {
    const { result, output } = await contract.query[
      "stakingPoolTrait::getRequestUnstakeTime"
    ](
      caller,
      {
        value: azero_value,
        gasLimit,
      },
      caller,
      amount
    );
    if (result.isOk) {
      return output?.toHuman().Ok;
    }
  } catch (e) {
    return null;
  }

  return null;
}

async function getlimitTimeUnstake(caller) {
  if (!contract || !caller) {
    return null;
  }

  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  try {
    const { result, output } = await contract.query[
      "stakingPoolTrait::getLimitUnstakeTime"
    ](caller, {
      value: azero_value,
      gasLimit,
    });
    if (result.isOk) {
      return output?.toHuman().Ok;
    }
  } catch (e) {
    return null;
  }

  return null;
}

const contract_calls = {
  getRequestTimeUnstake,
  getlimitTimeUnstake
};

export default contract_calls;
