import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import AppLogo from "assets/img/app-logo-text.png";
import NetWorkButton from "components/Network/NetworkButton";
import WalletButton from "components/wallet/WalletButton";

const Navbar = () => {
  return (
    <Box
      border="2px solid rgba(255, 255, 255, 0.4)"
      borderima
      zIndex="100"
      // right="0"
      // left="0"
      // top="0"
      // position="fixed"
      mx="auto"
      py={{ base: "16px" }}
      w="calc(100vw - 140px)"
      alignItems={{ xl: "center" }}
      //   display={secondary ? "block" : "flex"}
      justifyContent={{ base: "space-between", xl: "center" }}
      bg="#0D1C20"
      px={{ base: "24px" }}
      transitionDelay="0s, 0s, 0s, 0s"
      transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
      transition-property="box-shadow, background-color, filter, border"
      transitionTimingFunction="linear, linear, linear, linear"
      borderRadius="12px"
      backdropFilter="blur(7.5px)"
    >
      <Flex
        w="100%"
        flexDirection={{
          sm: "row",
          md: "row",
        }}
        justifyContent="space-between"
        alignItems={{ xl: "center" }}
        // mb={gap}
      >
        <Flex alignItems="center" minWidth="160px">
          <Flex id="cba" alignItems="center">
            <Image height={{ base: "24px" }} alt="logo-app" src={AppLogo} />
          </Flex>
        </Flex>
        <Box
          ms="auto"
          w={{ sm: "100%", md: "unset" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {/* <NavbarLinks
            onOpen={props.onOpen}
            logoText={props.logoText}
            secondary={props.secondary}
            fixed={props.fixed}
            scrolled={scrolled}
          /> */}
          <NetWorkButton />
          <WalletButton />
        </Box>
      </Flex>
      {/* {secondary ? <Text color="white">{message}</Text> : null} */}
    </Box>
  );
};

export default Navbar;
