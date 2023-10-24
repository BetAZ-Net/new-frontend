import { Box, Text, Input, Flex } from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { SectionContainer } from "components/container";
import { AppIcon } from "components/icons";
import CommonButton from "components/button/commonButton";
import { useDispatch, useSelector } from "react-redux";
import { convertToBalance, checkBalance, delay } from "utils";
import { execContractTx, execContractQuery } from "utils/contracts";
import betaz_core_contract from "utils/contracts/betaz_core";
import betaz_token_contract from "utils/contracts/betaz_token";
import { useWallet } from "contexts/useWallet";
import { fetchUserBalance, fetchBalance } from "store/slices/substrateSlice";

const adminRole = process.env.REACT_APP_ADMIN_ROLE;

const UpdateRewardPool = () => {
  const dispatch = useDispatch();
  const { api } = useWallet();
  const { currentAccount } = useSelector((s) => s.substrate);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(0);
  const handleUpdate = async () => {
    if (value === 0 || value === "") {
      toast.error("Invalid value!");
      return;
    }

    if (!checkBalance(currentAccount, value, "betaz")) {
      toast.error("Not enough balance!");
      return;
    }

    let hasRole = await execContractQuery(
      currentAccount?.address,
      betaz_core_contract.CONTRACT_ABI,
      betaz_core_contract.CONTRACT_ADDRESS,
      0,
      "accessControl::hasRole",
      adminRole,
      currentAccount?.address
    );

    if (!hasRole?.toHuman().Ok) {
      toast.error("You not admin!");
      return;
    } else {
      setIsLoading(true);
      const toastApprove = toast.loading("Approved ...");
      let allowance = await execContractTx(
        currentAccount,
        betaz_token_contract.CONTRACT_ABI,
        betaz_token_contract.CONTRACT_ADDRESS,
        0,
        "psp22::increaseAllowance",
        betaz_core_contract.CONTRACT_ADDRESS,
        convertToBalance(value)
      );
      toast.dismiss(toastApprove);

      if (allowance) {
        await delay(3000);
        const toastHandle = toast.loading("Execute update reward pool ...");
        await execContractTx(
          currentAccount,
          betaz_core_contract.CONTRACT_ABI,
          betaz_core_contract.CONTRACT_ADDRESS,
          0,
          "betA0CoreTrait::updateRewardPool",
          convertToBalance(value)
        );
        toast.dismiss(toastHandle);
      }
      setIsLoading(false);
    }
  };

  const onChangeValue = useCallback((e) => {
    const { value } = e.target;
    const reg = /^\d*\.?\d*$/;
    let val = 0;
    if ((!isNaN(value) && reg.test(value)) || value === "") {
      val = parseFloat(value);
      if (val < 0) val = 1;
      else {
        setValue(value);
      }
    }
  });

  useEffect(() => {
    dispatch(fetchUserBalance({ currentAccount }));
    dispatch(fetchBalance());
  }, [setIsLoading]);

  return (
    <SectionContainer
      className="deposit-box-container"
      sx={{ marginTop: "50px" }}
    >
      <Text className="deposit-box-title">Update Reward Pool</Text>
      <Box className="deposit-box-amount-box" mt="24px">
        <Text>Amount</Text>
        <Flex className="deposit-box-amount-input">
          <Input
            focusBorderColor="transparent"
            sx={{ border: "0px" }}
            value={value}
            onChange={onChangeValue}
            // type="number"
          />
          <Flex
            w="100px"
            alignItems="center"
            gap={1}
            pl="4px"
            borderLeft="2px solid rgba(255, 255, 255, 0.4)"
          >
            <AppIcon size="18px" />
            BetAZ
          </Flex>
        </Flex>
      </Box>
      <Flex direction="column" alignItems="center" mt="24px">
        <CommonButton
          text="Update Reward Pool"
          isLoading={isLoading}
          onClick={() => handleUpdate()}
        />
      </Flex>
    </SectionContainer>
  );
};

export default UpdateRewardPool;
