import { Box, Flex, Image } from "@chakra-ui/react";
import AppLogo from "assets/img/app-logo-text.png";
import NetWorkButton from "components/Network/NetworkButton";
import WalletButton from "components/wallet/WalletButton";
import "./navbar-landing-page.css";
import { Link } from "react-router-dom";
import { SectionContainer } from "components/container";

const Navbar = () => {
  return (
    <Box paddingLeft={{ md: "65px" }} paddingRight={{ md: "65px" }}>
      <Flex
        className="navbar-container"
        // ml={{ sm: "unset" }}
        // mr={{ sm: "unset" }}
      >
        <Flex className="navbar-logo-container">
          <Link to={"/"}>
            <Image className="navbar-logo" alt="logo-app" src={AppLogo} />
          </Link>
        </Flex>
        <Box
          ms="auto"
          w={{ sm: "100%", md: "unset" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          gap="14px"
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
    </Box>
  );
};

export default Navbar;
