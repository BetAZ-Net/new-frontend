import {
  Box,
  Button,
  Text,
  Heading,
  Flex,
  Modal,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useWallet } from "contexts/useWallet";
import { useEffect, useState } from "react";
import WalletConnectModal from "./WalletConnectModal";
import { addressShortener } from "utils";
import { useNetwork } from "components/Network/useNetWork";
import { BiWallet } from "react-icons/bi";
import { AddressCopier } from "components/addressCopier";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserBalance } from "store/slices/substrateSlice";

const WalletNotConnected = ({ openModal }) => {
  return (
    <>
      <Button
        sx={{
          px: "24px",
          height: "46px",
        }}
        onClick={() => openModal()}
      >
        Connect Wallet
      </Button>
    </>
  );
};
const WalletConnected = ({ onClickSwitch }) => {
  const { currentAccount } = useWallet();
  const [isOpen, SetIsOpen] = useState(false);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        background: "#0D171B",
        py: "10px",
        px: "12px",
        borderRadius: "12px",
        position: "relative",
      }}
      cursor="pointer"
    >
      <Box
        sx={{
          width: "24px",
          height: "24px",
          borderRadius: "24px",
        }}
      >
        <BiWallet size="24px" color="white" />
      </Box>
      <Text
        sx={{
          color: "#FFF",
          fontWeight: "500",
          fontSize: "16px",
          marginLeft: "10px",
        }}
        onClick={() => {
          if (isOpen) {
            SetIsOpen(false);
          } else {
            SetIsOpen(true);
          }
        }}
      >
        {addressShortener(currentAccount?.address)}
      </Text>
      <DetailAccountModal onClickSwitch={onClickSwitch} isOpen={isOpen} />
    </Box>
  );
};

const DetailAccountModal = ({ onClickSwitch, isOpen }) => {
  const { logoutAccountHandler } = useWallet();
  const dispatch = useDispatch();
  const { currentAccount } = useSelector((s) => s.substrate);

  useEffect(() => {
    dispatch(fetchUserBalance({ currentAccount }));
  }, [currentAccount]);

  return (
    <Modal isOpen={isOpen}>
      <Box
        p="0px"
        m="0px"
        borderRadius="10px"
        position="absolute"
        top="100px"
        right="20px"
        background="#122126"
        boxShadow="0px 4px 4px 0px rgba(64, 64, 64, 0.20)"
        border="1px solid rgba(255, 255, 255, 0.70)"
      >
        <Flex flexDirection="column" p="20px">
          <Box mb="12px" variant="menu" minW={{ base: "full", lg: "350px" }}>
            <Flex justify={{ base: "space-between" }}>
              <Text>Address</Text>
              <Heading as="h4" size="h4">
                <AddressCopier address={currentAccount?.address} />
              </Heading>
            </Flex>
          </Box>
          {[
            { title: "AZERO Balance", content: currentAccount?.balance?.azero },
            {
              title: "BET AZ token Balance",
              content: currentAccount?.balance?.betaz,
            },
          ].map(({ title, content }, idx) => {
            return (
              <Box
                key={idx}
                mb="12px"
                variant="menu"
                minW={{ base: "full", lg: "350px" }}
              >
                <Flex justify={{ base: "space-between" }}>
                  <Text>{title}</Text>
                  <Heading as="h4" size="h4" color={"white"}>
                    {content}
                  </Heading>
                </Flex>
              </Box>
            );
          })}
          <Button
            className="landing-page-banner-button"
            sx={{
              mb: "8px",
            }}
            onClick={() => {
              onClickSwitch();
            }}
          >
            Switch Account
          </Button>
          <Button
            className="landing-page-banner-button"
            onClick={() => {
              logoutAccountHandler();
            }}
          >
            Log out
          </Button>
        </Flex>
      </Box>
    </Modal>
  );
};

const WalletButton = () => {
  const { currentAccount, logoutAccountHandler } = useWallet();
  const { currentNetwork } = useNetwork();
  useEffect(() => {
    if (currentNetwork && !(currentAccount?.network == currentNetwork?.key))
      logoutAccountHandler();
  }, [currentNetwork]);

  const [connectModalVisible, setConnectModalVisible] = useState(false);
  const openModal = () => setConnectModalVisible(true);
  const onClickSwitch = async () => {
    if (currentAccount) openModal();
  };
  return (
    <>
      <WalletConnectModal
        connectModalVisible={connectModalVisible}
        onClose={() => setConnectModalVisible(false)}
      />
      {currentAccount ? (
        <WalletConnected onClickSwitch={onClickSwitch} />
      ) : (
        <WalletNotConnected openModal={openModal} />
      )}
    </>
  );
};

export default WalletButton;
