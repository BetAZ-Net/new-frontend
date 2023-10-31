import { Box, Text } from "@chakra-ui/react";
import { AddressCopier } from "components/addressCopier";
import { AppIcon } from "components/icons";
import { formatNumDynDecimal, formatTokenBalance } from "utils";

export const formatTableValue = (value, key) => {
  switch (key) {
    case "player":
      return <AddressCopier address={value} />;
    case "blockNumber":
      return <Text textAlign="center">{formatNumDynDecimal(value)}</Text>;
    case "betAmount":
    case "wonAmount":
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text textAlign="center">{formatNumDynDecimal(value)}</Text>
          <AppIcon size="16px" />
        </Box>
      );
    case "type":
      return value ? (
        <Text textAlign="center" color="#FFA000">
          OVER
        </Text>
      ) : (
        <Text textAlign="center" color="#1A74E4">
          UNDER
        </Text>
      );
    default:
      return <Text textAlign="center">{value}</Text>;
  }
};
