import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import "./styles.css";
import { AppIcon } from "components/icons";
import { useDispatch, useSelector } from "react-redux";

const Pools = () => {
  const { poolBalance } = useSelector((s) => s.substrate);

  return (
    <SimpleGrid columns={3} spacing="24px">
      <Box className="pool-container">
        <Text className="pool-title">Core Pool</Text>
        <Box className="pool-amount-container">
          <Text className="pool-amount">0.000</Text>
          <Text className="pool-unit">BET</Text>
        </Box>
        <Box className="pool-amount-container">
          <Text className="pool-amount">{poolBalance.core}</Text>
          <AppIcon size="18px" padding="8px" />
        </Box>
      </Box>
      <Box className="pool-container">
        <Text className="pool-title">Staking Pool</Text>
        <Box className="pool-amount-container">
          <Text className="pool-amount">0.000</Text>
          <Text className="pool-unit">BET</Text>
        </Box>
        <Box className="pool-amount-container">
          <Text className="pool-amount">{poolBalance.staking}</Text>
          <AppIcon size="18px" padding="8px" />
        </Box>
      </Box>
      <Box className="pool-container">
        <Text className="pool-title">Treasury Pool</Text>
        <Box className="pool-amount-container">
          <Text className="pool-amount">0.000</Text>
          <Text className="pool-unit">BET</Text>
        </Box>
        <Box className="pool-amount-container">
          <Text className="pool-amount">{poolBalance.treasury}</Text>
          <AppIcon size="18px" padding="8px" />
        </Box>
      </Box>
    </SimpleGrid>
  );
};
export default Pools;
