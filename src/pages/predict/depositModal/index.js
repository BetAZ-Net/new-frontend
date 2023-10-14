import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import depositBGLightStage from "assets/img/deposit-bg-light-stage.png";
import AppLogoText from "assets/img/app-logo-text.png";
import DepositAmountCircle from "assets/img/deposit-amount-circle.png";
import "./styles.css";
import { IoMdClose } from "react-icons/io";
import { AppIcon } from "components/icons";
import { useDispatch, useSelector } from "react-redux";
import betaz_token from "utils/contracts/betaz_token_calls";
import betaz_core from "utils/contracts/betaz_core_calls";
import { useState, useCallback, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import useInterval from "hooks/useInterval";
import { useDebounce } from "hooks/useDebounce";
import { fetchUserBalance, fetchBalance } from "store/slices/substrateSlice";
import { formatTokenBalance } from "utils";

const DepositModal = ({ visible, onClose }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const dispatch = useDispatch();
  const { currentAccount, poolBalance, buyStatus } = useSelector(
    (s) => s.substrate
  );
  const [maxbuyAmount, setMaxbuyAmount] = useState(10);
  const [azeroAmount, setAzeroAmount] = useState(0);
  const [holdAmount, setHoldAmount] = useState(0);
  const [holdAmountVal, setHoldAmountVal] = useState(0);

  /** Count down time */
  let endTimeString = buyStatus?.endTime?.toString();
  let endTimeWithoutCommas = endTimeString
    ? endTimeString.replace(/,/g, "")
    : "";

  let endTimeNumber = endTimeWithoutCommas
    ? parseInt(endTimeWithoutCommas, 10)
    : "";
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const timeoutRef = useRef(null);
  function calculateTimeLeft() {
    const difference = +new Date(endTimeNumber) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  });

  const { days, hours, minutes, seconds } = timeLeft;

  /** Buy token */
  const getMaxbuy = async () => {
    const [amountTokenSold, amountMaxBuy, tokenRatio] = await Promise.all([
      await betaz_token.getAmountTokenSold(currentAccount?.address),
      await betaz_token.getMaxBuyAmount(currentAccount?.address),
      await betaz_token.getTokenRatio(currentAccount?.address),
    ]);
    setMaxbuyAmount(
      Math.floor(((amountMaxBuy - amountTokenSold) / tokenRatio) * 100) / 100
    );
  };

  const onChangeToken = useCallback((e) => {
    const { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    let tokenValue = 0;
    if ((!isNaN(value) && reg.test(value)) || value === "" || value === "-") {
      tokenValue = parseFloat(value);
      if (tokenValue < 0) tokenValue = 1;
      if (tokenValue > maxbuyAmount) {
        toast.error("Not enough Balance!");
        setAzeroAmount(maxbuyAmount);
      } else {
        setAzeroAmount(tokenValue);
      }
    }
  });

  const buy = async () => {
    if (currentAccount?.address) {
      const result = await betaz_token.buy(currentAccount, azeroAmount);
      if (result) {
        toast.success(`Buy BetAZ success`);
        dispatch(fetchUserBalance({ currentAccount }));
        dispatch(fetchBalance({ currentAccount }));
        getMaxbuy();
      } else toast.error(`Buy failure`);
    }
  };

  useEffect(() => {
    if (currentAccount?.address) {
      getMaxbuy();
    }
  }, [onChangeToken]);

  /** Withdraw azero */
  const getHoldAmount = async () => {
    const holdAmount = await betaz_core.getHoldAmountPlayers(currentAccount);
    if (holdAmount) setHoldAmount(Math.floor(holdAmount * 100) / 100);
    else setHoldAmount(0);
  };

  const withdraw = async () => {
    if (currentAccount?.address) {
      if (!holdAmount) {
        toast.error("You not hold amount!");
        return;
      } else if (poolBalance?.core == 0) {
        toast.error("Not enough balance!");
        return;
      } else {
        const result = await betaz_core.withdrawHoldAmount(
          currentAccount,
          holdAmountVal
        );
        if (result) {
          toast.success(`Withdraw success`);
          dispatch(fetchUserBalance({ currentAccount }));
          dispatch(fetchBalance({ currentAccount }));
          getHoldAmount();
        } else toast.error(`Withdraw failure`);
      }
    }
  };

  const onChangeholdAmount = useCallback((e) => {
    const { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    let holdValue = 0;
    if ((!isNaN(value) && reg.test(value)) || value === "" || value === "-") {
      holdValue = parseFloat(value);
      if (holdValue < 0) holdValue = 1;
      if (holdValue > holdAmount) {
        toast.error("Not enough Balance!");
        setHoldAmountVal(holdAmount);
      } else {
        setHoldAmountVal(holdValue);
      }
    }
  });

  useEffect(() => {
    getHoldAmount();
  }, [currentAccount]);

  // useInterval(() => {
  //   if (currentAccount?.address) {
  //     getMaxbuy();
  //   }
  // }, 1000);
  return (
    <>
      <Modal size="full" isCentered isOpen={visible} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent className="deposit-modal-container">
          <ModalBody display="flex" padding="0px">
            <Box className="deposit-modal-box-container">
              <Box className="deposit-modal-box">
                <Flex justify="space-between">
                  <Text className="linear-text-color deposit-modal-box-title">
                    Deposit / Withdraw
                  </Text>
                  <Flex
                    w="28px"
                    h="28px"
                    justify="center"
                    alignItems="center"
                    cursor="pointer"
                    onClick={() => onClose()}
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
                    Deposit
                  </Box>
                  <Box
                    className={`tab-button ${
                      tabIndex == 1 && "tab-button-active"
                    }`}
                    onClick={() => setTabIndex(1)}
                  >
                    Withdraw
                  </Box>
                </Flex>
                {/* buy */}
                <SimpleGrid
                  display={tabIndex === 0 ? "block" : "none"}
                  spacing="24px"
                  mt="24px"
                >
                  <Flex flexDirection="column" gap="24px">
                    <Box className="deposit-box-amount-box">
                      <Text>Your AZero Balance</Text>
                      <Flex className="deposit-box-amount-input">
                        <Text className="linear-text azero-amount">
                          {currentAccount?.balance?.azero}
                        </Text>
                        <Text className="azero-unit">AZero</Text>
                      </Flex>
                    </Box>
                    <Box className="deposit-box-amount-box">
                      <Text>Deposit</Text>
                      <Flex className="deposit-box-amount-input">
                        <Input
                          focusBorderColor="transparent"
                          sx={{ border: "0px" }}
                          value={azeroAmount}
                          onChange={onChangeToken}
                          type="Number"
                        />
                        <Flex
                          cursor="pointer"
                          w="100px"
                          alignItems="center"
                          textAlign="center"
                          flexDirection="column"
                          borderLeft="2px solid rgba(255, 255, 255, 0.4)"
                          onClick={() => setAzeroAmount(maxbuyAmount)}
                        >
                          Max
                        </Flex>
                      </Flex>
                    </Box>
                    <Button onClick={() => buy()}>Deposit</Button>
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
                {/* withdraw */}
                <SimpleGrid
                  display={tabIndex === 1 ? "block" : "none"}
                  spacing="24px"
                  mt="24px"
                >
                  <Flex flexDirection="column" gap="24px">
                    <Box className="deposit-box-amount-box">
                      <Text>Your Hold Amount Balance</Text>
                      <Flex className="deposit-box-amount-input">
                        <Text className="linear-text azero-amount">
                          {holdAmount}
                        </Text>
                        <Text className="azero-unit">AZero</Text>
                      </Flex>
                    </Box>
                    <Box className="deposit-box-amount-box">
                      <Text>Hold amount</Text>
                      <Flex className="deposit-box-amount-input">
                        <Input
                          focusBorderColor="transparent"
                          sx={{ border: "0px" }}
                          onChange={onChangeholdAmount}
                          value={holdAmountVal}
                          type="Number"
                        />
                      </Flex>
                    </Box>
                    <Button onClick={withdraw}>Withdraw hold amount</Button>
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
            <Box
              className="deposit-modal-circle-container"
              bgImage={depositBGLightStage}
            >
              <Flex
                bgImage={DepositAmountCircle}
                className="deposit-modal-circle-content"
              >
                <SimpleGrid
                  spacing="32px"
                  alignItems="center"
                  display="flex"
                  flexDirection="column"
                >
                  <Image
                    height={{ base: "32px" }}
                    alt="app-logo-text"
                    src={AppLogoText}
                  />
                  <Text className="deposit-circle-quote">
                    Easy way for crypto Play
                  </Text>
                  <Text className="deposit-circle-amount linear-text-color-01">
                    {maxbuyAmount ? formatTokenBalance(maxbuyAmount) : 0}
                  </Text>
                  <Box>
                    <Text className="deposit-circle-finish-title">
                      Finishes in:
                    </Text>
                    {buyStatus?.endTime == 0 ? (
                      <Text>END TIME</Text>
                    ) : (
                      <SimpleGrid columns={4} spacing="10px">
                        <Flex alignItems="flex-end">
                          <Text className="deposit-circle-finish-countdown linear-text-color-01">
                            {days || "00"}
                          </Text>
                          <Text className="deposit-circle-finish-countdown-unit">
                            d
                          </Text>
                        </Flex>
                        <Flex alignItems="flex-end">
                          <Text className="deposit-circle-finish-countdown linear-text-color-01">
                            {hours || "00"}
                          </Text>
                          <Text className="deposit-circle-finish-countdown-unit">
                            h
                          </Text>
                        </Flex>
                        <Flex alignItems="flex-end">
                          <Text className="deposit-circle-finish-countdown linear-text-color-01">
                            {minutes || "00"}
                          </Text>
                          <Text className="deposit-circle-finish-countdown-unit">
                            m
                          </Text>
                        </Flex>
                        <Flex alignItems="flex-end">
                          <Text className="deposit-circle-finish-countdown linear-text-color-01">
                            {seconds || "00"}
                          </Text>
                          <Text className="deposit-circle-finish-countdown-unit">
                            s
                          </Text>
                        </Flex>
                      </SimpleGrid>
                    )}
                  </Box>
                </SimpleGrid>
              </Flex>
            </Box>
            {/* {supportWallets?.map((e, index) => (
                <WalletItem data={e} key={`wallet-item-${index}`} />
              ))}
              {walletAccounts?.length > 0 && (
                <Box sx={{ marginTop: "16px" }}>
                  <Divider />
                  <Text
                    sx={{
                      color: "#1BECA7",
                      marginTop: "8px",
                      fontWeight: "512",
                      fontSize: "20px",
                    }}
                  >
                    Select Account
                  </Text>
                  {walletAccounts?.map((e, index) => {
                    return <AccountItem key={`account-item-${index}`} data={e} />;
                  })}
                </Box>
              )} */}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default DepositModal;
