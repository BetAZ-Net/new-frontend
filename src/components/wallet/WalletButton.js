import {
  Box,
  Button,
  Text,
  Heading,
  Flex,
  Modal,
  ModalCloseButton,
  ModalContent,
  useDisclosure,
  ModalBody,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useWallet } from "contexts/useWallet";
import { useEffect, useState } from "react";
import WalletConnectModal from "./WalletConnectModal";
import { addressShortener } from "utils";
import { useNetwork } from "components/Network/useNetWork";
import { BiWallet } from "react-icons/bi";
import { AddressCopier } from "components/addressCopier";
import { useDispatch, useSelector } from "react-redux";
import DetailAccountBox from "components/detailAccount/detailAccount";
import useCheckMobileScreen from "hooks/useCheckMobileScreen";

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
  const isMobile = useCheckMobileScreen(992);
  return (
    <Menu>
      <MenuButton>
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
              position: "relative",
            }}
          >
            <BiWallet size="24px" color="white" />
          </Box>
          {isMobile ? null : (
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
          )}
        </Box>
      </MenuButton>
      <MenuList
        sx={{
          background: "#122126",
          border: "2px solid rgba(255, 255, 255, 0.70)",
          boxShadow: "0px 4px 4px 0px rgba(64, 64, 64, 0.20)",
        }}
        minW={{ base: "92vw", sm: "340px" }}
        marginLeft={{ base: "16px" }}
        marginRight={{ base: "16px" }}
        marginTop={{ base: "24px", sm: "unset" }}
        borderRadius={{ base: "12px" }}
      >
        <DetailAccountBox onClickSwitch={onClickSwitch} />
      </MenuList>
    </Menu>
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
    <Box id="connect-box">
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
