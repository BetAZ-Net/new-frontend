import { Box } from "@chakra-ui/react";

export const SectionContainer = ({ title, right, children, ...rest }) => {
  return (
    <Box {...rest}>
      <Box maxWidth="1440px" mx="auto">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Box style={{ fontWeight: "620", fontSize: "40px" }}>{title}</Box>
          {right}
        </Box>
        {children}
      </Box>
    </Box>
  );
};
