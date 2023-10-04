import { Box } from "@chakra-ui/react";
import Navbar from "components/Navbar";
import BackgroundImage from "assets/img/background.png";
import { useLocation } from "react-router-dom";
import { NavbarLandingPage } from "components/Navbar/NavbarLandingPage";

const AppLayout = ({ children }) => {
  return (
    <Box
      background="#0F3435"
      sx={{
        paddingTop: "20px",
        minHeight: "100vh",
      }}
      bgImage={BackgroundImage}
      bgSize="cover"
    >
      <Navbar />
      <Box
        w="calc(100vw - 140px)"
        mx="auto"
        sx={{ paddingTop: "20px" }}
        overflow="auto"
      >
        {children}
      </Box>
    </Box>
  );
};

const LandingPageLayout = ({ children }) => {
  return (
    <Box background="#0F3435" sx={{ minHeight: "100vh" }}>
      {/* <NavbarLandingPage /> */}
      <Box overflow="auto">{children}</Box>
    </Box>
  );
};

const DefaultLayout = ({ children }) => {
  const location = useLocation();
  if (["/"].includes(location.pathname))
    return <LandingPageLayout>{children}</LandingPageLayout>;
  return <AppLayout>{children}</AppLayout>;
};

export default DefaultLayout;
