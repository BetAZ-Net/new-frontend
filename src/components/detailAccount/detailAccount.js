import {
  Box,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  Text,
  Button,
} from "@chakra-ui/react";
import { AddressCopier } from "components/addressCopier";
import { useWallet } from "contexts/useWallet";
import { useModal } from "contexts/useModal";
import { useSelector } from "react-redux";
import { memo } from "react";
import UnstakeModal from "components/stakingPool/pendingModal/UnstakeModal";

const DetailAccountBox = ({ onClickSwitch }) => {
  const { logoutAccountHandler } = useWallet();
  const { setUnstakeModalVisible, unstakeModalVisible } = useModal();
  const { currentAccount } = useSelector((s) => s.substrate);
  const onOpenUnstakeModal = () => setUnstakeModalVisible(true);
  const onCloseUnstakeModal = () => setUnstakeModalVisible(false);

  return (
    <>
      <Box p="20px">
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
          {
            title: "BET AZ staked amount",
            content: currentAccount?.balance?.stake,
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
        <Flex direction="column">
          <Button
            className="landing-page-banner-button"
            sx={{
              mb: "8px",
            }}
            onClick={() => {
              onOpenUnstakeModal(true);
            }}
          >
            My Stake
          </Button>
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
      <UnstakeModal
        isOpen={unstakeModalVisible}
        onClose={onCloseUnstakeModal}
      />
    </>
  );
};

export default DetailAccountBox;
