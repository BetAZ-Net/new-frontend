import {
  Box,
  Text,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import { BiTime } from "react-icons/bi";
import { GiTwoCoins } from "react-icons/gi";
import { formatTableValue } from "./formatTablePendingUnstake";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { TbMoodSmileFilled } from "react-icons/tb";
import { MdPendingActions } from "react-icons/md";
import toast from "react-hot-toast";
import { clientAPI } from "api/client";
import { useDispatch, useSelector } from "react-redux";
import useInterval from "hooks/useInterval";
import {
  fetchPendingUnstake,
  incrementCurrentPage,
  decrementCurrentPage,
  setCurrentTab,
} from "store/slices/stakingSlide";
import { useModal } from "contexts/useModal";
import { memo } from "react";
import CommonButton from "components/button/commonButton";
import { execContractQuery, execContractTx } from "utils/contracts";
import staking_pool_contract from "utils/contracts/staking_pool";
import staking_pool_calls from "utils/contracts/staking_pool_calls";
import {
  formatTokenBalance,
  formatChainStringToNumber,
  convertTimeStampToNumber,
  convertToBalance,
  delay,
} from "utils";
import { fetchUserBalance, fetchBalance } from "store/slices/substrateSlice";
// import StakingPool from "../StakingPool";

const tabData = [
  {
    label: "All Unstake Requests",
  },
  {
    label: "Pending Unstake Request",
  },
  {
    label: "Cancel Unstake Request",
  },
];

const defaultCaller = process.env.REACT_APP_DEFAULT_CALLER_ADDRESS;

const UnstakeModal = memo(({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [uiPage, setUIPage] = useState(1);
  const { currentAccount, poolBalance } = useSelector((s) => s.substrate);
  const { dataPending, currentPage, currentTab } = useSelector(
    (s) => s.staking
  );
  const { setStakingPoolModalVisible, setUnstakeStakingPoolModalVisible } =
    useModal();
  const [isLoading, setIsLoading] = useState(false);

  useInterval(() => dispatch(fetchPendingUnstake(currentAccount)), 3000);

  useEffect(() => {
    dispatch(fetchPendingUnstake(currentAccount));
  }, [currentTab]);

  const nextPage = useCallback(() => {
    if (currentPage < 5) dispatch(incrementCurrentPage());
    else toast("Only 5 pages can be displayed");
    setUIPage(currentPage);
    dispatch(fetchPendingUnstake(currentAccount));
  });

  const previousPage = useCallback(() => {
    if (currentPage > 1) dispatch(decrementCurrentPage());
    setUIPage(currentPage);
    dispatch(fetchPendingUnstake(currentAccount));
  });

  const tableData = {
    headers: [
      {
        label: "Player",
        key: "caller",
        icon: <TbMoodSmileFilled size="24px" style={{ marginRight: "8px" }} />,
      },
      {
        label: "Amount",
        key: "amount",
        icon: <GiTwoCoins size="24px" style={{ marginRight: "8px" }} />,
      },
      {
        label: "Count down",
        key: "time",
        icon: <BiTime size="24px" style={{ marginRight: "8px" }} />,
      },
      {
        label: "Action",
        key: "action",
        icon: <MdPendingActions size="24px" style={{ marginRight: "8px" }} />,
      },
    ],
    data: dataPending,
  };

  const claimReward = async () => {
    if (formatChainStringToNumber(currentAccount?.balance?.stake) == 0) {
      toast.error("Not staked");
      return;
    }
    if (
      formatChainStringToNumber(currentAccount?.balance?.stake) >
      formatChainStringToNumber(poolBalance?.staking)
    ) {
      toast.error("Not enough Balance!");
      return;
    }
    setIsLoading(true);

    try {
      // check reward locked
      const toastCheckLock = toast.loading("Step 1: Check reward locked ...");
      const checkLock = await execContractQuery(
        defaultCaller,
        staking_pool_contract.CONTRACT_ABI,
        staking_pool_contract.CONTRACT_ADDRESS,
        0,
        "stakingPoolTrait::getIsLocked"
      );
      toast.dismiss(toastCheckLock);
      if (!checkLock?.toHuman().Ok) {
        toast.error("Reward not locked!");
        setIsLoading(false);
        return;
      }

      const toastCheckIsClaimed = toast.loading("Step 2: Check is claimed ...");
      const checkLockIsClaimed = await execContractQuery(
        defaultCaller,
        staking_pool_contract.CONTRACT_ABI,
        staking_pool_contract.CONTRACT_ADDRESS,
        0,
        "stakingPoolTrait::isClaimed",
        currentAccount?.address
      );
      toast.dismiss(toastCheckIsClaimed);
      if (checkLockIsClaimed?.toHuman().Ok) {
        toast.error("You have claimed!");
        setIsLoading(false);
        return;
      }

      const toastCheckReward = toast.loading(
        "Step 3: Check reward distribution ..."
      );
      const checkReward = await execContractQuery(
        defaultCaller,
        staking_pool_contract.CONTRACT_ABI,
        staking_pool_contract.CONTRACT_ADDRESS,
        0,
        "stakingPoolTrait::getRewardStarted"
      );
      toast.dismiss(toastCheckReward);

      if (!checkReward?.toHuman().Ok) {
        toast.error("Reward not started!");
        return;
      }

      const toastClaim = toast.loading("Step 4: Claim reward ...");
      const result = await execContractTx(
        currentAccount,
        staking_pool_contract.CONTRACT_ABI,
        staking_pool_contract.CONTRACT_ADDRESS,
        0,
        "claimReward"
      );
      if (result) {
        toast.dismiss(toastClaim);
        toast.success(`Staking success`);
      } else toast.dismiss(toastClaim);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
    setIsLoading(false);
    await delay(2000);
    dispatch(fetchUserBalance({ currentAccount }));
    dispatch(fetchBalance());
  };

  return (
    <>
      <Modal onClose={onClose} size="lg" isOpen={isOpen}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent className="history-modal-content-container">
          <ModalHeader className="history-modal-content-title linear-text">
            Unstake Request management
          </ModalHeader>
          <ModalCloseButton color="#FFF" />
          <ModalBody>
            <Box padding="24px 0">
              <Flex justifyContent="end" gap="24px">
                <CommonButton
                  text="Claim reward"
                  onClick={() => claimReward()}
                />
                <Button
                  className="landing-page-banner-button"
                  sx={{
                    mb: "8px",
                  }}
                  onClick={() => {
                    setStakingPoolModalVisible(true);
                  }}
                >
                  Stake
                </Button>
                <Button
                  className="landing-page-banner-button"
                  sx={{
                    mb: "8px",
                  }}
                  onClick={() => {
                    setUnstakeStakingPoolModalVisible(true);
                  }}
                >
                  Unstake
                </Button>
              </Flex>
            </Box>
            <Box className="history-modal-tabs">
              {tabData.map((e, index) => {
                const isActive = currentTab === index;
                return (
                  <Box
                    key={`tab-${index}`}
                    className={`history-modal-tab ${
                      isActive && "history-modal-tab-active"
                    }`}
                    onClick={() => dispatch(setCurrentTab(index))}
                  >
                    <Text
                      className={`history-modal-label ${
                        isActive && "history-modal-label-active"
                      }`}
                    >
                      {e?.label}
                    </Text>
                  </Box>
                );
              })}
            </Box>
            <TableContainer mt="24px" overflowY="hidden">
              <Table
                sx={{
                  overflowX: "auto",
                  minWidth: "500px",
                }}
                variant="unstyled"
                className="history-table"
              >
                <Thead>
                  <Tr className="history-table-header-container">
                    {tableData.headers.map((e, index) => {
                      const isFirstChild = index === 0;
                      const isLastChild =
                        index === tableData.headers.length - 1;
                      return (
                        <Th className="history-table-header-column">
                          <Box
                            sx={{
                              borderY: "1px solid #1beca6",
                              borderLeft: isFirstChild && "1px solid #1beca6",
                              borderRight: isLastChild && "1px solid #1beca6",
                              borderLeftRadius: isFirstChild && "8px",
                              borderRightRadius: isLastChild && "8px",
                              paddingLeft: isFirstChild && "20px",
                              width: "full",
                              py: "20px",
                            }}
                            display="flex"
                            justifyContent={index > 0 && "center"}
                            alignItems="center"
                          >
                            {e?.icon}
                            {e.label}
                          </Box>
                        </Th>
                      );
                    })}
                  </Tr>
                </Thead>
                <Tbody>
                  {dataPending.length === 0 ? (
                    <Tr>
                      <Td colSpan={4}>
                        <Box
                          sx={{
                            marginTop: "24px",
                            background: "#0d171b",
                            py: "16px",
                            borderRadius: "8px",
                          }}
                        >
                          <Text textAlign="center">
                            {currentTab === 0
                              ? tabData[0].label
                              : currentTab === 1
                              ? tabData[1].label
                              : tabData[2].label}{" "}
                            not found!
                          </Text>
                        </Box>
                      </Td>
                    </Tr>
                  ) : (
                    tableData.data.map((e, rowIndex) => {
                      const keyValues = Object.keys(e);
                      return (
                        <Tr>
                          {keyValues.map((keyvalue, index) => {
                            const isFirstChild = index === 0;
                            const isLastChild =
                              index === tableData.headers.length - 1;
                            return (
                              <Td>
                                <Box
                                  sx={{
                                    marginTop: rowIndex === 0 ? "24px" : "8px",
                                    background: "#0d171b",
                                    py: "16px",
                                    pl: isFirstChild && "24px",
                                    borderY:
                                      "1px solid rgba(255, 255, 255, 0.4)",
                                    borderLeft:
                                      isFirstChild &&
                                      "1px solid rgba(255, 255, 255, 0.4)",
                                    borderRight:
                                      isLastChild &&
                                      "1px solid rgba(255, 255, 255, 0.4)",
                                    borderLeftRadius: isFirstChild && "8px",
                                    borderRightRadius: isLastChild && "8px",
                                  }}
                                >
                                  {formatTableValue(e[keyvalue], keyvalue)}
                                </Box>
                              </Td>
                            );
                          })}
                        </Tr>
                      );
                    })
                  )}
                  {}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
          <ModalFooter className="history-table-footer-container">
            <Box display="flex" gap="8px">
              <IconButton
                variant="outline"
                color="#FFFFFF"
                onClick={() => previousPage()}
              >
                <IoIosArrowBack />
              </IconButton>
              <IconButton variant="outline" color="#FFFFFF" disabled="disabled">
                <span
                  style={{
                    color: "#FFFFFF",
                  }}
                >
                  {uiPage}
                </span>
              </IconButton>
              <IconButton
                // ml="8px"
                variant="outline"
                color="#FFFFFF"
                onClick={() => nextPage()}
              >
                <IoIosArrowForward />
              </IconButton>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
});

export default UnstakeModal;
