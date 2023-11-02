import React, { useState } from "react";
import Countdown from "react-countdown";
import CommonButton from "./commonButton";
import toast from "react-hot-toast";
import { Flex } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { clientAPI } from "api/client";
import staking_pool_contract from "utils/contracts/staking_pool";
import { convertToBalance, delay } from "utils";
import { fetchUserBalance, fetchBalance } from "store/slices/substrateSlice";
import { execContractQuery, execContractTx } from "utils/contracts";

const defaultCaller = process.env.REACT_APP_DEFAULT_CALLER_ADDRESS;

export default function PendingUnstakeButton({ data }) {
  const dispatch = useDispatch();
  const { currentAccount } = useSelector((s) => s.substrate);
  const [isLoading, setIsLoading] = useState(false);

  const unstake = async () => {
    if (!data) {
      toast.error("invalid data!");
      return;
    }
    setIsLoading(true);

    try {
      // check reward locked
      const toastCheckLock = toast.loading("Step 1: Check reward locked ...");
      const checkLock = await execContractQuery(
        defaultCaller,
        staking_pool_contract.CONTRACT_ABI,
        staking_pool_contract.CONTRACT_ADDRESS,
        0,
        "stakingPoolTrait::getIsLocked"
      );
      toast.dismiss(toastCheckLock);
      if (checkLock?.toHuman().Ok) {
        toast.error("Reward locked!");
        setIsLoading(false);
        return;
      }

      const toastUnstake = toast.loading("Step 2: Unstake ...");
      const result = await execContractTx(
        currentAccount,
        staking_pool_contract.CONTRACT_ABI,
        staking_pool_contract.CONTRACT_ADDRESS,
        0,
        "unstake",
        convertToBalance(parseFloat(data?.amount))
      );
      if (result) {
        toast.dismiss(toastUnstake);
        toast.success(`Staking success`);

        // delete resquest unstake
        await delay(2000);
        await clientAPI("delete", "/deletePendingUnstake", {
          id: data?.id,
        });
      } else toast.dismiss(toastUnstake);
    } catch (error) {
      // toast.dismiss(toastUnstake);
      setIsLoading(false);
      console.log(error);
    }
    setIsLoading(false);

    await delay(2000);
    dispatch(fetchUserBalance({ currentAccount }));
    dispatch(fetchBalance());
  };

  const cancelUnstake = async () => {
    if (!data) {
      toast.error("invalid data!");
      return;
    }
    setIsLoading(true);

    try {
      // check reward locked
      const toastCheckLock = toast.loading("Step 1: Check reward locked ...");
      const checkLock = await execContractQuery(
        defaultCaller,
        staking_pool_contract.CONTRACT_ABI,
        staking_pool_contract.CONTRACT_ADDRESS,
        0,
        "stakingPoolTrait::getIsLocked"
      );
      toast.dismiss(toastCheckLock);
      if (checkLock?.toHuman().Ok) {
        toast.error("Reward locked!");
        setIsLoading(false);
        return;
      }

      const toastUnstake = toast.loading("Step 2: Cancel request unstake ...");
      const result = await execContractTx(
        currentAccount,
        staking_pool_contract.CONTRACT_ABI,
        staking_pool_contract.CONTRACT_ADDRESS,
        0,
        "cancelRequestUnstake",
        convertToBalance(parseFloat(data?.amount))
      );
      if (result) {
        toast.dismiss(toastUnstake);
        toast.success(`Staking success`);

        // delete resquest unstake
        await delay(2000);
        await clientAPI("delete", "/deletePendingUnstake", {
          id: data?.id,
        });
      } else toast.dismiss(toastUnstake);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
    setIsLoading(false);

    await delay(2000);
    dispatch(fetchUserBalance({ currentAccount }));
    dispatch(fetchBalance());
  };

  const renderer = ({ completed }) => {
    if (completed) {
      return (
        <Flex justifyContent="center">
          <CommonButton
            onClick={() => unstake()}
            text="Unstake"
            isLoading={isLoading}
          />
        </Flex>
      );
    } else {
      return (
        <Flex justifyContent="center">
          <CommonButton
            onClick={() => cancelUnstake()}
            text="Cancel Request Unstake"
            isLoading={isLoading}
          />
        </Flex>
      );
    }
  };
  return (
    <span>
      <Countdown
        key={data?.time?.toString()}
        date={data?.time}
        renderer={renderer}
      />
    </span>
  );
}