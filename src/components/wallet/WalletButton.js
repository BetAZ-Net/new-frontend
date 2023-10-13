import {
  Box,
  Button,
  Text,
  Heading,
  Flex,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  ModalBody,
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
          width: "max-content",
        }}
        onClick={() => openModal()}
      >
        Connect Wallet
      </Button>
    </>
  );
};
const WalletConnected = ({ onClickSwitch, isOpen, onOpen, onClose }) => {
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
        width: "max-content",
      }}
      cursor="pointer"
      onClick={() => {
        if (isOpen) onClose();
        else onOpen();
      }}
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
      >
        {addressShortener(currentAccount?.address)}
      </Text>
      <DetailAccountModal
        onClickSwitch={onClickSwitch}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  );
};

const DetailAccountModal = ({ onClickSwitch, isOpen, onClose }) => {
  const { logoutAccountHandler } = useWallet();
  const { currentAccount } = useSelector((s) => s.substrate);

  return (
    <Modal isOpen={isOpen} id="detail-account-modal" onClose={onClose}>
      {/* <ModalOverlay /> */}
      <ModalContent top={{sm:"96px", md:"36px"}}>
        <ModalBody
          p="0px"
          m="0px"
          borderRadius="10px"
          // position="absolute"
          background="#122126"
          boxShadow="0px 4px 4px 0px rgba(64, 64, 64, 0.20)"
          border="1px solid rgba(255, 255, 255, 0.70)"
        >
          <Box height="24px">
            <ModalCloseButton color={"white"} />
          </Box>
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
              {
                title: "AZERO Balance",
                content: currentAccount?.balance?.azero,
              },
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
        </ModalBody>
      </ModalContent>
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

  // const [isOpen, SetIsOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <WalletConnectModal
        connectModalVisible={connectModalVisible}
        onClose={() => setConnectModalVisible(false)}
        onCloseModal={onClose}
      />
      {currentAccount ? (
        <WalletConnected
          onClickSwitch={onClickSwitch}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
        />
      ) : (
        <WalletNotConnected openModal={openModal} />
      )}
    </Box>
  );
};

export default WalletButton;
