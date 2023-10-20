import { Box } from "@chakra-ui/react";
import { SectionContainer } from "components/container";
import { useState } from "react";
import SubcribeEmailButton from "./SubcribeEmailButton";
import SubcribeEmailModal from "./subcribeEmailModal";
import MinToken from "./mintToken";
import UpdateCorePool from "./updateCorePool";
import UpdateRewardPool from "./updateRewardPool";
import WithDrawCorePool from "./withDrawCorePool";
import WithDrawStakingPool from "./withDrawStakingPool";
import Locked from "./locked";
import UpdateStatusRewardDistribution from "./updateStatusRewardDistribution";
import SetClaimedStatus from "./setClaimedStatus";
import WithdrawTreasuryPool from "./withdrawTreasuryPool";

const AdminPage = () => {
  const [subcribeEmailModalVisible, setBetSubcribeEmailModalVisible] =
    useState(false);
  return (
    <SectionContainer>
      <Box>
        <MinToken />
        <UpdateCorePool />
        <UpdateRewardPool />
        <WithDrawCorePool />
        <WithDrawStakingPool />
        <WithdrawTreasuryPool />
        <Locked />
        <UpdateStatusRewardDistribution />
        <SetClaimedStatus />
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
