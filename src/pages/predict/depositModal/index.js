import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import depositBGLightStage from "assets/img/deposit-bg-light-stage.png";
import AppLogoText from "assets/img/app-logo-text.png";
import DepositAmountCircle from "assets/img/deposit-amount-circle.png";
import "./styles.css";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { AppIcon } from "components/icons";
import { useDispatch, useSelector } from "react-redux";

const DepositModal = ({ visible, onClose }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const { currentAccount, poolBalance } = useSelector((s) => s.substrate);
  return (
    <>
      <Modal size="full" isCentered isOpen={visible} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent className="deposit-modal-container">
          <ModalBody display="flex" padding="0px">
            <Box className="deposit-modal-box-container">
              <Box className="deposit-modal-box">
                <Flex justify="space-between">
                  <Text className="linear-text-color deposit-modal-box-title">
                    Deposit / Withdraw
                  </Text>
                  <Flex
                    w="28px"
                    h="28px"
                    justify="center"
                    alignItems="center"
                    cursor="pointer"
                    onClick={() => onClose()}
                  >
                    <IoMdClose color="#FFF" size="20px" />
                  </Flex>
                </Flex>
                <Flex className="tab-container">
                  <Box
                    className={`tab-button ${
                      tabIndex == 0 && "tab-button-active"
                    }`}
                    onClick={() => setTabIndex(0)}
                  >
                    Deposit
                  </Box>
                  <Box
                    className={`tab-button ${
                      tabIndex == 1 && "tab-button-active"
                    }`}
                    onClick={() => setTabIndex(1)}
                  >
                    Withdraw
                  </Box>
                </Flex>
                <SimpleGrid spacing="24px" mt="24px">
                  <Box className="deposit-box-amount-box">
                    <Text>Your AZero Balance</Text>
                    <Flex className="deposit-box-amount-input">
                      <Text className="linear-text azero-amount">{currentAccount?.balance?.azero}</Text>
                      <Text className="azero-unit">AZero</Text>
                    </Flex>
                  </Box>
                  <Box className="deposit-box-amount-box">
                    <Text>Deposit</Text>
                    <Flex className="deposit-box-amount-input">
                      <Input
                        focusBorderColor="transparent"
                        sx={{ border: "0px" }}
                        value={0.001}
                      />
                      <Flex
                        cursor="pointer"
                        w="100px"
                        alignItems="center"
                        textAlign="center"
                        flexDirection="column"
                        borderLeft="2px solid rgba(255, 255, 255, 0.4)"
                      >
                        Max
                      </Flex>
                    </Flex>
                  </Box>
                  <Button>Deposit</Button>
                  <Box>
                    <Text textAlign="center">
                      By Clicking your agree with our
                    </Text>
                    <Text
                      className="linear-text-color-01 term-aggreement-text"
                      textAlign="center"
                    >
                      Terms and Conditions, Privacy Policy
                    </Text>
                  </Box>
                </SimpleGrid>
              </Box>
            </Box>
            <Box
              className="deposit-modal-circle-container"
              bgImage={depositBGLightStage}
            >
              <Flex
                bgImage={DepositAmountCircle}
                className="deposit-modal-circle-content"
              >
                <SimpleGrid
                  spacing="32px"
                  alignItems="center"
                  display="flex"
                  flexDirection="column"
                >
                  <Image
                    height={{ base: "32px" }}
                    alt="app-logo-text"
                    src={AppLogoText}
                  />
                  <Text className="deposit-circle-quote">
                    Easy way for crypto Play
                  </Text>
                  <Text className="deposit-circle-amount linear-text-color-01">
                    $500,000
                  </Text>
                  <Box>
                    <Text className="deposit-circle-finish-title">
                      Finishes in:
                    </Text>
                    <SimpleGrid columns={4} spacing="10px">
                      <Flex alignItems="flex-end">
                        <Text className="deposit-circle-finish-countdown linear-text-color-01">
                          05
                        </Text>
                        <Text className="deposit-circle-finish-countdown-unit">
                          d
                        </Text>
                      </Flex>
                      <Flex alignItems="flex-end">
                        <Text className="deposit-circle-finish-countdown linear-text-color-01">
                          16
                        </Text>
                        <Text className="deposit-circle-finish-countdown-unit">
                          h
                        </Text>
                      </Flex>
                      <Flex alignItems="flex-end">
                        <Text className="deposit-circle-finish-countdown linear-text-color-01">
                          32
                        </Text>
                        <Text className="deposit-circle-finish-countdown-unit">
                          m
                        </Text>
                      </Flex>
                      <Flex alignItems="flex-end">
                        <Text className="deposit-circle-finish-countdown linear-text-color-01">
                          10
                        </Text>
                        <Text className="deposit-circle-finish-countdown-unit">
                          s
                        </Text>
                      </Flex>
                    </SimpleGrid>
                  </Box>
                </SimpleGrid>
              </Flex>
            </Box>
            {/* {supportWallets?.map((e, index) => (
                <WalletItem data={e} key={`wallet-item-${index}`} />
              ))}
              {walletAccounts?.length > 0 && (
                <Box sx={{ marginTop: "16px" }}>
                  <Divider />
                  <Text
                    sx={{
                      color: "#1BECA7",
                      marginTop: "8px",
                      fontWeight: "512",
                      fontSize: "20px",
                    }}
                  >
                    Select Account
                  </Text>
                  {walletAccounts?.map((e, index) => {
                    return <AccountItem key={`account-item-${index}`} data={e} />;
                  })}
                </Box>
              )} */}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default DepositModal;
