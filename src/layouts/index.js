import { Box } from "@chakra-ui/react";
import Navbar from "components/Navbar";
import BackgroundImage from "assets/img/background.png";
const DefaultLayout = ({ children }) => {
  console.log(children);
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

export default DefaultLayout;
