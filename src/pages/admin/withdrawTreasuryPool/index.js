import { Box, Text, Input, Flex, Button } from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { SectionContainer } from "components/container";
import { AppIcon } from "components/icons";
import CommonButton from "components/button/commonButton";
import { useDispatch, useSelector } from "react-redux";
import { convertToBalance, isValidAddressPolkadotAddress } from "utils";
import { execContractTx, execContractQuery } from "utils/contracts";
import staking_pool_contract from "utils/contracts/staking_pool";
import { useWallet } from "contexts/useWallet";
import { fetchUserBalance, fetchBalance } from "store/slices/substrateSlice";
import { ApiPromise } from "@polkadot/api";
import { Keyring } from "@polkadot/keyring";

const adminRole = process.env.REACT_APP_ADMIN_ROLE;
const treasuryPoolPhase = process.env.REACT_APP_TREASURY_POOL_PHASE;

const WithdrawTreasuryPool = () => {
  const dispatch = useDispatch();
  const { api } = useWallet();
  const { currentAccount, poolBalance } = useSelector((s) => s.substrate);

  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(0);
  const [address, setAddress] = useState("");
  const handleWithdraw = async () => {
    if (!isValidAddressPolkadotAddress(address)) {
      toast.error("Invalid address");
      return;
    }
    if (value === 0 || value === "") {
      toast.error("Invalid value");
      return;
    }

    if (
      parseFloat(value) > parseFloat(poolBalance?.staking?.replaceAll(",", ""))
    ) {
      toast.error("Not enough balance!");
      return;
    }

    let hasRole = await execContractQuery(
      currentAccount?.address,
      staking_pool_contract.CONTRACT_ABI,
      staking_pool_contract.CONTRACT_ADDRESS,
      0,
      "accessControl::hasRole",
      adminRole,
      currentAccount?.address
    );

    if (!hasRole?.toHuman().Ok) {
      toast.error("You not admin!");
      return;
    } else {
      setIsLoading(true);
      const toastTransfer = toast.loading("Transfer ....");
      const keyring = new Keyring({ type: "sr25519" });

      const alice = keyring.createFromUri(treasuryPoolPhase);

      const transfer = api.tx.balances.transfer(address, convertToBalance(value));

      const result = await transfer.signAndSend(alice);
      toast.dismiss(toastTransfer);
      if (result) {
        toast.success("Successfully");
      }
      setIsLoading(false);
    }
  };

  const onChangeValue = useCallback((e) => {
    const { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    let val = 0;
    if ((!isNaN(value) && reg.test(value)) || value === "" || value === "-") {
      val = parseFloat(value);
      if (val < 0) val = 1;
      else {
        setValue(value);
      }
    }
  });

  const onChangeAddress = useCallback((e) => {
    const { value } = e.target;
    setAddress(value);
  });

  useEffect(() => {
    dispatch(fetchUserBalance({ currentAccount, api }));
    dispatch(fetchBalance({ currentAccount, api }));
  }, [setIsLoading]);

  return (
    <SectionContainer
      className="deposit-box-container"
      sx={{ marginTop: "50px" }}
    >
      <Text className="deposit-box-title">Withdraw feetreasury pool</Text>
      <Box className="deposit-box-amount-box" mt="24px">
        <Text>Address</Text>
        <Flex className="deposit-box-amount-input">
          <Input
            focusBorderColor="transparent"
            sx={{ border: "0px" }}
            value={address}
            onChange={onChangeAddress}
            type="text"
          />
        </Flex>
      </Box>
      <Box className="deposit-box-amount-box" mt="24px">
        <Text>Amount</Text>
        <Flex className="deposit-box-amount-input">
          <Input
            focusBorderColor="transparent"
            sx={{ border: "0px" }}
            value={value}
            onChange={onChangeValue}
            type="number"
          />
          <Flex
            w="100px"
            alignItems="center"
            gap={1}
            pl="4px"
            borderLeft="2px solid rgba(255, 255, 255, 0.4)"
          >
            <AppIcon size="18px" />
            BetAZ
          </Flex>
        </Flex>
      </Box>
      <Flex direction="column" alignItems="center" mt="24px">
        <CommonButton
          text="Withdraw"
          isLoading={isLoading}
          onClick={() => handleWithdraw()}
        />
      </Flex>
    </SectionContainer>
  );
};

export default WithdrawTreasuryPool;