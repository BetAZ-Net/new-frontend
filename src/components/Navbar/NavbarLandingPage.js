import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import AppLogo from "assets/img/app-logo-text.png";
import NetWorkButton from "components/Network/NetworkButton";
import WalletButton from "components/wallet/WalletButton";
import { useNavigate } from "react-router-dom";
import "./navbar-landing-page.css";

export const NavbarLandingPage = () => {
  const navigate = useNavigate();
  const tabs = [
    {
      label: "Tokenomic",
      key: "tokenomic",
    },
    {
      label: "Deposit",
      key: "deposit",
    },
    {
      label: "Roadmap",
      key: "roadmap",
    },
    {
      label: "Team Member",
      key: "team-member",
    },
    {
      label: "Contact Us",
      key: "contact-us",
    },
  ];
  return (
    <Flex className="navbar-container">
      <Flex className="navbar-logo-container">
        <Image className="navbar-logo" alt="logo-app" src={AppLogo} />
      </Flex>
      <Flex justify="center" flex={1} cursor="pointer">
        {tabs?.map((e, index) => {
          return (
            <Box sx={{ px: "16px", py: "8px" }}>
              <Text>{e.label}</Text>
            </Box>
          );
        })}
      </Flex>
      <Box
        ms="auto"
        w={{ sm: "100%", md: "unset" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Button onClick={() => window.open("/app", "_blank")}>
          Launch App
        </Button>
      </Box>
    </Flex>
  );
};
