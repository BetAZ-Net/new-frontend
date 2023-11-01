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
  Th,
  Thead,
  Tr,
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

let currentPage = 1;

const UnstakeModal = ({ isOpen, onClose }) => {
  const [uiPage, setUIPage] = useState(1);
  const [data, setdata] = useState([]);

  const { currentAccount } = useSelector((s) => s.substrate);

  const getData = async () => {
    let data = await clientAPI("post", "/getPendingUnstake", {
      caller: currentAccount?.address,
      limit: 10,
      offset: 10 * (currentPage - 1),
    });
    const addActionTime = (item) => {
      item.action = item?.time;
    };
    data.forEach(addActionTime);
    setdata(data);
  };
  useInterval(() => getData(), 5000);

  useEffect(() => {
    getData();
  }, []);

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
    data: data,
  };

  return (
    <Modal onClose={onClose} size="lg" isOpen={isOpen}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent className="history-modal-content-container">
        <ModalHeader className="history-modal-content-title linear-text">
          Pending Unstake
        </ModalHeader>
        <ModalCloseButton color="#FFF" />
        <ModalBody>
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
                    const isLastChild = index === tableData.headers.length - 1;
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
                {tableData.data.map((e, rowIndex) => {
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

export default UnstakeModal;
