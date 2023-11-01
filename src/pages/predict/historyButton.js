import { Box, Text, Flex } from "@chakra-ui/react";
import HistoryButtonImage from "assets/img/historyButton.png";
import { BsChevronCompactUp } from "react-icons/bs";
import { useModal } from "contexts/useModal";
import UnstakeModal from "components/stakingPool/unstakeModal/UnstakeModal";

const HistoryButton = ({ onClick }) => {
  const {
    setUnstakeModalVisible,
    unstakeModalVisible
  } = useModal();

  const onOpenUnstakeModal = () => setUnstakeModalVisible(true);
  const onCloseUnstakeModal = () => setUnstakeModalVisible(false);
  return (
    <>
      <Box
        sx={{
          height: "88px",
          marginTop: "24px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "48px"
        }}
        bgImage={HistoryButtonImage}
        backgroundSize="cover"
        w="100%"
        cursor="pointer"
      >
        <Flex
          justifyContent="center"
          alignItems="center"
          direction="column"
          onClick={onClick}
        >
          <BsChevronCompactUp size="24px" color="#1BECA6" />
          <Text
            sx={{
              background: "linear-gradient(180deg, #1bbff4 0%, #1beca7 100%)",
              "-webkit-background-clip": "text",
              "-webkit-text-fill-color": "transparent",
              fontsize: "24px",
              fontWeight: "700",
            }}
          >
            Bet History
          </Text>
        </Flex>
        <Flex
          justifyContent="center"
          alignItems="center"
          direction="column"
          onClick={onOpenUnstakeModal}
        >
          <BsChevronCompactUp size="24px" color="#1BECA6" />
          <Text
            sx={{
              background: "linear-gradient(180deg, #1bbff4 0%, #1beca7 100%)",
              "-webkit-background-clip": "text",
              "-webkit-text-fill-color": "transparent",
              fontsize: "24px",
              fontWeight: "700",
            }}
          >
            Pending unstake
          </Text>
        </Flex>
      </Box>
      <UnstakeModal isOpen={unstakeModalVisible} onClose={onCloseUnstakeModal} />
    </>
  );
};

export default HistoryButton;
