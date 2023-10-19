import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import "./styles.css";
import { AppIcon } from "components/icons";
import { useSelector } from "react-redux";

const Pools = () => {
  const { poolBalance } = useSelector((s) => s.substrate);

  return (
    <SimpleGrid columns={{sm: 1, md: 2, lg: 3}} spacing="24px">
      <Box className="pool-container">
        <Text className="pool-title">Reward Pool</Text>
        <Box className="pool-amount-container">
          <Text className="pool-amount">{poolBalance?.reward}</Text>
          <AppIcon size="18px" padding="8px" />
        </Box>
      </Box>
      <Box className="pool-container">
        <Text className="pool-title">Staking Pool</Text>
        <Box className="pool-amount-container">
          <Text className="pool-amount">{poolBalance?.staking}</Text>
          <AppIcon size="18px" padding="8px" />
        </Box>
      </Box>
      <Box className="pool-container">
        <Text className="pool-title">Treasury Pool</Text>
        <Box className="pool-amount-container">
          <Text className="pool-amount">{poolBalance?.treasury}</Text>
          <AppIcon size="18px" padding="8px" />
        </Box>
      </Box>
    </SimpleGrid>
  );
};
export default Pools;
