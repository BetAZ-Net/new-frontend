import {
  Box,
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
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import { BiLayer } from "react-icons/bi";
import { GiTwoCoins } from "react-icons/gi";
import { TbMoodSmileFilled } from "react-icons/tb";
import { MdSwapVerticalCircle } from "react-icons/md";
import { RiCopperDiamondFill, RiVipDiamondFill, RiArrowTurnBackFill } from "react-icons/ri";
import "./styles.css";
import { AiFillStar } from "react-icons/ai";
import { formatTableValue } from "./formatTable";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import toast from "react-hot-toast";
import { clientAPI } from "api/client";
import { useSelector } from "react-redux";
import useInterval from "hooks/useInterval";

const tabData = [
  {
    label: "My Bets",
  },
  {
    label: "All Bets",
  },
  {
    label: "Rare Win",
  },
];

let currentPage = 1;

const BetHistoryModal = ({ isOpen, onClose }) => {
  const { currentAccount } = useSelector((s) => s.substrate);
  const [currentTab, setCurrentTab] = useState(0);
  const [uiPage, setUIPage] = useState(1);
  const [data, setdata] = useState([]);

  const getData = async () => {
    if (currentTab === 0) {
      if (currentAccount === "") {
        setdata([]);
        return;
      }
      let data = await clientAPI("post", "/getEventsByPlayer", {
        player: currentAccount?.address,
        limit: 10,
        offset: 10 * (currentPage - 1),
      });
      // console.log({mybets: data});
      setdata(data);
    } else if (currentTab === 1) {
      let data = await clientAPI("post", "/getEvents", {
        limit: 10,
        offset: 10 * (currentPage - 1),
      });
      // console.log({ all: data });
      setdata(data);
    } else if (currentTab === 2) {
      let data = await clientAPI("post", "/getRareWins", {
        limit: 10,
        offset: 10 * (currentPage - 1),
      });
      // console.log({rarewins: data});
      setdata(data);
    }
  };
  useInterval(() => getData(), 3000);

  useEffect(() => {
    getData();
  }, [currentTab]);

  const nextPage = useCallback(() => {
    if (currentPage < 5) currentPage++;
    else toast("Only 5 pages can be displayed");
    setUIPage(currentPage);
    getData();
  });

  const previousPage = useCallback(() => {
    if (currentPage > 1) currentPage--;
    setUIPage(currentPage);
    getData();
  });

  const historyTableData = {
    headers: [
      {
        label: "Player",
        key: "player",
        icon: <TbMoodSmileFilled size="24px" style={{ marginRight: "8px" }} />,
      },
      {
        label: "Block number",
        key: "block-number",
        icon: <BiLayer size="24px" style={{ marginRight: "8px" }} />,
      },
      {
        label: "Bet Amount",
        key: "bet-amount",
        icon: <GiTwoCoins size="24px" style={{ marginRight: "8px" }} />,
      },
      {
        label: "Type",
        key: "type",
        icon: (
          <MdSwapVerticalCircle size="24px" style={{ marginRight: "8px" }} />
        ),
      },
      {
        label: "Prediction",
        key: "prediction",
        icon: (
          <RiCopperDiamondFill size="24px" style={{ marginRight: "8px" }} />
        ),
      },
      {
        label: "Result",
        key: "result",
        icon: <AiFillStar size="24px" style={{ marginRight: "8px" }} />,
      },
      {
        label: "Won Amount",
        key: "won-amount",
        icon: <RiVipDiamondFill size="24px" style={{ marginRight: "8px" }} />,
      },
      {
        label: "Oracle round",
        key: "round",
        icon: <RiArrowTurnBackFill size="24px" style={{ marginRight: "8px" }} />,
      },
    ],
    data: data,
  };

  return (
    <Modal onClose={onClose} size="lg" isOpen={isOpen}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent className="history-modal-content-container">
        <ModalHeader className="history-modal-content-title linear-text">
          Bet History
        </ModalHeader>
        <ModalCloseButton color="#FFF" />
        <ModalBody>
          <Box className="history-modal-tabs">
            {tabData.map((e, index) => {
              const isActive = currentTab === index;
              return (
                <Box
                  key={`tab-${index}`}
                  className={`history-modal-tab ${
                    isActive && "history-modal-tab-active"
                  }`}
                  onClick={() => setCurrentTab(index)}
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
                minWidth: "1320px",
              }}
              variant="unstyled"
              className="history-table"
            >
              <Thead>
                <Tr className="history-table-header-container">
                  {historyTableData.headers.map((e, index) => {
                    const isFirstChild = index === 0;
                    const isLastChild =
                      index === historyTableData.headers.length - 1;
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
                {historyTableData.data.map((e, rowIndex) => {
                  const keyValues = Object.keys(e);

                  return (
                    <Tr>
                      {keyValues.map((keyvalue, index) => {
                        const isFirstChild = index === 0;
                        const isLastChild =
                          index === historyTableData.headers.length - 1;
                        return (
                          <Td>
                            <Box
                              sx={{
                                marginTop: rowIndex === 0 ? "24px" : "8px",
                                background: "#0d171b",
                                py: "16px",
                                pl: isFirstChild && "24px",
                                borderY: "1px solid rgba(255, 255, 255, 0.4)",
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
                })}
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
  );
};

export default BetHistoryModal;
