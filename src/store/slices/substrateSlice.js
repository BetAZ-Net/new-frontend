import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { formatNumDynDecimal, formatQueryResultToNumber } from "utils";
import {
  execContractQuerybyMetadata,
  execContractQuerybyMetadataConvertResult,
  getAzeroBalanceOfAddress,
} from "utils/contracts";
import betaz_core_contract from "utils/contracts/betaz_core";
import betaz_token_contract from "utils/contracts/betaz_token";
import staking_pool_contract from "utils/contracts/staking_pool";
import treasury_pool_contract from "utils/contracts/treasury_pool";

const localCurrentAccount = window?.localStorage?.getItem(
  "localCurrentAccount"
);

const defaultCaller = process.env.REACT_APP_DEFAULT_CALLER_ADDRESS;

const initialState = {
  api: null,
  allAccounts: [],
  currentAccount: JSON.parse(localCurrentAccount) || null,
  adapter: null,
  poolBalance: {
    betaz: 0,
    azero: 0,
    contract: 0,
    core: 0,
  },
  betRates: {
    overRates: [
      0, 0, 0, 0, 10368, 10478, 10591, 10706, 10824, 10944, 11067, 11193, 11321,
      11453, 11588, 11726, 11867, 12012, 12160, 12312, 12468, 12628, 12792,
      12960, 13133, 13310, 13493, 13680, 13873, 14071, 14275, 14485, 14701,
      14924, 15153, 15390, 15634, 15887, 16147, 16416, 16694, 16982, 17280,
      17589, 17909, 18240, 18584, 18942, 19313, 19700, 20102, 20520, 20957,
      21413, 21888, 22386, 22906, 23452, 24024, 24625, 25256, 25921, 26621,
      27361, 28142, 28970, 29848, 30781, 31774, 32833, 33965, 35178, 36481,
      37884, 39400, 41041, 42826, 44772, 46904, 49250, 51842, 54722, 57941,
      61562, 65666, 70357, 75769, 82083, 89545, 98500, 109444, 123125, 140714,
      164166, 197000, 246250, 328333, 492500, 985000, 0,
    ],
    underRates: [
      0, 985000, 492500, 328333, 246250, 197000, 164166, 140714, 123125, 109444,
      98500, 89545, 82083, 75769, 70357, 65666, 61562, 57941, 54722, 51842,
      49250, 46904, 44772, 42826, 41041, 39400, 37884, 36481, 35178, 33965,
      32833, 31774, 30781, 29848, 28970, 28142, 27361, 26621, 25921, 25256,
      24625, 24024, 23452, 22906, 22386, 21888, 21413, 20957, 20520, 20102,
      19700, 19313, 18942, 18584, 18240, 17909, 17589, 17280, 16982, 16694,
      16416, 16147, 15887, 15634, 15390, 15153, 14924, 14701, 14485, 14275,
      14071, 13873, 13680, 13493, 13310, 13133, 12960, 12792, 12628, 12468,
      12312, 12160, 12012, 11867, 11726, 11588, 11453, 11321, 11193, 11067,
      10944, 10824, 10706, 10591, 10478, 10368, 0, 0, 0, 0,
    ],
  },
  betRollNumbers: {
    numberOverRollMin: 4,
    numberOverRollMax: 98,
    numberUnerRollMin: 1,
    numberUnerRollMax: 95,
  },
  buyStatus: {
    endTime: 0,
    status: true,
  },
};

export const substrateSlice = createSlice({
  name: "substrate",
  initialState,
  reducers: {
    setCurrentAccount: (state, action) => {
      state.currentAccount = action.payload;
    },

    setCurrentApi: (state, action) => {
      state.api = action.payload;
    },

    disconnectCurrentAccount: (state) => {
      state.currentAccount = null;
    },

    updateAccountsList: (state, action) => {
      state.allAccounts = action.payload;
    },

    updateAdapter: (state, action) => {
      state.adapter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserBalance.fulfilled, (state, action) => {
      state.currentAccount = {
        ...state.currentAccount,
        balance: action.payload,
      };
    });
    builder.addCase(fetchBalance.fulfilled, (state, action) => {
      state.poolBalance = action.payload;
    });
    builder.addCase(fetchRollNumbers.fulfilled, (state, action) => {
      state.betRollNumbers = action.payload;
    });
    builder.addCase(fetchRates.fulfilled, (state, action) => {
      state.betRates = action.payload;
    });
    builder.addCase(fetchBuyStatus.fulfilled, (state, action) => {
      state.buyStatus = action.payload;
    });
  },
});

export const {
  setCurrentApi,
  setCurrentAccount,
  updateAccountsList,
  disconnectCurrentAccount,
  updateAdapter,
} = substrateSlice.actions;

export default substrateSlice.reducer;

