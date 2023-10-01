import { Box, Button, Text } from "@chakra-ui/react";
import { useWallet } from "contexts/useWallet";
import { useEffect, useState } from "react";
import WalletConnectModal from "./WalletConnectModal";
import { addressShortener } from "utils";
import { useNetwork } from "components/Network/useNetWork";

const WalletNotConnected = () => {
  const [connectModalVisible, setConnectModalVisible] = useState(false);
  const openModal = () => setConnectModalVisible(true);
  return (
    <>
      <Button
        sx={{
          px: "24px",
          height: "46px",
        }}
        onClick={openModal}
      >
        Connect Wallet
      </Button>
      <WalletConnectModal
        connectModalVisible={connectModalVisible}
        onClose={() => setConnectModalVisible(false)}
      />
    </>
  );
};
const WalletConnected = () => {
  const { currentAccount } = useWallet();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        background: "#0D171B",
        py: "10px",
        px: "12px",
        borderRadius: "12px",
      }}
      cursor="pointer"
    >
      <Box
        sx={{
          width: "24px",
          height: "24px",
          borderRadius: "24px",
          bg: "gray",
        }}
      ></Box>
      <Text
        sx={{
          color: "#FFF",
          fontWeight: "500",
          fontSize: "16px",
          marginLeft: "10px",
        }}
      >
        {addressShortener(currentAccount?.address)}
      </Text>
    </Box>
  );
};
const WalletButton = () => {
  const { currentAccount, logoutAccountHandler } = useWallet();
  const { currentNetwork } = useNetwork();
  useEffect(() => {
    if (currentNetwork && !(currentAccount?.network == currentNetwork?.key))
      logoutAccountHandler();
  }, [currentNetwork]);
  if (currentAccount) return <WalletConnected />;
  if (!currentAccount) return <WalletNotConnected />;
};

export default WalletButton;
