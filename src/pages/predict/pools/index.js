import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import "./styles.css";
import { AppIcon } from "components/icons";
import { useSelector } from "react-redux";

const Pools = () => {
  const { poolBalance } = useSelector((s) => s.substrate);

  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing="24px">
      <Box className="pool-container">
        <Text className="pool-title">Core Pool</Text>
        <Box className="pool-amount-container">
          <Text className="pool-amount" fontSize={{base:"20px", sm:"24px"}}>{poolBalance?.core}</Text>
          <AppIcon  size={{base:"17px", sm:"18px"}} padding="6px" />
        </Box>
      </Box>
      <Box className="pool-container">
        <Text className="pool-title">Staking Pool</Text>
        <Box className="pool-amount-container">
          <Text className="pool-amount" fontSize={{base:"20px", sm:"24px"}}>{poolBalance?.staking}</Text>
          <AppIcon  size={{base:"17px", sm:"18px"}} padding="6px" />
        </Box>
      </Box>
      <Box className="pool-container">
        <Text className="pool-title">Treasury Pool</Text>
        <Box className="pool-amount-container">
          <Text className="pool-amount" fontSize={{base:"20px", sm:"24px"}}>{poolBalance?.treasury}</Text>
          <AppIcon  size={{base:"17px", sm:"18px"}} padding="6px" />
        </Box>
      </Box>
    </SimpleGrid>
  );
};
export default Pools;
