import React from "react";
import Countdown, { zeroPad } from "react-countdown";

import { Flex, Text, SimpleGrid } from "@chakra-ui/react";

export default function BETAZCountDown({ date }) {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <SimpleGrid columns={4} spacing="10px">
          <Flex alignItems="flex-end">
            <Text className="deposit-circle-finish-countdown" color="#a4b0b6">
              00
            </Text>
            <Text className="deposit-circle-finish-countdown-unit">d</Text>
          </Flex>
          <Flex alignItems="flex-end">
            <Text className="deposit-circle-finish-countdown" color="#a4b0b6">
              00
            </Text>
            <Text className="deposit-circle-finish-countdown-unit">h</Text>
          </Flex>
          <Flex alignItems="flex-end">
            <Text className="deposit-circle-finish-countdown" color="#a4b0b6">
              00
            </Text>
            <Text className="deposit-circle-finish-countdown-unit">m</Text>
          </Flex>
          <Flex alignItems="flex-end">
            <Text className="deposit-circle-finish-countdown" color="#a4b0b6">
              00
            </Text>
            <Text className="deposit-circle-finish-countdown-unit">s</Text>
          </Flex>
        </SimpleGrid>
      );
    } else {
      return (
        <SimpleGrid columns={4} spacing="10px">
          <Flex alignItems="flex-end">
            <Text className="deposit-circle-finish-countdown linear-text-color-01">
              {zeroPad(days) || "00"}
            </Text>
            <Text className="deposit-circle-finish-countdown-unit">d</Text>
          </Flex>
          <Flex alignItems="flex-end">
            <Text className="deposit-circle-finish-countdown linear-text-color-01">
              {zeroPad(hours) || "00"}
            </Text>
            <Text className="deposit-circle-finish-countdown-unit">h</Text>
          </Flex>
          <Flex alignItems="flex-end">
            <Text className="deposit-circle-finish-countdown linear-text-color-01">
              {zeroPad(minutes) || "00"}
            </Text>
            <Text className="deposit-circle-finish-countdown-unit">m</Text>
          </Flex>
          <Flex alignItems="flex-end">
            <Text className="deposit-circle-finish-countdown linear-text-color-01">
              {zeroPad(seconds) || "00"}
            </Text>
            <Text className="deposit-circle-finish-countdown-unit">s</Text>
          </Flex>
        </SimpleGrid>
      );
    }
  };
  return (
    <span>
      <Countdown key={date?.toString()} date={date} renderer={renderer} />
    </span>
  );
}
