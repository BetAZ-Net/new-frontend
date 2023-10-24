import { Box, Text } from "@chakra-ui/react";
import LuckyNumberCircleImage from "assets/img/luckyNumberCircle.png";
import BetStageImage from "assets/img/bet-stage.png";
import "./styles.css";
import { useGame } from "contexts/useGame";

const LuckyNumberBox = () => {
  const { luckyNumber } = useGame();
  return (
    <Box
      className="lucky-number-container"
      bgImage={BetStageImage}
      bgRepeat="no-repeat"
      bgPosition="center"
      pb="40px"
    >
      <Box
        className="lucky-number-circle-image"
        bgImage={LuckyNumberCircleImage}
        bgRepeat="no-repeat"
        bgPosition="center"
      >
        <Text className="lucky-number-title">Lucky Number</Text>
        <Text className="lucky-number-text">
          {luckyNumber < 0 ? "--" : luckyNumber}
        </Text>
      </Box>
    </Box>
  );
};

export default LuckyNumberBox;
