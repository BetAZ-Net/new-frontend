import {
  Box,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";
import { AppIcon } from "components/icons";
import { useDispatch, useSelector } from "react-redux";
import { useState, useCallback, useEffect, useRef, memo } from "react";
import toast from "react-hot-toast";
import { fetchUserBalance, fetchBalance } from "store/slices/substrateSlice";
import {
  formatTokenBalance,
  formatChainStringToNumber,
  convertTimeStampToNumber,
  convertToBalance,
  delay,
} from "utils";
import CommonButton from "components/button/commonButton";
import useInterval from "hooks/useInterval";
import { execContractQuery, execContractTx } from "utils/contracts";
import staking_pool_contract from "utils/contracts/staking_pool";
import betaz_token_contract from "utils/contracts/betaz_token";
import { useModal } from "contexts/useModal";
import staking_pool_calls from "utils/contracts/staking_pool_calls";
import { clientAPI } from "api/client";

const defaultCaller = process.env.REACT_APP_DEFAULT_CALLER_ADDRESS;

const StakingPool = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const dispatch = useDispatch();
  const { currentAccount } = useSelector((s) => s.substrate);
  const [stakeValue, setStakeValue] = useState(0);
  const [unstakeValue, setUnstakeValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { stakingPoolModalVisible, setStakingPoolModalVisible } = useModal();
  const onCloseStakingPoolModal = () => setStakingPoolModalVisible(false);

  const getEndTimeUnstake = async (currentAccount, unstakeAmount) => {
    const [requestTime, limitTime] = await Promise.all([
      staking_pool_calls.getRequestTimeUnstake(
        currentAccount?.address,
        convertToBalance(unstakeAmount)
      ),
      staking_pool_calls.getlimitTimeUnstake(defaultCaller),
    ]);

    return (
      convertTimeStampToNumber(requestTime) +
      convertTimeStampToNumber(limitTime)
    );
  };

  /** Stake token */
  const onChangeStakeValue = useCallback((e) => {
    const { value } = e.target;
    const reg = /^\d*\.?\d*$/;
    let stakeValue = 0;
    if ((!isNaN(value) && reg.test(value)) || value === "") {
      stakeValue = parseFloat(value);
      if (stakeValue < 0) stakeValue = 1;
      if (
        stakeValue > formatChainStringToNumber(currentAccount?.balance?.betaz)
      ) {
        toast.error("Not enough Balance!");
        setStakeValue(
          formatChainStringToNumber(currentAccount?.balance?.betaz)
        );
      } else {
        setStakeValue(value);
      }
    }
  });

  const stake = async () => {
    if (stakeValue === "" || stakeValue == 0) {
      toast.error("invalid inputs!");
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

      // approve token
      const toastApprove = toast.loading("Step 2: Approved ...");
      let allowance = await execContractTx(
        currentAccount,
        betaz_token_contract.CONTRACT_ABI,
        betaz_token_contract.CONTRACT_ADDRESS,
        0,
        "psp22::increaseAllowance",
        staking_pool_contract.CONTRACT_ADDRESS,
        convertToBalance(stakeValue)
      );
      toast.dismiss(toastApprove);

      if (allowance && currentAccount?.address) {
        const toastStake = toast.loading("Step 3: Staking ...");
        let stakeAmount = parseFloat(stakeValue);
        const result = await execContractTx(
          currentAccount,
          staking_pool_contract.CONTRACT_ABI,
          staking_pool_contract.CONTRACT_ADDRESS,
          0,
          "stake",
          convertToBalance(stakeAmount)
        );
        if (result) {
          toast.dismiss(toastStake);
          toast.success(`Staking success`);
        } else toast.dismiss(toastStake);
      }
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

  /** Request Unstake */
  const onChangeRequestunstakeValue = useCallback((e) => {
    const { value } = e.target;
    const reg = /^\d*\.?\d*$/;
    let rqunstakeValue = 0;
    if ((!isNaN(value) && reg.test(value)) || value === "") {
      rqunstakeValue = parseFloat(value);
      if (rqunstakeValue < 0) rqunstakeValue = 1;
      if (
        rqunstakeValue >
        formatChainStringToNumber(currentAccount?.balance?.stake)
      ) {
        toast.error("Not enough Balance!");
        setUnstakeValue(
          formatChainStringToNumber(currentAccount?.balance?.stake)
        );
      } else {
        setUnstakeValue(value);
      }
    }
  });

  const requestUnstake = async () => {
    if (unstakeValue === "" || unstakeValue == 0) {
      toast.error("invalid inputs!");
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

      const toastUnstake = toast.loading("Step 2: Request unstake ...");
      let unstakeAmount = parseFloat(unstakeValue);
      const result = await execContractTx(
        currentAccount,
        staking_pool_contract.CONTRACT_ABI,
        staking_pool_contract.CONTRACT_ADDRESS,
        0,
        "requestUnstake",
        convertToBalance(unstakeAmount)
      );
      if (result) {
        toast.dismiss(toastUnstake);
        toast.success(`Staking success`);

        // get Time resquest unstake
        await delay(2000);
        let endTimeRequest = await getEndTimeUnstake(
          currentAccount,
          unstakeAmount
        );
        await clientAPI("post", "/addPendingUnstake", {
          caller: currentAccount?.address,
          amount: unstakeAmount,
          time: endTimeRequest,
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

  return (
    <>
      <Modal
        size="full"
        isCentered
        isOpen={stakingPoolModalVisible}
        onClose={onCloseStakingPoolModal}
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent className="deposit-modal-container">
          <ModalBody display="flex" padding="0px">
            <Box className="deposit-modal-box-container">
              <Box className="deposit-modal-box">
                <Flex justify="space-between">
                  <Text className="linear-text-color deposit-modal-box-title">
                    Stake / Unstake
                  </Text>
                  <Flex
                    w="28px"
                    h="28px"
                    justify="center"
                    alignItems="center"
                    cursor="pointer"
                    onClick={() => onCloseStakingPoolModal()}
                  >
                    <IoMdClose color="#FFF" size="20px" />
                  </Flex>
                </Flex>
                <Flex className="tab-container">
                  <Box
                    className={`tab-button ${
                      tabIndex == 0 && "tab-button-active"
                    }`}
                    onClick={() => setTabIndex(0)}
                  >
                    Stake
                  </Box>
                  <Box
                    className={`tab-button ${
                      tabIndex == 1 && "tab-button-active"
                    }`}
                    onClick={() => setTabIndex(1)}
                  >
                    Unstake
                  </Box>
                </Flex>
                {/* Tab content */}
                {/* Stake */}
                <SimpleGrid
                  display={tabIndex === 0 ? "block" : "none"}
                  spacing="24px"
                  mt="24px"
                >
                  <Flex flexDirection="column" gap="24px">
                    <Box className="deposit-box-amount-box">
                      <Text>Your Betaz token Balance</Text>
                      <Flex className="deposit-box-amount-input">
                        <Text className="linear-text azero-amount">
                          {currentAccount?.balance?.betaz}
                        </Text>
                        <AppIcon size="14px" padding="3px" />
                      </Flex>
                    </Box>
                    <Box className="deposit-box-amount-box">
                      <Text>Your Staked amount</Text>
                      <Flex className="deposit-box-amount-input">
                        <Text className="linear-text azero-amount">
                          {currentAccount?.balance?.stake}
                        </Text>
                        <AppIcon size="14px" padding="3px" />
                      </Flex>
                    </Box>
                    <Box className="deposit-box-amount-box">
                      <Text>Stake</Text>
                      <Flex className="deposit-box-amount-input">
                        <Input
                          focusBorderColor="transparent"
                          sx={{ border: "0px" }}
                          value={stakeValue}
                          onChange={onChangeStakeValue}
                          // type="Number"
                        />
                      </Flex>
                    </Box>
                    <CommonButton
                      onClick={() => stake()}
                      text="Stake"
                      isLoading={isLoading}
                    />
                    <Box>
                      <Text textAlign="center">
                        By Clicking your agree with our
                      </Text>
                      <Text
                        className="linear-text-color-01 term-aggreement-text"
                        textAlign="center"
                      >
                        Terms and Conditions, Privacy Policy
                      </Text>
                    </Box>
                  </Flex>
                </SimpleGrid>
                {/* Unstake */}
                <SimpleGrid
                  display={tabIndex === 1 ? "block" : "none"}
                  spacing="24px"
                  mt="24px"
                >
                  <Flex flexDirection="column" gap="24px">
                    <Box className="deposit-box-amount-box">
                      <Text>Your Betaz token Balance</Text>
                      <Flex className="deposit-box-amount-input">
                        <Text className="linear-text azero-amount">
                          {currentAccount?.balance?.betaz}
                        </Text>
                        <AppIcon size="14px" padding="3px" />
                      </Flex>
                    </Box>
                    <Box className="deposit-box-amount-box">
                      <Text>Your Staked amount</Text>
                      <Flex className="deposit-box-amount-input">
                        <Text className="linear-text azero-amount">
                          {currentAccount?.balance?.stake}
                        </Text>
                        <AppIcon size="14px" padding="3px" />
                      </Flex>
                    </Box>
                    <Box className="deposit-box-amount-box">
                      <Text>Requets unstake</Text>
                      <Flex className="deposit-box-amount-input">
                        <Input
                          focusBorderColor="transparent"
                          sx={{ border: "0px" }}
                          onChange={onChangeRequestunstakeValue}
                          value={unstakeValue}
                          // type="Number"
                        />
                      </Flex>
                    </Box>
                    <CommonButton
                      onClick={() => requestUnstake()}
                      text="Requets unstake"
                      isLoading={isLoading}
                    />
                    <Box>
                      <Text textAlign="center">
                        By Clicking your agree with our
                      </Text>
                      <Text
                        className="linear-text-color-01 term-aggreement-text"
                        textAlign="center"
                      >
                        Terms and Conditions, Privacy Policy
                      </Text>
                    </Box>
                  </Flex>
                </SimpleGrid>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default memo(StakingPool);
