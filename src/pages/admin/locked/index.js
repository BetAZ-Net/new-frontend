import {
  Box,
  Text,
  Input,
  Flex,
  Button,
  FormLabel,
  Switch,
  SimpleGrid,
} from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { SectionContainer } from "components/container";
import { AppIcon } from "components/icons";
import CommonButton from "components/button/commonButton";
import { useDispatch, useSelector } from "react-redux";
import { convertToBalance } from "utils";
import { execContractTx, execContractQuery } from "utils/contracts";
import staking_pool_contract from "utils/contracts/staking_pool";
import { useWallet } from "contexts/useWallet";
import { fetchUserBalance, fetchBalance } from "store/slices/substrateSlice";

const adminRole = process.env.REACT_APP_ADMIN_ROLE;

const Locked = () => {
  const { currentAccount } = useSelector((s) => s.substrate);

  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const getIslocked = async () => {
    if (currentAccount) {
      let result = await execContractQuery(
        currentAccount?.address,
        staking_pool_contract.CONTRACT_ABI,
        staking_pool_contract.CONTRACT_ADDRESS,
        0,
        "stakingPoolTrait::getIsLocked"
      );

      if (result) {
        let lock = result?.toHuman().Ok;
        setIsLocked(lock);
      }
    }
  };

  const handleSwitch = async () => {
    if (value === isLocked) {
      toast.error("Invalid status!");
      return;
    }

    let hasRole = await execContractQuery(
      currentAccount?.address,
      staking_pool_contract.CONTRACT_ABI,
      staking_pool_contract.CONTRACT_ADDRESS,
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
      await execContractTx(
        currentAccount,
        staking_pool_contract.CONTRACT_ABI,
        staking_pool_contract.CONTRACT_ADDRESS,
        0,
        "stakingPoolTrait::updateIsLocked",
        value
      );
      setIsLoading(false);
    }
  };

  const onChangeValue = useCallback((e) => {
    const { checked } = e.target;
    setValue(checked);
  });

  useEffect(() => {
    getIslocked();
  }, []);

  return (
    <SectionContainer
      className="deposit-box-container"
      sx={{ marginTop: "100px" }}
    >
      <Text className="deposit-box-title">Update is locked</Text>
      <Box className="deposit-box-amount-box" mt="24px">
        <SimpleGrid columns={2}>
          <Text textAlign="center">
            Status: <b>{isLocked ? "Locked" : "Not lock"}</b>
          </Text>
          <Flex justifyContent="center" alignItems="center">
            <Switch
              id="isChecked"
              colorScheme="teal"
              size="lg"
              onChange={onChangeValue}
            />
          </Flex>
        </SimpleGrid>
      </Box>
      <Flex direction="column" alignItems="center" mt="24px">
        <CommonButton
          text="Change status"
          isLoading={isLoading}
          onClick={() => handleSwitch()}
        />
      </Flex>
    </SectionContainer>
  );
};

export default Locked;
