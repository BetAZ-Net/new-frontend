import { Box, Text } from "@chakra-ui/react";
import { AddressCopier } from "components/addressCopier";
import { AppIcon } from "components/icons";
import { formatNumDynDecimal } from "utils";
import MinToken from "./mintToken";
import UpdateCorePool from "./updateCorePool";
import UpdateRewardPool from "./updateRewardPool";
import WithDrawCorePool from "./withDrawCorePool";
import WithDrawStakingPool from "./withDrawStakingPool";
import Locked from "./locked";
import UpdateStatusRewardDistribution from "./updateStatusRewardDistribution";
import SetClaimedStatus from "./setClaimedStatus";
import WithdrawTreasuryPool from "./withdrawTreasuryPool";

export const tabItems = (key) => {
  switch (key) {
    case 0:
      return <MinToken />;
    case 1:
      return <UpdateCorePool />;
    case 2:
      return <UpdateRewardPool />;
    case 3:
      return <WithDrawCorePool />;
    case 4:
      return <WithDrawStakingPool />;
    case 5:
      return <WithdrawTreasuryPool />;
    case 6:
      return <Locked />;
    case 7:
      return <UpdateStatusRewardDistribution />;
    case 8:
      return <SetClaimedStatus />;
    default:
      return <MinToken />;
  }
};
