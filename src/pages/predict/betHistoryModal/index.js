import {
  Box,
  Button,
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
import { useState } from "react";
import { BiLayer } from "react-icons/bi";
import { GiTwoCoins } from "react-icons/gi";
import { TbMoodSmileFilled } from "react-icons/tb";
import { MdSwapVerticalCircle } from "react-icons/md";
import { RiCopperDiamondFill, RiVipDiamondFill } from "react-icons/ri";
import "./styles.css";
import { AiFillStar } from "react-icons/ai";
import { formatTableValue } from "./formatTable";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const BetHistoryModal = ({ isOpen, onClose }) => {
  const [currentTab, setCurrentTab] = useState(0);
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
    ],
    data: [
      {
        player: "5EfUESCp28GXw1v9CXmpAL5BfoCNW2y4skipcEoKAbN5Ykfn",
        blockNumber: "41412423",
        betAmount: 10,
        type: 0,
        prediction: 78,
        result: 73,
        wonAmount: 12.16,
      },
      {
        player: "5EfUESCp28GXw1v9CXmpAL5BfoCNW2y4skipcEoKAbN5Ykfn",
        blockNumber: "41412423",
        betAmount: 10,
        type: 1,
        prediction: 78,
        result: 73,
        wonAmount: 12.16,
      },
      {
        player: "5EfUESCp28GXw1v9CXmpAL5BfoCNW2y4skipcEoKAbN5Ykfn",
        blockNumber: "41412423",
        betAmount: 10,
        type: 1,
        prediction: 78,
        result: 73,
        wonAmount: 12.16,
      },
      {
        player: "5EfUESCp28GXw1v9CXmpAL5BfoCNW2y4skipcEoKAbN5Ykfn",
        blockNumber: "41412423",
        betAmount: 10,
        type: 0,
        prediction: 78,
        result: 73,
        wonAmount: 12.16,
      },
      {
        player: "5EfUESCp28GXw1v9CXmpAL5BfoCNW2y4skipcEoKAbN5Ykfn",
        blockNumber: "41412423",
        betAmount: 10,
        type: 0,
        prediction: 78,
        result: 73,
        wonAmount: 12.16,
      },
      {
        player: "5EfUESCp28GXw1v9CXmpAL5BfoCNW2y4skipcEoKAbN5Ykfn",
        blockNumber: "41412423",
        betAmount: 10,
        type: 0,
        prediction: 78,
        result: 73,
        wonAmount: 12.16,
      },
      {
        player: "5EfUESCp28GXw1v9CXmpAL5BfoCNW2y4skipcEoKAbN5Ykfn",
        blockNumber: "41412423",
        betAmount: 10,
        type: 0,
        prediction: 78,
        result: 73,
        wonAmount: 12.16,
      },
    ],
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
          <Box className="history-modal-tabs ">
            {tabData.map((e, index) => {
              const isActive = currentTab == index;
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
          <TableContainer mt="24px">
            <Table variant="unstyled">
              <Thead>
                <Tr className="history-table-header-container">
                  {historyTableData.headers.map((e, index) => (
                    <Th className="history-table-header-column">
                      <Box
                        display="flex"
                        justifyContent={index > 0 && "center"}
                        alignItems="center"
                      >
                        {e?.icon}
                        {e.label}
                      </Box>
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {historyTableData.data.map((e, index) => {
                  const keyValues = Object.keys(e);
                  return (
                    <Tr
                      sx={{ mt: "8px" }}
                      mt="8"
                      className="history-table-row-container"
                    >
                      {keyValues.map((keyvalue, index) => (
                        <Td>{formatTableValue(e[keyvalue], keyvalue)}</Td>
                      ))}
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </ModalBody>
        <ModalFooter className="history-table-footer-container">
          <Box>
            <IconButton variant="outline" color="#FFFFFF">
              <IoIosArrowBack />
            </IconButton>
            <IconButton ml="8px" variant="outline" color="#FFFFFF">
              <IoIosArrowForward />
            </IconButton>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BetHistoryModal;
