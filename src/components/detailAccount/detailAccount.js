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
import UnstakeModal from "components/stakingPool/unstakeModal/UnstakeModal";

const DetailAccountBox = ({
  onClickSwitch,
  isOpenModalDetailAccount,
  onCloseModalDetailAccount,
}) => {
  const { logoutAccountHandler } = useWallet();
  const {
    setUnstakeModalVisible,
    unstakeModalVisible,
  } = useModal();
  const { currentAccount } = useSelector((s) => s.substrate);
  const onOpenUnstakeModal = () => setUnstakeModalVisible(true);
  const onCloseUnstakeModal = () => setUnstakeModalVisible(false);

  return (
    <>
      <Modal
        isOpen={isOpenModalDetailAccount}
        id="detail-account-modal"
        onClose={onCloseModalDetailAccount}
      >
        {/* <ModalOverlay /> */}
        <ModalContent
          sx={{
            position: "absolute",
            top: { sm: "25px" },
            right: { md: "75px" },
            transform: "translate(0, 0)",
          }}
        >
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
              <Box
                mb="12px"
                variant="menu"
                minW={{ base: "full", lg: "350px" }}
              >
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
              <Button
                className="landing-page-banner-button"
                sx={{
                  mb: "8px",
                }}
                onClick={() => {
                  onOpenUnstakeModal(true);
                }}
              >
                Unstake Request management
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
          </ModalBody>
        </ModalContent>
      </Modal>
      <UnstakeModal
        isOpen={unstakeModalVisible}
        onClose={onCloseUnstakeModal}
      />
    </>
  );
};

export default memo(DetailAccountBox);
