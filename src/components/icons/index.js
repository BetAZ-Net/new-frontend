import { Box, Image } from "@chakra-ui/react";
import AppLogo from "assets/img/app-logo.png";
import TokenLogo from "assets/img/token-logo.png";

export const AppIcon = ({ size = "24px", padding = "0px", rest }) => {
  return (
    <Box sx={{ ...rest, padding }}>
      <Image aspectRatio={1} h={size} w={size} alt="logo-app" src={AppLogo} />
    </Box>
  );
};

export const TokenIcon = ({ size = "24px", padding = "0px", rest }) => {
  return (
    <Box sx={{ ...rest, padding }}>
      <Image
        aspectRatio={1}
        h={size}
        w={size}
        alt="logo-token"
        src={TokenLogo}
      />
    </Box>
  );
};
