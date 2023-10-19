import { Box } from "@chakra-ui/react";
import { SectionContainer } from "components/container";
import { useState } from "react";
import SubcribeEmailButton from "./SubcribeEmailButton";
import SubcribeEmailModal from "./subcribeEmailModal";
import MinToken from "./mintToken";
import UpdateCorePool from "./updateCorePool";

const AdminPage = () => {
  const [subcribeEmailModalVisible, setBetSubcribeEmailModalVisible] =
    useState(false);
  return (
    <SectionContainer>
      <Box>
        <MinToken />
        <UpdateCorePool />
        <SubcribeEmailModal
          isOpen={subcribeEmailModalVisible}
          onClose={() => setBetSubcribeEmailModalVisible(false)}
        />
        <SubcribeEmailButton
          onClick={() => setBetSubcribeEmailModalVisible(true)}
        />
      </Box>
    </SectionContainer>
  );
};

export default AdminPage;
