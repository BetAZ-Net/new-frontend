import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        fontWeight: "500",
        borderRadius: "12px",
        fontSize: "16px",
      },
      variants: {
        solid: {
          background: "linear-gradient(180deg, #1BECA6 0%, #1BBEF5 100%)",
        },
      },
    },
    ModalContent: {
      baseStyle: {
        background: "red",
      },
    },
  },
});

export default customTheme;
