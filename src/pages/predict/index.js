import {
  Box,
  Button,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import { SectionContainer } from "components/container";
import "./styles.css";
import { useState } from "react";
import Pools from "./pools";

const Predict = () => {
  const [sliderValue, setSliderValue] = useState(50);
  const [betAmount, setBetAmount] = useState(0);

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

  return (
    <SectionContainer>
      <Box>
        <SimpleGrid columns={2} spacing={10}>
          <Box></Box>
          <Box className="container">
            <Text className="title">Prediction</Text>
            <SimpleGrid columns={2} spacing="24px">
              <Box py="14px" className="inforBox">
                <Text className="linear-text amount">50</Text>
              </Box>
              <Box py="14px" px="14px" className="inforBox">
                <Text className="small-header">Pool Balance</Text>
                <Box className="small-content-container">
                  <Text className="linear-text small-content">24859.11</Text>
                </Box>
              </Box>
            </SimpleGrid>
            <Box py="14px" px="80px" className="inforBox">
              <Slider onChange={(val) => setSliderValue(val)}>
                <SliderTrack bg="#FFA000" h="12px" borderRadius="8px">
                  <SliderFilledTrack bg="#1A74E4" />
                </SliderTrack>
                <SliderThumb w="24px" h="24px" bg="#1BECA6" />
              </Slider>
              <Box mt="20px" display="flex" justifyContent="space-between">
                <Text {...labelStyles} color="#606060">
                  ROLL UNDER
                </Text>
                <Text {...labelStyles} color="#FFA000">
                  ROLL OVER
                </Text>
              </Box>
            </Box>
            <SimpleGrid columns={2} spacing="24px">
              <Box py="14px" px="14px" className="inforBox" display="flex">
                <Box className="bet-amount-box">
                  <Text className="small-header">Bet Amount</Text>
                  <SimpleGrid columns={3} className="bet-amount-box-content">
                    {betAmountList.map((e, index) => {
                      const isActive = index == betAmount;
                      return (
                        <Box
                          className={
                            isActive ? "bet-amount-active" : "bet-amount"
                          }
                          onClick={() => setBetAmount(index)}
                        >
                          <Text
                            color={isActive ? "#0D171B" : "#F7F7F8"}
                            fontSize="16px"
                            fontWeight="500"
                          >
                            {e?.label}
                          </Text>
                        </Box>
                      );
                    })}
                  </SimpleGrid>
                </Box>

                <Box ml="14px" w="120px">
                  <Text className="small-header">Win Chance</Text>
                  <SimpleGrid columns={2} className="bet-amount-box-content">
                    <Text className="linear-text win-chance-text">50</Text>
                    <Text className="win-chance-text">%</Text>
                  </SimpleGrid>
                </Box>
              </Box>
              <Box py="14px" px="14px" className="inforBox">
                <Text className="small-header">Your AZero Balance</Text>
                <Box className="small-content-container horizontal-box">
                  <Text className="linear-text small-content">20.3406</Text>
                  <Text className="unit-text">Azero</Text>
                </Box>
              </Box>
            </SimpleGrid>
            <SimpleGrid columns={2} spacing="24px">
              <Box py="14px" px="14px" className="inforBox" display="flex">
                <Box className="bet-amount-box">
                  <Text className="small-header">Bet Amount</Text>
                  <Box className="small-content-container horizontal-box">
                    <Text className="linear-text small-content">20.3406</Text>
                  </Box>
                </Box>

                <Box ml="14px" w="120px">
                  <Text className="small-header">Multiplier</Text>
                  <Box columns={2} className="bet-amount-box-content">
                    <Text className="linear-text win-chance-text">2.0456X</Text>
                  </Box>
                </Box>
              </Box>
              <Box py="14px" px="14px" className="inforBox">
                <Text className="small-header">Your BET Tokens</Text>
                <Box className="small-content-container horizontal-box">
                  <Text className="linear-text small-content">20.3406</Text>
                  <Text className="unit-text">BET</Text>
                </Box>
              </Box>
            </SimpleGrid>
            <Box className="horizontal-box" mt="24px">
              <Button minW="300px" py="10px">
                ROLL OVER 50
              </Button>
            </Box>
          </Box>
        </SimpleGrid>
        <Pools />
      </Box>
    </SectionContainer>
  );
};

export default Predict;
