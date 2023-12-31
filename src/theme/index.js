import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  fonts: {
    heading: `'Space Grotesk', sans-serif`,
    body: `'Space Grotesk', sans-serif`,
    // Add more font styles if needed
  },
  styles: {
    global: {
      // Set the default text color here
      color: "#F7F7F8",
    },
  },
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
    Text: {
      baseStyle: {
        color: "#F7F7F8",
      },
    },
  },
});

export default customTheme;
