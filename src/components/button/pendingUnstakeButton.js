import React from "react";
import Countdown from "react-countdown";
import CommonButton from "./commonButton";
import toast from "react-hot-toast";
import { Flex } from "@chakra-ui/react";

export default function PendingUnstakeButton({ date }) {
  const renderer = ({ completed }) => {
    if (completed) {
      return (
        <Flex justifyContent="center">
          <CommonButton
            onClick={() => {
              toast.success("Comming soon ...");
            }}
            text="Unstake"
            //   isLoading={isLoading}
          />
        </Flex>
      );
    } else {
      return (
        <Flex justifyContent="center">
          <CommonButton
            onClick={() => {
              toast.success("Comming soon ...");
            }}
            text="Cancel Unstake"
            //   isLoading={isLoading}
          />
        </Flex>
      );
    }
  };
  return (
    <span>
      <Countdown key={date?.toString()} date={date} renderer={renderer} />
    </span>
  );
}
