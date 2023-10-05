import { decodeAddress, encodeAddress } from "@polkadot/keyring";
import { hexToU8a, isHex, BN, BN_ONE } from "@polkadot/util";
import toast from "react-hot-toast";

// getEstimatedGas
const toContractAbiMessage = (contractPromise, message) => {
  const value = contractPromise.abi.messages.find((m) => m.method === message);

  if (!value) {
    const messages = contractPromise?.abi.messages
      .map((m) => m.method)
      .join(", ");

    const error = `"${message}" not found in metadata.spec.messages: [${messages}]`;
    console.error(error);

    return { ok: false, error };
  }

  return { ok: true, value };
};

async function getGasLimit(
  api,
  userAddress,
  message,
  contract,
  options = {},
  args = []
) {
  const abiMessage = toContractAbiMessage(contract, message);

  if (!abiMessage.ok) return abiMessage;

  const { value, gasLimit, storageDepositLimit } = options;

  const { gasRequired } = await api.call.contractsApi.call(
    userAddress,
    contract.address,
    value ?? new BN(0),
    gasLimit ?? null,
    storageDepositLimit ?? null,
    abiMessage.value.toU8a(args)
  );

  const refTime = gasRequired.refTime.toHuman().replaceAll(",", "");
  const proofSize = gasRequired.proofSize.toHuman().replaceAll(",", "");

  const gasRequiredAdjust = api.registry.createType("WeightV2", {
    refTime: new BN(refTime * 10 ** 0).mul(new BN(2)),
    proofSize: new BN(proofSize * 10 ** 0).mul(new BN(2)),
  });

  return { ok: true, value: gasRequiredAdjust };
}

// getEstimatedGas
export async function getEstimatedGas(
  address,
  contract,
  value,
  queryName,
  ...args
) {
  const fetchGas = async () => {
    let ret;

    try {
      const gasLimitResult = await getGasLimit(
        contract?.api,
        address,
        queryName,
        contract,
        { value },
        args
      );

      if (!gasLimitResult.ok) {
        console.log(queryName, "getEstimatedGas err", gasLimitResult.error);
        return;
      }

      ret = gasLimitResult?.value;
    } catch (error) {
      console.log("error fetchGas xx>>", error.message);
    }

    return ret;
  };

  let result;

  await toast.promise(
    fetchGas().then((data) => (result = data)),
    {
      success: `Estimated transaction fee...`,
      error: "Could not fetching gas!",
    },
    {
      success: {
        icon: "🔥",
      },
    }
  );

  return result;
}

// readOnlyGasLimit
export function readOnlyGasLimit(contract) {
  if (!contract) {
    console.log("contract invalid...");
    return;
  }
  try {
    const ret = contract?.api?.registry?.createType("WeightV2", {
      refTime: new BN(1_000_000_000_000),
      proofSize: new BN(5_000_000_000_000).isub(BN_ONE),
    });

    return ret;
  } catch (error) {
    console.log("error", error);
  }
}
