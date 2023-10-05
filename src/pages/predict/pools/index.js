import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import "./styles.css";
import { AppIcon } from "components/icons";

const Pools = () => {
  return (
    <SimpleGrid columns={3} spacing="24px">
      <Box className="pool-container">
        <Text className="pool-title">Reward Pool</Text>
        <Text className="pool-amount">0.000</Text>
        <Box className="pool-amount-container">
          <Text className="pool-amount">0.000</Text>
          <AppIcon size="18px" padding="8px" />
        </Box>
      </Box>
      <Box className="pool-container">
        <Text className="pool-title">General Pool</Text>
        <Box className="pool-amount-container">
          <Text className="pool-amount">0.000</Text>
          <Text className="pool-unit">BET</Text>
        </Box>
        <Box className="pool-amount-container">
          <Text className="pool-amount">0.000</Text>
          <AppIcon size="18px" padding="8px" />
        </Box>
      </Box>
      <Box className="pool-container">
        <Text className="pool-title">Bet Pool</Text>
        <Box className="pool-amount-container">
          <Text className="pool-amount">0.000</Text>
          <Text className="pool-unit">BET</Text>
        </Box>
        <Box className="pool-amount-container">
          <Text className="pool-amount">0.000</Text>
          <AppIcon size="18px" padding="8px" />
        </Box>
      </Box>
    </SimpleGrid>
  );
};
export default Pools;
