import BN from "bn.js";
import toast from "react-hot-toast";
import { Keyring } from "@polkadot/api";
import { ContractPromise } from "@polkadot/api-contract";
import { readOnlyGasLimit, getEstimatedGas, execContractTx } from "./index";
import { web3FromSource } from "@polkadot/extension-dapp";

let contract;

export const setBetazCoreContract = (api, data) => {
  contract = new ContractPromise(
    api,
    data?.CONTRACT_ABI,
    data?.CONTRACT_ADDRESS
  );
};

//get_max_bet
async function getMaxBet(caller) {
  if (!contract || !caller) {
    return null;
  }

  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;
  //console.log(contract);

  try {
    const { result, output } = await contract.query[
      "betA0CoreTrait::getMaxBet"
    ](caller, {
      value: azero_value,
      gasLimit,
    });
    if (result.isOk) {
      const a = output.toHuman().Ok.replace(/\,/g, "");
      return a / 10 ** 12;
    }
  } catch (e) {
    return null;
  }

  return null;
}

// async function play(caller, amount, bet_number, is_over) {
//   if (!contract || !caller?.address) {
//     return null;
//   }

//   if (parseInt(amount) <= 0) {
//     toast.error(`invalid inputs`);
//     return;
//   }
//   let unsubscribe;
//   let gasLimit;

//   if (is_over) is_over = 1;
//   else is_over = 0;

//   const { signer } = await web3FromSource(caller?.meta?.source);
//   let value = new BN(amount * 10 ** 6).mul(new BN(10 ** 6)).toString();

//   gasLimit = await getEstimatedGas(
//     caller?.address,
//     contract,
//     value,
//     "play",
//     bet_number,
//     is_over
//   );

//   await contract.tx["play"]({ gasLimit, value }, bet_number, is_over)
//     .signAndSend(
//       caller?.address,
//       { signer },
//       async ({ status, dispatchError }) => {
//         if (dispatchError) {
//           if (dispatchError.isModule) {
//             console.log(dispatchError);
//             toast.error(`There is some error with your request`);
//           } else {
//             console.log("dispatchError", dispatchError.toString());
//           }
//         }

//         if (status) {
//           const statusText = Object.keys(status.toHuman())[0];
//           if (statusText === "0") toast.success(`Placing Bet ...`);
//         }
//       }
//     )
//     .then((unsub) => (unsubscribe = unsub))
//     .catch((e) => console.log("e", e));
//   return unsubscribe;
// }

//get_bet

async function play(caller, amount, bet_number, is_over) {
  if (!contract || !caller?.address) {
    return null;
  }

  if (parseInt(amount) <= 0) {
    toast.error(`invalid inputs`);
    return;
  }

  if (is_over) is_over = 1;
  else is_over = 0;

  await execContractTx(caller, contract, amount, "play", bet_number, is_over);
}

async function getBet(caller) {
  if (!contract || !caller) {
    return null;
  }

  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;
  //console.log(contract);

  try {
    const { result, output } = await contract.query["betA0CoreTrait::getBet"](
      caller,
      {
        value: azero_value,
        gasLimit,
      },
      caller
    );
    if (result.isOk) {
      const a = output.toHuman().Ok;
      return a;
    }
  } catch (e) {
    return null;
  }

  return null;
}

async function getHoldAmountPlayers(caller) {
  if (!contract || !caller) {
    return null;
  }

  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  try {
    const { result, output } = await contract.query[
      "betA0CoreTrait::getHoldAmountPlayers"
    ](
      caller,
      {
        value: azero_value,
        gasLimit,
      },
      caller?.address
    );
    if (result.isOk) {
      const a = output.toHuman().Ok.replace(/\,/g, "");
      return a / 10 ** 12;
    }
  } catch (e) {
    return null;
  }

  return null;
}

async function withdrawHoldAmount(caller) {
  if (!contract || !caller?.address) {
    return null;
  }

  let unsubscribe;
  let gasLimit;

  const { signer } = await web3FromSource(caller?.meta?.source);
  let value = 0;

  gasLimit = await getEstimatedGas(
    caller?.address,
    contract,
    value,
    "betA0CoreTrait::withdrawHoldAmount"
  );

  await contract.tx["betA0CoreTrait::withdrawHoldAmount"]({ gasLimit, value })
    .signAndSend(
      caller?.address,
      { signer },
      async ({ status, dispatchError }) => {
        if (dispatchError) {
          if (dispatchError.isModule) {
            console.log(dispatchError);
            toast.error(`There is some error with your request`);
          } else {
            console.log("dispatchError", dispatchError.toString());
          }
        }

        if (status) {
          const statusText = Object.keys(status.toHuman())[0];
          if (statusText === "0") toast.success(`Withdraw hold amount ...`);
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((e) => console.log("e", e));
  return unsubscribe;
}

const contract_calls = {
  getMaxBet,
  play,
  getBet,
  getHoldAmountPlayers,
  withdrawHoldAmount
};

export default contract_calls;
