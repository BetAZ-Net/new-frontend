import { Box, Flex, Text } from "@chakra-ui/react";
import { AddressCopier } from "components/addressCopier";
import PendingUnstakeButton from "components/button/pendingUnstakeButton";
import BETAZPendingUnstakeCountDown from "components/countdown/PendingUnstakeCountDown";
import { AppIcon } from "components/icons";

export const formatTableValue = (value, key) => {
  switch (key) {
    case "caller":
      return (
        <Flex minH="40px">
          <AddressCopier address={value} />
        </Flex>
      );
    case "amount":
      return (
        <Flex minH="40px" justifyContent="center" alignItems="center">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "2px",
            }}
          >
            <Text textAlign="center">{value}</Text>
            <AppIcon size="14px" />
          </Box>
        </Flex>
      );
    case "time":
      return (
        <Flex minH="40px" justifyContent="center" alignItems="center">
          <BETAZPendingUnstakeCountDown date={value} />
        </Flex>
      );
    case "action":
      return <PendingUnstakeButton data={value} />;
    default:
      return <Text textAlign="center">{value}</Text>;
  }
};