export const fetchUserBalance = createAsyncThunk(
  "substrate/fetchUserBalance",
  async ({ currentAccount }) => {
    const [tokenBalance, azeroBalance, stakeAmount] = await Promise.all([
      execContractQuerybyMetadata(
        currentAccount?.address,
        betaz_token_contract.CONTRACT_ABI,
        betaz_token_contract.CONTRACT_ADDRESS,
        0,
        "psp22::balanceOf",
        currentAccount?.address
      ),
      getAzeroBalanceOfAddress({
        address: currentAccount?.address,
      }),
      execContractQuerybyMetadata(
        currentAccount?.address,
        staking_pool_contract.CONTRACT_ABI,
        staking_pool_contract.CONTRACT_ADDRESS,
        0,
        "stakingPoolTrait::getStakeAmountByAccount",
        currentAccount?.address
      ),
    ]);

    const betaz = formatQueryResultToNumber(tokenBalance);
    const azero = formatNumDynDecimal(azeroBalance);
    const stake = formatQueryResultToNumber(stakeAmount);

    return { betaz, azero, stake };
  }
);

export const fetchBalance = createAsyncThunk(
  "substrate/fetchBalance",
  async () => {
    // TODO: check can fix warning about storing api on redux?

    const [corePoolBalance, stakingPoolBalance, treasuryPoolBalance] =
      await Promise.all([
        execContractQuerybyMetadata(
          defaultCaller,
          betaz_core_contract.CONTRACT_ABI,
          betaz_core_contract.CONTRACT_ADDRESS,
          0,
          "betA0CoreTrait::getCorePoolAmout"
        ),
        getAzeroBalanceOfAddress({
          address: staking_pool_contract?.CONTRACT_ADDRESS,
        }),
        getAzeroBalanceOfAddress({
          address: treasury_pool_contract?.CONTRACT_ADDRESS,
        }),
      ]);

    const core = formatQueryResultToNumber(corePoolBalance);
    const staking = formatNumDynDecimal(stakingPoolBalance);
    const treasury = formatNumDynDecimal(treasuryPoolBalance);

    return { core, staking, treasury };
  }
);

export const fetchRates = createAsyncThunk("substrate/fetchRates", async () => {
  const [over, under] = await Promise.all([
    execContractQuerybyMetadataConvertResult(
      defaultCaller,
      betaz_core_contract.CONTRACT_ABI,
      betaz_core_contract.CONTRACT_ADDRESS,
      0,
      "betA0CoreTrait::getOverRates"
    ),
    execContractQuerybyMetadataConvertResult(
      defaultCaller,
      betaz_core_contract.CONTRACT_ABI,
      betaz_core_contract.CONTRACT_ADDRESS,
      0,
      "betA0CoreTrait::getUnderRates"
    ),
  ]);

  let overRates = over.map((element) => element.toNumber());
  let underRates = under.map((element) => element.toNumber());
  console.log(overRates);
  return {
    overRates,
    underRates,
  };
});

export const fetchRollNumbers = createAsyncThunk(
  "substrate/fetchRollNumbers",
  async () => {
    let [
      numberOverRollMin,
      numberOverRollMax,
      numberUnerRollMin,
      numberUnerRollMax,
    ] = await Promise.all([
      execContractQuerybyMetadataConvertResult(
        defaultCaller,
        betaz_core_contract.CONTRACT_ABI,
        betaz_core_contract.CONTRACT_ADDRESS,
        0,
        "betA0CoreTrait::getMinNumberOverRoll"
      ),
      execContractQuerybyMetadataConvertResult(
        defaultCaller,
        betaz_core_contract.CONTRACT_ABI,
        betaz_core_contract.CONTRACT_ADDRESS,
        0,
        "betA0CoreTrait::getMaxNumberOverRoll"
      ),
      execContractQuerybyMetadataConvertResult(
        defaultCaller,
        betaz_core_contract.CONTRACT_ABI,
        betaz_core_contract.CONTRACT_ADDRESS,
        0,
        "betA0CoreTrait::getMinNumberUnderRoll"
      ),
      execContractQuerybyMetadataConvertResult(
        defaultCaller,
        betaz_core_contract.CONTRACT_ABI,
        betaz_core_contract.CONTRACT_ADDRESS,
        0,
        "betA0CoreTrait::getMaxNumberUnderRoll"
      ),
    ]);

    numberOverRollMin = parseInt(numberOverRollMin);
    numberOverRollMax = parseInt(numberOverRollMax);
    numberUnerRollMin = parseInt(numberUnerRollMin);
    numberUnerRollMax = parseInt(numberUnerRollMax);
    return {
      numberOverRollMin,
      numberOverRollMax,
      numberUnerRollMin,
      numberUnerRollMax,
    };
  }
);

export const fetchBuyStatus = createAsyncThunk(
  "substrate/fetchBuyStatus",
  async () => {
    // TODO: check can fix warning about storing api on redux?
    const [endTimeBuy, buyStatus] = await Promise.all([
      execContractQuerybyMetadata(
        defaultCaller,
        betaz_token_contract.CONTRACT_ABI,
        betaz_token_contract.CONTRACT_ADDRESS,
        0,
        "betAZTrait::getEndTimeBuy"
      ),
      execContractQuerybyMetadata(
        defaultCaller,
        betaz_token_contract.CONTRACT_ABI,
        betaz_token_contract.CONTRACT_ADDRESS,
        0,
        "betAZTrait::getBuyTokenStatus"
      ),
    ]);

    let endTime = endTimeBuy?.toHuman().Ok;
    let status = buyStatus?.toHuman().Ok;

    return { endTime, status };
  }
);
