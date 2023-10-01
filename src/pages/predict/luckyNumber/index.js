import { Box, Text } from "@chakra-ui/react";
import LuckyNumberCircleImage from "assets/img/luckyNumberCircle.png";
import "./styles.css";

const LuckyNumberBox = () => {
  return (
    <Box className="lucky-number-container">
      <Box
        className="lucky-number-circle-image"
        bgImage={LuckyNumberCircleImage}
      >
        <Text className="lucky-number-title">Lucky Number</Text>
        <Text className="lucky-number-text">--</Text>
      </Box>
    </Box>
  );
};

export default LuckyNumberBox;
