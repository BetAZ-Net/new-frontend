import MinToken from "./mintToken";
import UpdateCorePool from "./updateCorePool";
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
      return <WithDrawCorePool />;
    case 3:
      return <WithDrawStakingPool />;
    case 4:
      return <WithdrawTreasuryPool />;
    case 5:
      return <Locked />;
    case 6:
      return <UpdateStatusRewardDistribution />;
    case 7:
      return <SetClaimedStatus />;
    default:
      return <MinToken />;
  }
};
