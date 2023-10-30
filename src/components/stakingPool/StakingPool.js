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
import betaz_token from "utils/contracts/betaz_token_calls";
import betaz_core from "utils/contracts/betaz_core_calls";
import { useState, useCallback, useEffect, useRef, memo } from "react";
import toast from "react-hot-toast";
import { fetchUserBalance, fetchBalance } from "store/slices/substrateSlice";
import {
  formatTokenBalance,
  formatChainStringToNumber,
  convertTimeStampToNumber,
  convertToBalance,
} from "utils";
import CommonButton from "components/button/commonButton";
import useInterval from "hooks/useInterval";
import { execContractQuery, execContractTx } from "utils/contracts";
import staking_pool_contract from "utils/contracts/staking_pool";
import betaz_token_contract from "utils/contracts/betaz_token";
import { useModal } from "contexts/useModal";
import { delay } from "utils";
import UnstakeModal from "./unstakeModal/UnstakeModal";

const defaultCaller = process.env.REACT_APP_DEFAULT_CALLER_ADDRESS;

const StakingPool = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const dispatch = useDispatch();
  const { currentAccount } = useSelector((s) => s.substrate);
  const [stakeValue, setStakeValue] = useState(0);
  const [unstakeValue, setUnstakeValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const {
    stakingPoolModalVisible,
    setStakingPoolModalVisible,
    setUnstakeModalVisible,
    unstakeModalVisible
  } = useModal();
  const onCloseStakingPoolModal = () => setStakingPoolModalVisible(false);
  const onOpenUnstakeModal = () => setUnstakeModalVisible(true);
  const onCloseUnstakeModal = () => setUnstakeModalVisible(false);

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
      }
      setIsLoading(false);
    }
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
                      <Text>Requet unstake</Text>
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
                    <SimpleGrid gap="12px" columns={2}>
                      <CommonButton
                        onClick={() => {
                          toast.success("Comming soon...");
                        }}
                        text="Request unstake"
                        isLoading={isLoading}
                      />
                      <CommonButton onClick={onOpenUnstakeModal} text="Unstake" />
                    </SimpleGrid>
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
      <UnstakeModal isOpen={unstakeModalVisible} onClose={onCloseUnstakeModal} />
    </>
  );
};

export default memo(StakingPool);
