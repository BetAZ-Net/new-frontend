import { Box, Image } from "@chakra-ui/react";
import AppLogo from "assets/img/app-logo.png";

export const AppIcon = ({ size = "24px", padding = "0px", rest }) => {
  return (
    <Box sx={{ ...rest, padding }}>
      <Image height={{ base: size }} alt="logo-app" src={AppLogo} />
    </Box>
  );
};
