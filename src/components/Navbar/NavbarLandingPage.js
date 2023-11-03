import {
  Box,
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import AppLogo from "assets/img/app-logo-text.png";
import AppLogo2 from "assets/img/app-logo-2.png";
import NetWorkButton from "components/Network/NetworkButton";
import WalletButton from "components/wallet/WalletButton";
import { Link, useNavigate } from "react-router-dom";
import "./navbar-landing-page.css";
import { SectionContainer } from "components/container";
import useCheckMobileScreen from "hooks/useCheckMobileScreen";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useRef } from "react";

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

export const NavbarLandingPage = () => {
  const navigate = useNavigate();

  const isMobile = useCheckMobileScreen(1440);
  return (
    <SectionContainer>
      <Flex className="navbar-container" position="relative">
        <Flex className="navbar-logo-container">
          <Link to={"/"}>
            <Image
              className="navbar-logo"
              alt="logo-app"
              src={isMobile ? AppLogo2 : AppLogo}
            />
          </Link>
        </Flex>
        {isMobile ? null : (
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
        )}
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
          {isMobile ? null : (
            <Button onClick={() => window.open("/app", "_blank")}>
              Launch App
            </Button>
          )}
          <Box>
            {isMobile ? <NavbarLandingPageMobileMenu /> : null}
          </Box>
        </Box>
      </Flex>
    </SectionContainer>
  );
};

const NavbarLandingPageMobileMenu = () => {
  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton p="8px" isActive={isOpen} as={Button}>
            {isOpen ? (
              <AiOutlineClose size="24px" />
            ) : (
              <AiOutlineMenu size="24px" />
            )}
          </MenuButton>
          <MenuList className="deposit-modal-container" border="none">
            <Box className="deposit-modal-box-container" w="100%">
              <Box
                sx={{
                  w: "100%",
                  borderRadius: "12px",
                  border: "2px solid rgba(255, 255, 255, 0.7)",
                  background: "#122126",
                  backdropFilter: "blur(7.5px)",
                  padding: "24px",
                }}
              >
                <Flex justify="center" gap="4px" direction="column">
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
                <Box pt="24px">
                  <Button
                    w="100%"
                    onClick={() => window.open("/app", "_blank")}
                  >
                    Launch App
                  </Button>
                </Box>
              </Box>
            </Box>
          </MenuList>
        </>
      )}
    </Menu>
  );
};
