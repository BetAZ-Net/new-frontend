import { Box, Image } from "@chakra-ui/react";
import AppLogo from "assets/img/app-logo.png";
import AstarLogo from "assets/img/astar-logo.png"

export const AppIcon = ({ size = "24px", padding = "0px", rest }) => {
  return (
    <Box sx={{ ...rest, padding }}>
      <Image aspectRatio={1} h={size} w={size} alt="logo-app" src={AppLogo} />
    </Box>
  );
};

export const AstarIcon = ({ size = "24px", padding = "0px", rest }) => {
  return (
    <Box sx={{ ...rest, padding }}>
      <Image aspectRatio={1} h={size} w={size} alt="logo-app" src={AstarLogo} />
    </Box>
  );
};
