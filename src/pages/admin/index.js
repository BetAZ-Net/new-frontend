import { Box, Text } from "@chakra-ui/react";
import { SectionContainer } from "components/container";
import { useState } from "react";
import SubcribeEmailButton from "./SubcribeEmailButton";
import SubcribeEmailModal from "./subcribeEmailModal";
import { tabItems } from "./tabs";
import "./styles.css";

const tabData = [
  {
    label: "Mint Tokens",
  },
  {
    label: "Update Core Pool",
  },
  {
    label: "Update Reward Pool",
  },
  {
    label: "Withdraw Core Pool",
  },
  {
    label: "Withdraw Staking pool",
  },
  {
    label: "Withdraw Treasury Pool",
  },
  {
    label: "Lock reward",
  },
  {
    label: "Start reward",
  },
  {
    label: "Clamied Status",
  },
];

const AdminPage = () => {
  const [subcribeEmailModalVisible, setBetSubcribeEmailModalVisible] =
    useState(false);

  const [currentTab, setCurrentTab] = useState(0);

  console.log({ currentTab });
  return (
    <SectionContainer>
      <Box minH="100vh" mt="48px">
        <Box className="admin-modal-tabs">
          {tabData.map((e, index) => {
            const isActive = currentTab === index;
            return (
              <Box
                key={`tab-${index}`}
                className={`admin-modal-tab ${
                  isActive && "admin-modal-tab-active"
                }`}
                onClick={() => setCurrentTab(index)}
              >
                <Text
                  className={`admin-modal-label ${
                    isActive && "admin-modal-label-active"
                  }`}
                >
                  {e?.label}
                </Text>
              </Box>
            );
          })}
        </Box>

        <Box>{tabItems(currentTab)}</Box>
      </Box>
      <SubcribeEmailModal
        isOpen={subcribeEmailModalVisible}
        onClose={() => setBetSubcribeEmailModalVisible(false)}
      />
      <SubcribeEmailButton
        onClick={() => setBetSubcribeEmailModalVisible(true)}
      />
    </SectionContainer>
  );
};

export default AdminPage;