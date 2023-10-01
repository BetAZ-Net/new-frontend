import { Box, Text } from "@chakra-ui/react";
import HistoryButtonImage from "assets/img/historyButton.png";
import { BsChevronCompactUp } from "react-icons/bs";

const HistoryButton = () => {
  return (
    <Box
      sx={{
        height: "88px",
        marginTop: "24px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
      bgImage={HistoryButtonImage}
      bgSize="cover"
      w="full"
      cursor="pointer"
    >
      <BsChevronCompactUp size="24px" color="#1BECA6" />
      <Text
        sx={{
          background: "linear-gradient(180deg, #1bbff4 0%, #1beca7 100%)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          fontsize: "24px",
          fontWeight: "700",
        }}
      >
        Bet History
      </Text>
    </Box>
  );
};

export default HistoryButton;
