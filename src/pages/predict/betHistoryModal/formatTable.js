import { Box, Text } from "@chakra-ui/react";
import { AddressCopierMobile } from "components/addressCopier";
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

export const formatTableValueMobile = (value, key) => {
  switch (key) {
    case "player":
      return <AddressCopierMobile address={value} />;
    case "blockNumber":
      return <Text textAlign="center" className="linear-text">{formatNumDynDecimal(value)}</Text>;
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
          <AppIcon size="14px" padding="4px" />
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
      return <Text textAlign="center" className="linear-text">{value}</Text>;
  }
};