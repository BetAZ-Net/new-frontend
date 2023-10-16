import {
  Box,
  Button,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  Input,
} from "@chakra-ui/react";
import { SectionContainer } from "components/container";
import { useState, useEffect, useCallback } from "react";
import HistoryButton from "./historyButton";
import LuckyNumberBox from "./luckyNumber";
import Pools from "./pools";
import "./styles.css";
import BetHistoryModal from "./betHistoryModal";
import FloorImage from "assets/img/floor.png";
import DepositModal from "./depositModal";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import betaz_core from "utils/contracts/betaz_core_calls";
import useInterval from "hooks/useInterval";
import { useGame } from "contexts/useGame";
import { useWallet } from "contexts/useWallet";
import { clientAPI } from "api/client";
import {
  fetchUserBalance,
  fetchRollNumbers,
  fetchBalance,
  fetchRates,
} from "store/slices/substrateSlice";
import { delay } from "utils";
import { AppIcon } from "components/icons";

const labelStyles = {
  fontSize: "20px",
  fontWeight: "700",
};

const betAmountList = [
  {
    label: "x2",
  },
  {
    label: "x0.5",
  },
  {
    label: "Max",
  },
];

const Predict = () => {
  const dispatch = useDispatch();
  const { luckyNumber, setLuckyNumber, gameOn, setGameOn } = useGame();
  const { api } = useWallet();

  const [sliderValue, setSliderValue] = useState(50);
  const [betAmount, setBetAmount] = useState(0);
  const [betHistoryModalVisible, setBetHistoryModalVisible] = useState(false);
  const [depositModalVisible, setDepositModalVisible] = useState(false);
  const { currentAccount, poolBalance, betRollNumbers, betRates } = useSelector(
    (s) => s.substrate
  );
  const [position, setPosition] = useState(50);
  const [rollOver, setRollOver] = useState(true);
  const [maxBet, setMaxBet] = useState(10);

  const [betValue, setBetValue] = useState(10);

  const onChangePosition = (value) => {
    setPosition(value);
    setSliderValue(value);
  };

  const selectBetAmount = useCallback((option) => {
    let ratio = 0;
    if (option === 0) ratio = 2;
    else if (option === 1) ratio = 0.5;
    else ratio = 1;
    if (ratio == 1) {
      //all
      if (currentAccount?.balance?.azero > maxBet) {
        toast.error("Max Bet is " + maxBet + " AZERO");
        setBetValue(Number(maxBet));
      } else {
        if (currentAccount?.balance?.azero > 0)
          setBetValue(Number(currentAccount?.balance?.azero));
        else setBetValue(Number(maxBet));
      }
    } else {
      let new_betValue = betValue * ratio;
      if (new_betValue > maxBet) {
        toast.error("Max Bet is " + maxBet + " AZERO");
        setBetValue(Number(maxBet));
      } else {
        setBetValue(Number(new_betValue));
      }
    }
  });

  const onChangeBet = useCallback((e) => {
    const { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    let betValue = 0;
    if ((!isNaN(value) && reg.test(value)) || value === "" || value === "-") {
      betValue = parseFloat(value);
      if (betValue < 0) betValue = 1;
      if (betValue > maxBet) {
        toast.error("Max Bet is " + maxBet + " AZERO");
        setBetValue(Number(maxBet));
      } else {
        setBetValue(betValue);
      }
    }
  });

  const loadBalance = async () => {
    dispatch(fetchUserBalance({ currentAccount, api }));
    dispatch(fetchBalance({ currentAccount, api }));
  };

  const onRoll = async () => {
    if (currentAccount?.address === "") {
      toast.error("Please connect your wallet and select an account");
      return;
    }

    const bet = await betaz_core.getBet(currentAccount?.address);

    if (bet) {
      setGameOn(true);
      setLuckyNumber(-1);
      let finalized = await clientAPI("post", "/finalize", {
        player: currentAccount?.address,
      });

      console.log("finalized", finalized);

      if (!finalized) {
        toast.error("Something wrong with your roll");
        setLuckyNumber(-1);
        setGameOn(false);
        loadBalance();
        return;
      }

      // finalize
      setGameOn(false);
      setLuckyNumber(parseInt(finalized.random_number));
      if (finalized.is_win) toast("You won " + finalized.win_amount + " AZERO");
      else toast("Try again next time");
      loadBalance();
      return;
    }

    if (gameOn) {
      toast.error("Please wait till last roll completed");
      return;
    }

    if (betValue >= Number(currentAccount?.balance.azero)) {
      toast.error("You dont have enough balance to roll");
      return;
    }

    setGameOn(true);
    setLuckyNumber(-1);

    if (betValue <= maxBet) {
      let played = await betaz_core.play(
        currentAccount,
        betValue,
        position,
        rollOver
      );

      if (!played) {
        toast.error("Something wrong with your roll");
        setLuckyNumber(-1);
        setGameOn(false);
        loadBalance();
        return;
      }
    } else {
      setGameOn(false);
      toast.error("Not enough balance!");
    }

    loadBalance();
    await delay(2000);
    let finalized = await clientAPI("post", "/finalize", {
      player: currentAccount?.address,
    });

    console.log("finalized", finalized);

    if (!finalized) {
      toast.error("Something wrong with your roll");
      setLuckyNumber(-1);
      setGameOn(false);
      loadBalance();
      return;
    }

    // finalize
    setGameOn(false);
    setLuckyNumber(parseInt(finalized.random_number));
    if (finalized.is_win) toast("You won " + finalized.win_amount + " AZERO");
    else toast("Try again next time");
    loadBalance();
  };

  const loadMaxBet = async () => {
    const max_Bet = await betaz_core.getMaxBet(currentAccount?.address);
    if (maxBet != max_Bet) {
      setMaxBet(Math.floor(max_Bet * 100) / 100);
    }
  };

  useInterval(() => {
    if (currentAccount?.address) {
      loadMaxBet();
    }
  }, 1000);

  return (
    <SectionContainer>
      <DepositModal
        visible={depositModalVisible}
        onClose={() => setDepositModalVisible(false)}
      />
      <Box>
        <Box
          bgSize="contain"
          bgRepeat="no-repeat"
          bgImage={FloorImage}
          bgPosition="bottom"
        >
          <SimpleGrid columns={{ md: 1, lg: 2 }} spacing={10}>
            <LuckyNumberBox />
            <Box className="container">
              <Text className="title">Prediction</Text>
              <SimpleGrid columns={2} spacing="24px">
                <Box
                  py="14px"
                  className="inforBox"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text className="linear-text amount">{position}</Text>
                </Box>
                <Box py="14px" px="14px" className="inforBox">
                  <Text className="small-header">Core Pool</Text>
                  <Box className="small-content-container">
                    <Text className="linear-text small-content">
                      {poolBalance?.core}
                    </Text>
                  </Box>
                </Box>
              </SimpleGrid>
              <Box py="14px" px="80px" className="inforBox">
                <Slider
                  onChange={(e) => onChangePosition(e)}
                  zIndex={10}
                  min={
                    rollOver
                      ? betRollNumbers?.numberOverRollMin
                      : betRollNumbers?.numberUnerRollMin
                  }
                  max={
                    rollOver
                      ? betRollNumbers?.numberOverRollMax
                      : betRollNumbers?.numberUnerRollMax
                  }
                >
                  <SliderTrack
                    bg={rollOver ? "#1A74E4" : "#FFA000"}
                    h="12px"
                    borderRadius="8px"
                  >
                    <SliderFilledTrack bg={rollOver ? "#FFA000" : "#1A74E4"} />
                  </SliderTrack>
                  <SliderThumb w="24px" h="24px" bg="#1BECA6" />
                </Slider>
                <Box mt="20px" display="flex" justifyContent="space-between">
                  <Text
                    {...labelStyles}
                    color={rollOver ? "#606060" : "#1A74E4"}
                    cursor="pointer"
                    onClick={() => {
                      setRollOver(false);
                    }}
                  >
                    ROLL UNDER
                  </Text>
                  <Text
                    {...labelStyles}
                    color={rollOver ? "#FFA000" : "#606060"}
                    cursor="pointer"
                    onClick={() => {
                      setRollOver(true);
                    }}
                  >
                    ROLL OVER
                  </Text>
                </Box>
              </Box>
              <SimpleGrid columns={2} spacing="24px">
                <Box
                  py="14px"
                  px="14px"
                  className="inforBox"
                  display="flex"
                  flexWrap="wrap"
                  gap="14px"
                >
                  <Box className="bet-amount-box" minW="100px">
                    <Text className="small-header">Bet Amount</Text>
                    <SimpleGrid columns={3} className="bet-amount-box-content">
                      {betAmountList.map((e, index) => {
                        const isActive = index == betAmount;
                        return (
                          <Box
                            className={
                              isActive ? "bet-amount-active" : "bet-amount"
                            }
                            onClick={() => {
                              setBetAmount(index);
                              selectBetAmount(index);
                            }}
                          >
                            <Text
                              color={isActive ? "#0D171B" : "#F7F7F8"}
                              fontSize="16px"
                              fontWeight={isActive ? "700" : "500"}
                            >
                              {e?.label}
                            </Text>
                          </Box>
                        );
                      })}
                    </SimpleGrid>
                  </Box>

                  <Box w="120px" minW="100px">
                    <Text className="small-header">Win Chance</Text>
                    <SimpleGrid columns={2} className="bet-amount-box-content">
                      <Text className="linear-text win-chance-text">
                        {rollOver
                          ? (99 - position).toString()
                          : position.toString()}
                        %
                      </Text>
                      <Text className="win-chance-text">%</Text>
                    </SimpleGrid>
                  </Box>
                </Box>
                <Box py="14px" px="14px" className="inforBox">
                  <Text className="small-header">Your Astar Balance</Text>
                  <Box className="small-content-container horizontal-box">
                    <Text className="linear-text small-content">
                      {currentAccount?.balance?.azero}
                    </Text>
                    <AppIcon size="14px" padding="3px" />
                  </Box>
                </Box>
              </SimpleGrid>
              <SimpleGrid columns={2} spacing="24px">
                <Box
                  py="14px"
                  px="14px"
                  className="inforBox"
                  display="flex"
                  flexWrap="wrap"
                  gap="14px"
                >
                  <Box className="bet-amount-box" minW="100px">
                    <Text className="small-header">Bet Amount</Text>
                    <Box
                      className="small-content-container horizontal-box"
                      sx={{
                        padding: "0 !important",
                      }}
                    >
                      <Input
                        focusBorderColor="transparent"
                        sx={{
                          border: "0px",
                          color: rollOver ? "#FFA000" : "#1A74E4",
                          maxHeight: "max-content",
                          fontsize: "16px",
                          fontStyle: "normal",
                          fontWeight: "500",
                          lineHeight: "normal",
                          textAlign: "center",
                        }}
                        value={betValue}
                        type="Number"
                        onChange={onChangeBet}
                      />
                    </Box>
                  </Box>

                  <Box w="120px" minW="100px">
                    <Text className="small-header">Multiplier</Text>
                    <Box className="small-content-container horizontal-box">
                      <Text className="linear-text small-content">
                        {rollOver
                          ? (
                              parseInt(
                                betRates?.overRates[parseInt(position)]
                              ) / 10000
                            ).toFixed(2)
                          : (
                              parseInt(
                                betRates?.underRates[parseInt(position)]
                              ) / 10000
                            ).toFixed(2)}
                        X
                      </Text>
                    </Box>
                  </Box>
                </Box>
                <Box py="14px" px="14px" className="inforBox">
                  <Text className="small-header">Your BET Tokens</Text>
                  <Box className="small-content-container horizontal-box">
                    <Text className="linear-text small-content">
                      {currentAccount?.balance?.betaz}
                    </Text>
                    <Text className="unit-text">BET</Text>
                  </Box>
                </Box>
              </SimpleGrid>
              <SimpleGrid columns={2} spacing="24px" mt="24px">
                <Button
                  minW="50%"
                  py="10px"
                  bg="#122126"
                  color="#F7F7F8"
                  boxShadow="4px 4px 6px 0px rgba(255, 255, 255, 0.20) inset"
                  _hover={{ color: "#000", bg: "#E2E8F0" }}
                  onClick={() => setDepositModalVisible(true)}
                >
                  Deposit
                </Button>
                <Button minW="50%" py="10px" onClick={() => onRoll()}>
                  ROLL {rollOver ? "OVER" : "UNDER"} {position}
                </Button>
              </SimpleGrid>
            </Box>
          </SimpleGrid>
        </Box>
        <Pools />
        <HistoryButton onClick={() => setBetHistoryModalVisible(true)} />
        <BetHistoryModal
          isOpen={betHistoryModalVisible}
          onClose={() => setBetHistoryModalVisible(false)}
        />
      </Box>
    </SectionContainer>
  );
};

export default Predict;
