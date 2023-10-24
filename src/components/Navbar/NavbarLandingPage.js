import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import AppLogo from "assets/img/app-logo-text.png";
import NetWorkButton from "components/Network/NetworkButton";
import WalletButton from "components/wallet/WalletButton";
import { Link, useNavigate } from "react-router-dom";
import "./navbar-landing-page.css";

export const NavbarLandingPage = () => {
  const navigate = useNavigate();
  const tabs = [
    {
      label: "Tokenomic",
      key: "section-tokenomic",
    },
    {
      label: "Deposit",
      key: "section-deposit",
    },
    {
      label: "Roadmap",
      key: "section-roadmap",
    },
    {
      label: "Team Member",
      key: "section-team-member",
    },
    {
      label: "Contact Us",
      key: "section-contact-us",
    },
  ];
  return (
    <Flex className="navbar-container">
      <Flex className="navbar-logo-container">
        <Link to={"/"}>
          <Image className="navbar-logo" alt="logo-app" src={AppLogo} />
        </Link>
      </Flex>
      <Flex justify="center" flex={1}>
        {tabs?.map((e, index) => {
          return (
            <Box
              sx={{ px: "16px", py: "8px" }}
              cursor="pointer"
              onClick={() => {
                document
                  .getElementById(e.key)
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
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
        gap="24px"
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap="24px"
        >
          <NetWorkButton />
          <WalletButton />
        </Box>

        <Button onClick={() => window.open("/app", "_blank")}>
          Launch App
        </Button>
      </Box>
    </Flex>
  );
};
